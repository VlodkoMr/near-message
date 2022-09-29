import {near, JSONValue, json, BigInt, log} from "@graphprotocol/graph-ts"
import {Message, User} from "../generated/schema"

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
  const outcome = receiptWithOutcome.outcome;
  const functionCall = action.toFunctionCall();

  if (functionCall.methodName == 'send_message') {

    for (let logIndex = 0; logIndex < outcome.logs.length; logIndex++) {
      const outcomeLog = outcome.logs[logIndex].toString();

      log.info('outcomeLog {}', [outcomeLog])

      // const parsed = outcomeLog.replace('EVENT_JSON:', '')
      const jsonData = json.try_fromString(outcomeLog)
      const data = jsonData.value.toObject()
      const messageText = data.get('messageText')

      if (messageText) {
        const messageId = data.get('messageId')
        const fromUser = data.get('fromUser')
        const toUser = data.get('toUser')
        if (!messageId || !fromUser || !toUser) return;

        let message = Message.load(messageId.toString())

        if (!message) {
          message = new Message(messageId.toString())
          message.fromUser = fromUser.toString()
          message.fromAddress = fromUser.toString()
          message.toUser = toUser.toString()
          message.toAddress = toUser.toString()
          message.text = messageText.toString()
          message.createdAt = receiptWithOutcome.block.header.timestampNanosec as i32;
          message.txHash = outcome.blockHash.toHexString()
          message.isSpam = false
          message.isImportant = false
          message.isRemoved = false

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

          //
          //       token.image = ipfsHash + '/' + tokenId + '.png'
          //       const metadata = ipfsHash + '/' + tokenId + '.json'
          //       token.metadata = metadata
          //
          //       const metadataResult = ipfs.cat(metadata)
          //       if (metadataResult) {
          //         const value = json.fromBytes(metadataResult).toObject()
          //         if (value) {
          //           const kind = value.get('kind')
          //           if (kind) {
          //             token.kind = kind.toString()
          //           }
          //           const seed = value.get('seed')
          //           if (seed) {
          //             token.seed = seed.toI64() as i32
          //           }
          //         }
          //       }
        }
        //
        //     token.ownerId = owner_id.toString()
        //     token.owner = owner_id.toString()
        //
        //     let user = User.load(owner_id.toString())
        //     if (!user) {
        //       user = new User(owner_id.toString())
        //     }
        //
        //     token.save()
        //     user.save()
      }
    }
  }
}