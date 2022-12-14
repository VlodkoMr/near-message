import { SecretChat } from "./secret-chat";
import { base_encode } from "near-api-js/lib/utils/serialize";
import { timestampToDate } from "./datetime";

export const mediaURL = (ipfsHash) => {
  return `https://ipfs.io/ipfs/${ipfsHash}`;
}

export const formatAddress = (address) => {
  if (address.length > 18) {
    return address.slice(0, 16);
  }
  return address;
}

export const loadSocialProfile = async (address, near) => {
  const profileData = await near.socialDBContract.get([`${address}/profile/**`]);
  if (profileData) {
    return transformProfile(address, profileData[address]);
  }
}

export const convertToTera = (amount) => {
  return `${amount}000000000000`;
};

export const loadSocialProfiles = async (addressList, near) => {
  let userList = [];
  let result = {};
  addressList.map(address => {
    userList.push(`${address}/profile/**`);
  });

  const profiles = await near.socialDBContract.get(userList);
  if (profiles) {
    addressList.map(address => {
      result[address] = transformProfile(address, profiles[address] || {});
    });
    return result;
  }
}

export const getInnerId = (text, image, toAddress) => {
  const inner_id = base_encode(`${text}:${image}:${toAddress}`);
  if (inner_id.length > 10) {
    return inner_id.slice(0, 10);
  }
  return inner_id;
}

export const transformProfile = (address, socialProfile) => {
  let resultProfile = { id: address };
  if (socialProfile && Object.keys(socialProfile).length > 0) {
    const profile = socialProfile.profile;
    if (profile.name) {
      resultProfile['name'] = profile.name;
    }
    if (profile.image) {
      resultProfile['image'] = profile.image.ipfs_cid;
    }
    if (profile.linktree) {
      if (profile.linktree.github) {
        resultProfile['github'] = profile.github;
      }
      if (profile.linktree.telegram) {
        resultProfile['telegram'] = profile.telegram;
      }
      if (profile.linktree.twitter) {
        resultProfile['twitter'] = profile.twitter;
      }
      if (profile.linktree.website) {
        resultProfile['website'] = profile.website;
      }
    }
  }
  return resultProfile;
}

export const transformOneMessage = (message, accountId, isUserFirst, isDateFirst, isLast, isTemporary) => {
  message.isEncryptStart = message.text.indexOf("(secret-start:") !== -1;
  message.isEncryptAccept = message.text.indexOf("(secret-accept:") !== -1;
  message.isEncryptEnd = message.text.indexOf("(secret-end)") !== -1;
  message.isMy = message.from_address === accountId;
  message.isTemporary = isTemporary;
  message.isUserFirst = isUserFirst;
  message.isDateFirst = isDateFirst;
  message.isLast = isLast;
  message.opponentAddress = message.isMy ? message.to_address : message.from_address;

  if (message.reply_message) {
    message.reply_message = transformOneMessage(message.reply_message, accountId, false, false, false, false)
  }

  // secret chat
  const secretChat = new SecretChat(message.opponentAddress, accountId);
  if (message.from_address !== accountId) {
    if (message.isEncryptAccept && !secretChat.isPrivateModeEnabled()) {
      secretChat.storeSecretChatKey(message.text);
    }
  }

  if (isLast) {
    // Activate/Deactivate secret chat on encrypted message received
    if (message.encrypt_key && !secretChat.isPrivateModeEnabled()) {
      secretChat.switchPrivateMode(true);
    }
    if (message.isEncryptEnd && secretChat.isPrivateModeEnabled()) {
      secretChat.switchPrivateMode(false);
    }
  }

  return message;
}

export const transformMessages = (messages, accountId, lastMessageDate, lastMessageUser) => {
  return messages.map((message, index) => {
    const date = timestampToDate(message.created_at);
    const isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    const isDateFirst = date !== lastMessageDate;
    const isUserFirst = message.from_address !== lastMessageUser;
    const result = transformOneMessage(message, accountId, isUserFirst, isDateFirst, isLast, false);

    lastMessageDate = date;
    lastMessageUser = message.from_address;
    return result;
  });
}

export const generateTemporaryMessage = (text, image, accountId, opponentAddress, encryptKey) => {
  const inner_id = getInnerId(text, image, opponentAddress);
  const message = {
    id: inner_id,
    from_address: accountId,
    to_address: opponentAddress,
    text,
    inner_id,
    image,
    encrypt_key: encryptKey || ""
  }
  return transformOneMessage(message, accountId, true, true, true, true);
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const decodeMessageText = (message, myAccountId) => {
  let result = message.text;
  if (message.encrypt_key) {
    const secretChat = new SecretChat(message.opponentAddress, myAccountId);
    result = secretChat.decode(message.text, message.encrypt_key)
  }

  // Replace message text for secret chat events
  if (message.isEncryptAccept) {
    result = "Private chat request accepted";
  } else if (message.isEncryptEnd) {
    result = "Private chat disabled";
  } else if (message.isEncryptStart) {
    result = "Private chat request";
  }

  return result;
}