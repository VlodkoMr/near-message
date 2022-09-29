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

  if (functionCall.methodName == 'private_message') {
    savePrivateMessage(receiptWithOutcome);
  } else if (functionCall.methodName == 'room_message') {
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

    // const parsed = outcomeLog.replace('EVENT_JSON:', '')
    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageText = data.get('messageText')

    if (messageText) {
      const messageId = data.get('messageId')
      const fromUser = data.get('fromUser')
      const toUser = data.get('toUser')
      if (!messageId || !fromUser || !toUser) return;

      let message = PrivateMessage.load(messageId.toString())

      if (!message) {
        message = new PrivateMessage(messageId.toString())
        message.fromUser = fromUser.toString()
        message.fromAddress = fromUser.toString()
        message.toUser = toUser.toString()
        message.toAddress = toUser.toString()
        message.text = messageText.toString()
        message.isSpam = false
        message.isProtected = false
        message.isRemoved = false
        message.txHash = outcome.blockHash.toHexString()
        message.createdAt = receiptWithOutcome.block.header.timestampNanosec as i32;

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

    // const parsed = outcomeLog.replace('EVENT_JSON:', '')
    const jsonData = json.try_fromString(outcomeLog)
    const data = jsonData.value.toObject()
    const messageText = data.get('messageText')
    const toRoom = data.get('toRoom')

    if (messageText && toRoom) {
      const messageId = data.get('messageId')
      const fromUser = data.get('fromUser')

      if (!messageId || !fromUser) return;

      let message = RoomMessage.load(messageId.toString())

      if (!message) {
        message = new RoomMessage(messageId.toString())
        message.fromUser = fromUser.toString()
        message.fromAddress = fromUser.toString()
        message.toRoom = toRoom.toBigInt().toI32();
        message.text = messageText.toString()
        message.isSpam = false
        message.isRemoved = false
        message.txHash = outcome.blockHash.toHexString()
        message.createdAt = receiptWithOutcome.block.header.timestampNanosec as i32;

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