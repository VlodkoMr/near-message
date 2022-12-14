import {near, json, log, BigInt} from "@graphprotocol/graph-ts"
import {PrivateMessage, GroupMessage, PrivateChat, GroupChat} from "../generated/schema"

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
  } else if (functionCall.methodName == 'send_group_message') {
    saveGroupMessage(receiptWithOutcome);
  } else if (functionCall.methodName == 'spam_report') {
    updateMessageSpam(receiptWithOutcome);
  }
}

/**
 * Private Message
 */
function savePrivateMessage(receiptWithOutcome: near.ReceiptWithOutcome): void {
  const outcome = receiptWithOutcome.outcome;

  for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
    const outcomeLog = outcome.logs[logIndex].toString();

    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageText = data.get('text')

    if (messageText) {
      const messageId = data.get('id')
      const innerId = data.get('inner_id')
      const fromUser = data.get('from_user')
      const toUser = data.get('to_user')
      const image = data.get('image')
      const deposit = data.get('deposit')
      const deposit_token = data.get('deposit_token')
      const encrypt_key = data.get('encrypt_key')
      const replyToMessage = data.get('reply_message')

      let replyMessageId = ""
      if (replyToMessage) {
        replyMessageId = replyToMessage.toString()
      }

      if (!messageId || !fromUser || !toUser) return;

      let message = PrivateMessage.load(messageId.toString())
      let timestampSeconds = receiptWithOutcome.block.header.timestampNanosec / 1000000000

      if (!message) {
        let chatId = getPrivateChatId(fromUser.toString(), toUser.toString())

        message = new PrivateMessage(messageId.toString())
        message.id_num = BigInt.fromString(messageId.toString()).toI32()
        message.inner_id = innerId ? innerId.toString() : ""
        message.chat_id = chatId.toString()
        message.from_address = fromUser.toString()
        message.to_address = toUser.toString()
        message.text = messageText.toString()
        message.image = image ? image.toString() : ""
        message.encrypt_key = encrypt_key ? encrypt_key.toString() : ""
        message.reply_message = replyMessageId
        message.spam_reports = 0
        message.deposit = deposit ? deposit.toString() : ""
        message.deposit_token = deposit_token ? deposit_token.toString() : ""
        message.is_removed = false
        message.tx_hash = outcome.blockHash.toHexString()
        message.created_at = timestampSeconds as i32;

        let chat = PrivateChat.load(chatId.toString())
        if (!chat) {
          chat = new PrivateChat(chatId.toString())
          chat.total_messages = 0
        }
        chat.last_message = messageId.toString()
        chat.is_removed = false
        chat.total_messages += 1
        chat.updated_at = message.created_at
        chat.save()

        message.save()
      }
    }
  }
}

/**
 * Group Message
 */
function saveGroupMessage(receiptWithOutcome: near.ReceiptWithOutcome): void {
  const outcome = receiptWithOutcome.outcome;

  for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
    const outcomeLog = outcome.logs[logIndex].toString();

    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const innerId = data.get('inner_id')
    const messageText = data.get('text')
    const groupId = data.get('group_id')
    const image = data.get('image')
    const replyToMessage = data.get('reply_message')

    if (messageText && groupId) {
      const messageId = data.get('id')
      const fromUser = data.get('from_user')
      let replyMessageId = ""
      if (replyToMessage) {
        replyMessageId = replyToMessage.toString()
      }

      if (!messageId || !fromUser) return;

      let message = GroupMessage.load(messageId.toString())
      let timestampSeconds = receiptWithOutcome.block.header.timestampNanosec / 1000000000;

      if (!message) {
        message = new GroupMessage(messageId.toString())
        message.id_num = BigInt.fromString(messageId.toString()).toI32()
        message.inner_id = innerId ? innerId.toString() : ""
        message.from_address = fromUser.toString()
        message.group_id = groupId.toString()
        message.text = messageText.toString()
        message.image = image ? image.toString() : ""
        message.reply_message = replyMessageId
        message.spam_reports = 0
        message.is_removed = false
        message.tx_hash = outcome.blockHash.toHexString()
        message.created_at = timestampSeconds as i32;

        let chat = GroupChat.load(groupId.toString())
        if (!chat) {
          chat = new GroupChat(groupId.toString())
          chat.total_messages = 0
        }
        chat.last_message = messageId.toString()
        chat.total_messages += 1
        chat.is_removed = false
        chat.updated_at = message.created_at
        chat.save()

        message.save()
      }
    }
  }
}

function updateMessageSpam(receiptWithOutcome: near.ReceiptWithOutcome): void {
  const outcome = receiptWithOutcome.outcome;
  for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
    const outcomeLog = outcome.logs[logIndex].toString();

    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageId = data.get('id')
    const isGroup = data.get('is_group')

    if (!messageId) return;
    if (isGroup) {
      let message = GroupMessage.load(messageId.toString())
      if (message) {
        message.spam_reports += 1
        message.save()
      }
    } else {
      let message = PrivateMessage.load(messageId.toString())
      if (message) {
        message.spam_reports += 1
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
