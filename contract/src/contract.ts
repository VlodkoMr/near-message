import {NearBindgen, near, call, view, initialize, UnorderedMap} from 'near-sdk-js';
import {AccountId} from "near-sdk-js/lib/types";
import {predecessorAccountId} from "near-sdk-js/lib/api";

@NearBindgen({})
class NearMessage {
  owner: AccountId;
  users: UnorderedMap
  // rooms: UnorderedMap
  // userRooms: UnorderedMap

  // 101337198

  @initialize({})
  init({}) {
    this.owner = near.predecessorAccountId()
    this.users = new UnorderedMap('map-users')
    // this.rooms = new UnorderedMap('map-rooms')
    // this.userRooms = new UnorderedMap('map-user-rooms')
  }

  // @view({})
  // get_user_rooms(): string {
  //   // return this.greeting;
  // }

  @call({})
  send_message({text, toUser, roomId}: { text: string, toUser: AccountId, roomId: number | null }): void {
    let messageId = `${near.blockTimestamp()}.${near.predecessorAccountId()}.${toUser}`
    let fromUser = near.predecessorAccountId();

    near.log({
      messageId,
      fromUser,
      toUser,
      roomId,
      messageText: text
    });
  }
}