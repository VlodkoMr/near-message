import { utils } from 'near-api-js';
import { convertToTera, getInnerId } from "../utils/transform";

export class MainContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  /**
   * Group by ID
   * @param id
   * @returns {Promise<any>}
   */
  async getGroupById(id) {
    try {
      return await this.wallet.viewMethod({
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

  async getPublicGroups(page_limit, skip = 0) {
    try {
      return await this.wallet.viewMethod({
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
  async getUserInfo(address) {
    try {
      return await this.wallet.viewMethod({
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
  async getSpamCount(address) {
    try {
      return await this.wallet.viewMethod({
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
  async userAccountLevelUp(depositNEAR) {
    const deposit = utils.format.parseNearAmount(depositNEAR.toString());
    try {
      const gas = convertToTera(30);
      return await this.wallet.callMethod({
        contractId: this.contractId,
        method: 'user_account_level_up',
        gas,
        deposit
      });
    } catch (e) {
      console.log(`blockchain error`, e);
    }
  }

  /**
   * Get owned groups
   * @returns {Promise<any>}
   */
  async getOwnerGroups(account) {
    try {
      return await this.wallet.viewMethod({
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
  async getUserGroups(account) {
    try {
      return await this.wallet.viewMethod({
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
   * @returns {Promise<*>}
   */
  async createNewGroup(title, image, text, url, group_type, members) {
    const deposit = utils.format.parseNearAmount("0.25");
    const gas = convertToTera(80);

    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_new_group',
      args: {
        title,
        image,
        url,
        text,
        group_type,
        members,
        edit_members: true
      },
      gas,
      deposit
    })
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
  async editGroup(id, title, image, text, url) {
    const gas = convertToTera(50);
    return await this.wallet.callMethod({
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
  async ownerAddGroupMembers(id, members) {
    return await this.wallet.callMethod({
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
  async ownerRemoveGroupMembers(id, members) {
    return await this.wallet.callMethod({
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
  async ownerRemoveGroup(group_id, confirm_title) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'owner_remove_group',
      args: {
        group_id,
        confirm_title
      }
    })
  }

  /**
   * Join Public group
   * @param id
   * @returns {Promise<*>}
   */
  async joinPublicGroup(id) {
    const deposit = utils.format.parseNearAmount("0.01");
    const gas = convertToTera(150);

    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'join_public_group',
      args: {
        id,
      },
      gas,
      deposit
    })
  }

  /**
   * Join Public channel
   * @param id
   * @returns {Promise<*>}
   */
  async joinPublicChannel(id) {
    const deposit = utils.format.parseNearAmount("0.0001");
    const gas = convertToTera(150);

    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'join_public_channel',
      args: {
        id,
      },
      gas,
      deposit
    })
  }

  /**
   * Leave group
   * @param id
   * @returns {Promise<*>}
   */
  async leaveGroup(id) {
    return await this.wallet.callMethod({
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
  async leaveChannel(id) {
    return await this.wallet.callMethod({
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
   * @returns {Promise<*>}
   */
  async spamReport(message_id, message_sender) {
    const gas = convertToTera(250);
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'spam_report',
      args: {
        message_id,
        message_sender
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
  async sendPrivateMessage(text, image, to_address, reply_message_id, encrypt_key, attached_tokens) {
    const inner_id = getInnerId(text, image, to_address);
    const gas = convertToTera(30);
    const deposit = utils.format.parseNearAmount(attached_tokens.toString());

    return await this.wallet.callMethod({
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
      deposit
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
  async sendGroupMessage(text, image, group_id, reply_message_id) {
    const inner_id = getInnerId(text, image, group_id);
    return await this.wallet.callMethod({
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