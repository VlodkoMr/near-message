import ISocialDBContract from "./socialDBContract.type";
import { Wallet } from "../utils/near-wallet";

class SocialDBContract implements ISocialDBContract {
  contractId = "";
  wallet: Wallet|null = null;

  constructor({ contractId, walletToUse }: {contractId: string, walletToUse: Wallet}) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Read Data
   * @param keys
   * @returns {Promise<any>}
   */
  async get(keys: string[]): Promise<any> {
    try {
      return this.wallet?.viewMethod({
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

export default SocialDBContract;