import {near, json, log} from "@graphprotocol/graph-ts"
import {PrivateMessage, RoomMessage, User, PrivateChat} from "../generated/schema"

export function handleReceipt(
  receipt: near.ReceiptWithOutcome
): void {
  const actions = receipt.receipt.actions;
  for (let i = 0; i < actions.length; i++) {
    handleAction(actions[i], receipt)
  }
}

function handleAction(
  action: near.ActionValue,
  receiptWithOutcome: near.ReceiptWithOutcome
): void {
  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    return;
  }

  const functionCall = action.toFunctionCall();

  if (functionCall.methodName == 'send_private_message') {
    savePrivateMessage(receiptWithOutcome);
  } else if (functionCall.methodName == 'send_room_message') {
    saveRoomMessage(receiptWithOutcome);
  }
}

/**
 * Private Message
 */
function savePrivateMessage(receiptWithOutcome: near.ReceiptWithOutcome): void {
  const outcome = receiptWithOutcome.outcome;

  for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
    const outcomeLog = outcome.logs[logIndex].toString();

    log.info('savePrivateMessage {}', [outcomeLog])

    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageText = data.get('text')

    if (messageText) {
      const messageId = data.get('id')
      const fromUser = data.get('from_user')
      const toUser = data.get('to_user')
      const replyToMessage = data.get('reply_to_message')

      let replyMessageId = ""
      if (replyToMessage) {
        replyMessageId = replyToMessage.toString()
      }

      if (!messageId || !fromUser || !toUser) return;

      let message = PrivateMessage.load(messageId.toString())
      let timestampSeconds = receiptWithOutcome.block.header.timestampNanosec / 1000000000;

      if (!message) {
        let chatId = getPrivateChatId(fromUser.toString(), toUser.toString());

        message = new PrivateMessage(messageId.toString())
        message.chat_id = chatId.toString()
        message.from_user = fromUser.toString()
        message.from_address = fromUser.toString()
        message.to_user = toUser.toString()
        message.to_address = toUser.toString()
        message.text = messageText.toString()
        message.reply_to_message = replyMessageId
        message.is_spam = false
        message.is_protected = false
        message.is_removed = false
        message.tx_hash = outcome.blockHash.toHexString()
        message.created_at = timestampSeconds as i32;

        let chat = PrivateChat.load(chatId.toString())
        if (!chat) {
          chat = new PrivateChat(chatId.toString())
        }
        chat.last_message = messageId.toString()
        chat.is_removed = false
        chat.updated_at = message.created_at
        chat.save()

        let userFrom = User.load(fromUser.toString())
        if (!userFrom) {
          userFrom = new User(fromUser.toString())
          userFrom.save()
        }

        let userTo = User.load(toUser.toString())
        if (!userTo) {
          userTo = new User(toUser.toString())
          userTo.save()
        }

        message.save()
      }
    }
  }
}

/**
 * Room Message
 */
function saveRoomMessage(receiptWithOutcome: near.ReceiptWithOutcome): void {
  const outcome = receiptWithOutcome.outcome;

  for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
    const outcomeLog = outcome.logs[logIndex].toString();

    log.info('saveRoomMessage {}', [outcomeLog])

    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageText = data.get('text')
    const roomId = data.get('room_id')
    const replyToMessage = data.get('reply_to_message')

    if (messageText && roomId) {
      const messageId = data.get('id')
      const fromUser = data.get('from_user')
      let replyMessageId = ""
      if (replyToMessage) {
        replyMessageId = replyToMessage.toString()
      }

      if (!messageId || !fromUser) return;

      let message = RoomMessage.load(messageId.toString())
      let timestampSeconds = receiptWithOutcome.block.header.timestampNanosec / 1000000000;

      if (!message) {
        message = new RoomMessage(messageId.toString())
        message.from_user = fromUser.toString()
        message.from_address = fromUser.toString()
        message.room_id = roomId.toString()
        message.text = messageText.toString()
        message.reply_to_message = replyMessageId
        message.is_spam = false
        message.is_removed = false
        message.tx_hash = outcome.blockHash.toHexString()
        message.created_at = timestampSeconds as i32;

        let userFrom = User.load(fromUser.toString())
        if (!userFrom) {
          userFrom = new User(fromUser.toString())
          userFrom.save()
        }

        message.save()
      }
    }
  }
}

function getPrivateChatId(user1: String, user2: String): String {
  if (user1 > user2) {
    return user1.concat("|").concat(user2.toString());
  }
  return user2.concat("|").concat(user1.toString());
}