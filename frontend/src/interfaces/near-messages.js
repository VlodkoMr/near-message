import { utils } from 'near-api-js';

const THIRTY_TGAS = '30000000000000';

export class NearMessages {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;

    console.log(`this.wallet`, this.wallet);
  }

  /**
   * Room by ID
   * @param id
   * @returns {Promise<any>}
   */
  async getRoomById(id) {
    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_room_by_id',
      args: {
        id
      }
    });
  }

  /**
   * Get owned rooms
   * @returns {Promise<any>}
   */
  async getOwnerRooms() {
    const account = "...";

    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_owner_rooms',
      args: {
        account
      }
    });
  }

  /**
   * Get rooms that user joined
   * @returns {Promise<any>}
   */
  async getUserRooms() {
    const account = "...";

    return await this.wallet.viewMethod({
      contractId: this.contractId,
      method: 'get_user_rooms',
      args: {
        account
      }
    });
  }

  /**
   * Create room
   * @param title
   * @param media
   * @param is_private
   * @param is_read_only
   * @param members
   * @returns {Promise<*>}
   */
  async createNewRoom(title, media, is_private, is_read_only, members) {
    const deposit = utils.format.parseNearAmount("0.25");
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'create_new_room',
      args: {
        title,
        media,
        is_private,
        is_read_only,
        members
      },
      THIRTY_TGAS,
      deposit
    })
  }

  /**
   * Edit Room
   * @param room_id
   * @param title
   * @param media
   * @param is_private
   * @param is_read_only
   * @returns {Promise<*>}
   */
  async editRoom(room_id, title, media, is_private, is_read_only) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'edit_room',
      args: {
        room_id,
        title,
        media,
        is_private,
        is_read_only,
      }
    })
  }

  async ownerAddRoomMembers(room_id, members) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'owner_add_room_members',
      args: {
        room_id,
        members
      }
    })
  }

  async ownerRemoveRoomMembers(room_id, members) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'owner_remove_room_members',
      args: {
        room_id,
        members
      }
    })
  }

  async ownerRemoveRoom(room_id, confirm_title) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'owner_remove_room',
      args: {
        room_id,
        confirm_title
      }
    })
  }


  async join_public_room(room_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'join_public_room',
      args: {
        room_id,
      }
    })
  }

  async leave_room(room_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'leave_room',
      args: {
        room_id,
      }
    })
  }

  async sendPrivateMessage(text, to_user, reply_message_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'send_private_message',
      args: {
        text,
        to_user,
        reply_message_id
      }
    })
  }

  async send_room_message(text, to_room, reply_message_id) {
    return await this.wallet.callMethod({
      contractId: this.contractId,
      method: 'send_room_message',
      args: {
        text,
        to_room,
        reply_message_id
      }
    })
  }


}