import { createClient } from "urql";
import { API_URL } from "../settings/config";

export const loadPrivateChatsPromise = (accountId) => {
  return new Promise(async (resolve, reject) => {
    const client = new createClient({ url: API_URL });
    const chatListQuery = `{
        privateChatSearch(text:"${accountId}"){
           id
           last_message {
             id
             text
             media
             from_address
             to_address
             encrypt_key
           }
           updated_at
           is_removed
           total_messages
        }
      }`;
    const result = await client.query(chatListQuery).toPromise();
    if (result.data) {
      resolve(result.data.privateChatSearch.filter(chat => !chat.is_removed));
    } else {
      reject();
    }
  });
}

export const loadGroupChatsPromise = (idList) => {
  return new Promise(async (resolve, reject) => {
    const client = new createClient({ url: API_URL });
    const groupChatListQuery = `{
        groupChats(
           orderBy: updated_at, 
           orderDirection: desc,
           where: {
           id_in: [${idList.join(',')}],
        }) {
          id
          last_message {
             id
             text
             media
             from_address
          }
         updated_at
         is_removed
         total_messages
        }
      }`;
    const result = await client.query(groupChatListQuery).toPromise();
    if (result.data) {
      resolve(result.data.groupChats.filter(chat => !chat.is_removed));
    } else {
      reject();
    }
  });
}

export const loadGroupMessages = (groupId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: API_URL });
    const messagesQuery = `{
    groupMessages(
      last: 100, 
      orderBy: created_at, 
      where: {
        group_id: "${groupId}",
      }) {
        id
        text
        media
        from_address
        created_at
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    resolve(result.data?.groupMessages);
  });
}

export const loadNewGroupMessages = (groupId, lastMessageId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: API_URL });
    const messagesQuery = `{
    groupMessages(
      orderBy: created_at, 
      where: {
        group_id: "${groupId}",
        id_num_gt: ${lastMessageId}
      }) {
        id
        text
        media
        from_address
        created_at
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    resolve(result.data?.groupMessages);
  });
}

export const loadPrivateMessages = (chatId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: API_URL });
    const messagesQuery = `{
    privateMessages(
      last: 100, 
      orderBy: created_at, 
      where: {
        chat_id: "${chatId}",
      }) {
        id
        text
        media
        from_address
        to_address
        created_at
        encrypt_key
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    resolve(result.data?.privateMessages);
  });
}

export const loadNewPrivateMessages = (chatId, lastMessageId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: API_URL });
    const messagesQuery = `{
    privateMessages(
      orderBy: created_at, 
      where: {
        chat_id: "${chatId}",
        id_num_gt: ${lastMessageId}
      }) {
        id
        text
        media
        from_address
        to_address
        created_at
        encrypt_key
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    resolve(result.data?.privateMessages);
  });
}

export const getPrivateChatId = (user1, user2) => {
  if (user1 > user2) {
    return user1.concat("|").concat(user2);
  }
  return user2.concat("|").concat(user1);
}