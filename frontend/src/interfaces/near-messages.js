/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class NearMessages {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  // async getGreeting() {
  //   return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_greeting' });
  // }

  async sendMessage(toUser, text) {
    return await this.wallet.callMethod({
      contractId: this.contractId, method: 'send_message', args: {
        text,
        toUser,
        roomId: null
      }
    });
  }
}