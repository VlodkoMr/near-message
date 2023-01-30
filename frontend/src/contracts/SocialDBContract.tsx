import ISocialDBContract from "./ISocialDBContract.type";
import { Wallet } from "../services/NearWallet";

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

  static getContractAddress = (): string => {
    const contract_name = process.env.CONTRACT_NAME;
    console.log(`CONTRACT_NAME`, contract_name);

    if (contract_name && contract_name.indexOf('.near') === -1) {
      return 'v1.social08.testnet';
    }
    return 'social.near';
  }
}

export default SocialDBContract;