export class SocialDBContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Read Data
   * @param keys
   * @returns {Promise<any>}
   */
  async get(keys) {
    try {
      return await this.wallet.viewMethod({
        contractId: this.contractId,
        method: 'get',
        args: {
          keys
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  // async createUserAccount(media, instagram, telegram, twitter, website) {
  //   return await this.wallet.callMethod({
  //     contractId: this.contractId,
  //     method: 'create_user_account',
  //     args: {
  //       media,
  //       instagram,
  //       telegram,
  //       twitter,
  //       website,
  //     }
  //   })
  // }


}