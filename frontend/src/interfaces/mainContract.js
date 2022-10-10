import { utils } from 'near-api-js';

const THIRTY_TGAS = '30000000000000';

export class MainContract {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;

    console.log(`this.wallet`, this.wallet);
  }

  /**
   * Group by ID
   * @param id
   * @returns {Promise<any>}
   */
  async getGroupById(id) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_group_by_id',
      args: {
        id
      }
    });
  }

  /**
   * User additional Info
   * @param address
   * @returns {Promise<any>}
   */
  async getUserInfo(address) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_user_info',
      args: {
        address
      }
    });
  }

  /**
   * Get owned groups
   * @returns {Promise<any>}
   */
  async getOwnerGroups(account) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_owner_groups',
      args: {
        account
      }
    });
  }

  /**
   * Get groups that user joined
   * @returns {Promise<any>}
   */
  async getUserGroups(account) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_user_groups',
      args: {
        account
      }
    });
  }

  /**
   * Create group
   * @param title
   * @param media
   * @param group_type
   * @param members
   * @returns {Promise<*>}
   */
  async createNewGroup(title, media, group_type, members) {
    const deposit = utils.format.parseNearAmount("0.25");
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_new_group',
      args: {
        title,
        media,
        group_type,
        members
      },
      THIRTY_TGAS,
      deposit
    })
  }

  /**
   * Edit Group
   * @param id
   * @param title
   * @param media
   * @returns {Promise<*>}
   */
  async editGroup(id, title, media) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'edit_group',
      args: {
        id,
        title,
        media,
      }
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
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'join_public_group',
      args: {
        id,
      }
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
   * Send message to Account
   * @param text
   * @param media
   * @param to_address
   * @param reply_message_id
   * @returns {Promise<*>}
   */
  async sendPrivateMessage(text, media, to_address, reply_message_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'send_private_message',
      args: {
        text,
        media,
        to_address,
        reply_message_id
      }
    })
  }

  /**
   * Send message to the group
   * @param text
   * @param media
   * @param group_id
   * @param reply_message_id
   * @returns {Promise<*>}
   */
  async sendGroupMessage(text, media, group_id, reply_message_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'send_group_message',
      args: {
        text,
        media,
        group_id,
        reply_message_id
      }
    })
  }

  /**
   * Create user account
   * @param media
   * @param instagram
   * @param telegram
   * @param twitter
   * @param website
   * @returns {Promise<*>}
   */
  async createUserAccount(media, instagram, telegram, twitter, website) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_user_account',
      args: {
        media,
        instagram,
        telegram,
        twitter,
        website,
      }
    })
  }


}