import { createClient } from "urql";

export const postRequest = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data)
  });
  return response.json();
}

export const loadPrivateChatsPromise = (accountId) => {
  return new Promise(async (resolve, reject) => {
    const client = new createClient({ url: process.env.GRAPH_API_URL });
    const chatListQuery = `{
        privateChatSearch(text:"${accountId}"){
           id
           last_message {
             id
             text
             image
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
    const client = new createClient({ url: process.env.GRAPH_API_URL });
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
             image
             from_address
          }
         updated_at
         is_removed
         total_messages
        }
      }`;
    const result = await client.query(groupChatListQuery).toPromise();
    if (result.data) {
      resolve(result.data.groupChats.filter(chat => !chat.is_removed).reverse());
    } else {
      reject();
    }
  });
}

export const loadGroupMessages = (groupId, messagesCount, skip = 0) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: process.env.GRAPH_API_URL });
    const messagesQuery = `{
    groupMessages(
      last: ${messagesCount},
      skip: ${skip},
      orderBy: created_at,
      orderDirection: desc,
      where: {
        group_id: "${groupId}",
      }) {
        id
        inner_id
        text
        image
        from_address
        created_at
        reply_message {id, from_address, text, image}
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data.groupMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const loadNewGroupMessages = (groupId, lastMessageId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: process.env.GRAPH_API_URL });
    const messagesQuery = `{
    groupMessages(
      orderBy: created_at,
      orderDirection: desc,
      where: {
        group_id: "${groupId}",
        id_num_gt: ${lastMessageId}
      }) {
        id
        inner_id
        text
        image
        from_address
        created_at
        reply_message {id, from_address, text, image}
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data.groupMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const loadPrivateMessages = (chatId, messagesCount, skip = 0) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: process.env.GRAPH_API_URL });
    const messagesQuery = `{
    privateMessages(
      last: ${messagesCount}, 
      skip: ${skip},
      orderBy: created_at,
      orderDirection: desc,
      where: {
        chat_id: "${chatId}",
      }) {
        id
        inner_id
        text
        image
        from_address
        to_address
        created_at
        deposit
        encrypt_key
        reply_message {id, from_address, text, image, encrypt_key}
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data.privateMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const loadNewPrivateMessages = (chatId, lastMessageId) => {
  return new Promise(async (resolve) => {
    const client = new createClient({ url: process.env.GRAPH_API_URL });
    const messagesQuery = `{
    privateMessages(
      orderBy: created_at,
      orderDirection: desc,
      where: {
        chat_id: "${chatId}",
        id_num_gt: ${lastMessageId}
      }) {
        id
        inner_id
        text
        image
        from_address
        to_address
        created_at
        deposit
        encrypt_key
        reply_message {id, from_address, text, image, encrypt_key}
      }
    }`;
    const result = await client.query(messagesQuery).toPromise();
    if (result.data) {
      resolve(result.data.privateMessages.reverse());
    } else {
      resolve([]);
    }
  });
}

export const getPrivateChatId = (user1, user2) => {
  if (user1 > user2) {
    return user1.concat("|").concat(user2);
  }
  return user2.concat("|").concat(user1);
}

export const isChannel = (group) => {
  return group.group_type === "Channel";
}

export const isJoinedGroup = (group, near) => new Promise(async (resolve) => {
  if (!isChannel(group)) {
    resolve(group.members.indexOf(near.wallet.accountId) !== -1);
  } else {
    const myGroups = await near.mainContract.getUserGroups(near.wallet.accountId);
    const idList = myGroups.map(group => group.id);
    resolve(idList.indexOf(group.id) !== -1);
  }
})