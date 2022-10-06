import { createClient } from "urql";
import { API_URL } from "../settings/config";

const client = new createClient({ url: API_URL });

export const loadPrivateChatsPromise = (accountId) => {
  return new Promise(async (resolve) => {
    const chatListQuery = `{
        privateChatSearch(text:"${accountId}"){
           id,
           last_message{
            id, 
            text, 
            from_user{id, media},
            to_user{id, media},
           },
           updated_at,
           is_removed
        }
      }`;
    const result = await client.query(chatListQuery).toPromise();
    const chatList = result.data.privateChatSearch.filter(chat => !chat.is_removed);

    resolve(chatList);
  });
}

export const loadRoomChatsPromise = (idList) => {
  return new Promise(async (resolve) => {
    const roomChatListQuery = `{
        roomChats(
           last: 50, 
           orderBy: updated_at, 
           orderDirection: desc,
           where: {
          id_in: [${idList.join(',')}],
        }
        ) {
          id,
          last_message{
             id, 
             text, 
             from_user{id, media},
          },
         updated_at,
         is_removed
        }
      }`;
    const result = await client.query(roomChatListQuery).toPromise();
    const chatList = result.data.roomChats.filter(chat => !chat.is_removed);

    resolve(chatList);
  });
}

export const loadRoomMessages = async (roomId) => {
  return new Promise(async (resolve) => {
    const messagesQuery = `{
    roomMessages(
      last: 50, 
      orderBy: created_at, 
      where: {
        room_id: "${roomId}",
      }) {
        id
        text
        from_user{id, media},
        created_at
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();

    resolve(result.data.roomMessages);
  });
}

export const loadPrivateMessages = async (chatId) => {
  return new Promise(async (resolve) => {
    const messagesQuery = `{
    privateMessages(
      last: 50, 
      orderBy: created_at, 
      where: {
        chat_id: "${chatId}",
      }) {
        id
        text
        from_user{id, media},
        to_user{id, media},
        created_at
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();

    resolve(result.data.privateMessages);
  });
}