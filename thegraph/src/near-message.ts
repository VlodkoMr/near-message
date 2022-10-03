import {near, json, log} from "@graphprotocol/graph-ts"
import {PrivateMessage, RoomMessage, User} from "../generated/schema"

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

      if (!message) {
        message = new PrivateMessage(messageId.toString())
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
        message.created_at = receiptWithOutcome.block.header.timestampNanosec as i32;

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
    const toRoom = data.get('to_room')
    const replyToMessage = data.get('reply_to_message')

    if (messageText && toRoom) {
      const messageId = data.get('id')
      const fromUser = data.get('from_user')
      let replyMessageId = ""
      if (replyToMessage) {
        replyMessageId = replyToMessage.toString()
      }

      if (!messageId || !fromUser) return;

      let message = RoomMessage.load(messageId.toString())

      if (!message) {
        message = new RoomMessage(messageId.toString())
        message.from_user = fromUser.toString()
        message.from_address = fromUser.toString()
        message.to_room = toRoom.toBigInt().toString()
        message.text = messageText.toString()
        message.reply_to_message = replyMessageId
        message.is_spam = false
        message.is_removed = false
        message.tx_hash = outcome.blockHash.toHexString()
        message.created_at = receiptWithOutcome.block.header.timestampNanosec as i32;

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