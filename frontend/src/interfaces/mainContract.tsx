import { utils } from 'near-api-js';
import { convertToTera, getInnerId } from "../utils/transform";
import IMainContract from "./mainContract.type";
import { Wallet } from "../utils/near-wallet";
import { GroupType, IGroup } from "../types";

class MainContract implements IMainContract {
  contractId: string = "";
  wallet: Wallet|null = null;

  constructor({ contractId, walletToUse }: {contractId: string, walletToUse: Wallet}) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Group by ID
   * @param id
   * @returns {Promise<any>}
   */
  async getGroupById(id: number) {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_group_by_id',
        args: {
          id
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Get groups list
   * @param page_limit
   * @param skip
   */
  async getPublicGroups(page_limit: number, skip = 0): Promise<IGroup[]|undefined> {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_public_groups',
        args: {
          page_limit,
          skip
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * User additional Info
   * @param address
   * @returns {Promise<any>}
   */
  async getUserInfo(address: string) {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_user_info',
        args: {
          address
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * User spam count
   * @param address
   * @returns {Promise<any>}
   */
  async getSpamCount(address: string) {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_spam_count',
        args: {
          address
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Activate user account Level
   * @param depositNEAR
   * @returns {Promise<any>}
   */
  async userAccountLevelUp(depositNEAR: number) {
    const deposit = utils.format.parseNearAmount(depositNEAR.toString());
    try {
      const gas = convertToTera("30");
      return await this.wallet?.callMethod({
        contractId: this.contractId,
        method: 'user_account_level_up',
        args: {},
        gas,
        deposit: deposit as string
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Get owned groups
   * @returns {Promise<any>}
   */
  async getOwnerGroups(account: string) {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_owner_groups',
        args: {
          account
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Get groups that user joined
   * @returns {Promise<any>}
   */
  async getUserGroups(account: string) {
    try {
      return await this.wallet?.viewMethod({
        contractId: this.contractId,
        method: 'get_user_groups',
        args: {
          account
        }
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Create group
   * @param title
   * @param image
   * @param text
   * @param url
   * @param group_type
   * @param members
   * @param moderator
   * @returns {Promise<*>}
   */
  async createNewGroup(
    title: string, image: string, text: string, url: string, group_type: GroupType, members: string[], moderator: string
  ): Promise<any> {
    const deposit = utils.format.parseNearAmount("0.25");
    const gas = convertToTera("80");

    let args = {
      title,
      image,
      url,
      text,
      group_type,
      members,
      edit_members: true,
      moderator: moderator || null
    };

    try {
      return await this.wallet?.callMethod({
        contractId: this.contractId,
        method: 'create_new_group',
        args,
        gas,
        deposit: deposit as string
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Edit Group
   * @param id
   * @param title
   * @param image
   * @param text
   * @param url
   * @returns {Promise<*>}
   */
  async editGroup(id: number, title: string, image: string, text: string, url: string): Promise<any> {
    const gas = convertToTera("50");
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'edit_group',
      args: {
        id,
        title,
        image,
        text,
        url
      },
      gas
    })
  }

  /**
   * Add group members
   * @param id
   * @param members
   * @returns {Promise<*>}
   */
  async ownerAddGroupMembers(id: number, members: string[]): Promise<any> {
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'owner_add_group_members',
      args: {
        id,
        members
      }
    })
  }

  /**
   * Remove group members
   * @param id
   * @param members
   * @returns {Promise<*>}
   */
  async ownerRemoveGroupMembers(id: number, members: string[]): Promise<any> {
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'owner_remove_group_members',
      args: {
        id,
        members
      }
    })
  }

  /**
   * Remove group
   * @param group_id
   * @param confirm_title
   * @returns {Promise<*>}
   */
  async ownerRemoveGroup(group_id: number, confirm_title: string): Promise<any> {
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'owner_remove_group',
      args: {
        id: group_id,
        confirm_title
      }
    })
  }

  /**
   * Join Public group
   * @param id
   * @returns {Promise<*>}
   */
  async joinPublicGroup(id: number) {
    const deposit = utils.format.parseNearAmount("0.01");
    const gas = convertToTera("150");

    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'join_public_group',
      args: {
        id,
      },
      gas,
      deposit: deposit as string
    })
  }

  /**
   * Join Public channel
   * @param id
   * @returns {Promise<*>}
   */
  async joinPublicChannel(id: number): Promise<any> {
    const deposit = utils.format.parseNearAmount("0.0001");
    const gas = convertToTera("150");

    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'join_public_channel',
      args: {
        id,
      },
      gas,
      deposit: deposit as string
    })
  }

  /**
   * Leave group
   * @param id
   * @returns {Promise<*>}
   */
  async leaveGroup(id: number): Promise<any> {
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'leave_group',
      args: {
        id,
      }
    })
  }

  /**
   * Leave channel
   * @param id
   * @returns {Promise<*>}
   */
  async leaveChannel(id: number): Promise<any> {
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'leave_channel',
      args: {
        id,
      }
    })
  }

  /**
   * Report spam
   * @param message_id
   * @param message_sender
   * @param is_group
   * @returns {Promise<*>}
   */
  async spamReport(message_id: string, message_sender: string, is_group: boolean): Promise<any> {
    const gas = convertToTera("250");
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'spam_report',
      args: {
        message_id,
        message_sender,
        is_group
      },
      gas
    })
  }

  /**
   * Send message to Account
   * @param text
   * @param image
   * @param to_address
   * @param reply_message_id
   * @param encrypt_key
   * @param attached_tokens
   * @returns {Promise<*>}
   */
  async sendPrivateMessage(
    text: string, image: string, to_address: string, reply_message_id: string, encrypt_key: string, attached_tokens: number
  ) {
    const inner_id = getInnerId(text, image, to_address);
    const gas = convertToTera("30");
    const deposit = utils.format.parseNearAmount(attached_tokens.toString());

    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'send_private_message',
      args: {
        text,
        image,
        to_address,
        encrypt_key,
        reply_message_id,
        inner_id
      },
      gas,
      deposit: deposit as string
    })
  }

  /**
   * Send message to the group
   * @param text
   * @param image
   * @param group_id
   * @param reply_message_id
   * @returns {Promise<*>}
   */
  async sendGroupMessage(
    text: string, image: string, group_id: number, reply_message_id: string
  ) {
    const inner_id = getInnerId(text, image, group_id);
    return this.wallet?.callMethod({
      contractId: this.contractId,
      method: 'send_group_message',
      args: {
        text,
        image,
        group_id,
        reply_message_id,
        inner_id
      }
    })
  }

}

export default MainContract;