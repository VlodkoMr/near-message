import { SecretChat } from "./secret-chat";
import { base_encode } from "near-api-js/lib/utils/serialize";

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

export const transformOneMessage = (message, accountId, isFirst, isLast, isTemporary) => {
  message.isEncryptStart = message.text.indexOf("(secret-start:") !== -1;
  message.isEncryptAccept = message.text.indexOf("(secret-accept:") !== -1;
  message.isEncryptEnd = message.text.indexOf("(secret-end)") !== -1;
  message.isMy = message.from_address === accountId;
  message.isTemporary = isTemporary;
  message.isFirst = isFirst;
  message.isLast = isLast;

  if (message.reply_message) {
    message.reply_message = transformOneMessage(message.reply_message, accountId, false, false, false)
  }

  // secret chat
  const opponentAddress = message.isMy ? message.to_address : message.from_address;
  const secretChat = new SecretChat(opponentAddress, accountId);
  if (message.from_address !== accountId) {
    if (message.isEncryptAccept && !secretChat.isPrivateModeEnabled()) {
      secretChat.storeSecretChatKey(message.text);
    }
  }

  // Activate/Deactivate secret chat on encrypted message received
  if (message.encrypt_key && !secretChat.isPrivateModeEnabled()) {
    secretChat.switchPrivateMode(true);
  }
  if (message.isEncryptEnd && secretChat.isPrivateModeEnabled()) {
    secretChat.switchPrivateMode(false);
  }

  return message;
}

export const transformMessages = (messages, accountId, lastMessageUser) => {
  return messages.map((message, index) => {
    const isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    const isFirst = lastMessageUser !== message.from_address;
    const result = transformOneMessage(message, accountId, isFirst, isLast, false);

    lastMessageUser = message.from_address;
    return result;
  });
}

export const generateTemporaryMessage = (text, image, accountId, opponentAddress) => {
  const inner_id = base_encode(`${text}:${image}:${opponentAddress}`);
  const message = {
    id: inner_id,
    from_address: accountId,
    to_address: opponentAddress,
    text,
    inner_id,
    image,
  }
  return transformOneMessage(message, accountId, true, true, true);
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}

export const transformMessageText = (message, myAccountId) => {
  if (message.encrypt_key) {
    const opponentAddress = message.from_address !== myAccountId ? message.from_address : message.to_address;
    const secretChat = new SecretChat(opponentAddress, myAccountId);
    return secretChat.decode(message.text, message.encrypt_key)
  }
  return message.text;
}