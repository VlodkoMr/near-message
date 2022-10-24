import { SecretChat } from "./secret-chat";

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

export const transformMessages = (near, messages, accountId, lastMessageUser) => {
  return messages.map((message, index) => {
    message.isEncryptStart = message.text.indexOf("(secret-start:") !== -1;
    message.isEncryptAccept = message.text.indexOf("(secret-accept:") !== -1;
    message.isEncryptEnd = message.text.indexOf("(secret-end)") !== -1;
    message.isFirst = lastMessageUser !== message.from_address;
    message.isMy = message.from_address === accountId;
    message.isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    message.isTemporary = false;

    // secret chat
    if (message.from_address !== accountId) {
      const secretChat = new SecretChat(message.from_address, message.to_address);
      if (message.isEncryptAccept && !secretChat.isSecretChatEnabled()) {
        secretChat.storeSecretChatKey(message.text);
      }
      if (message.isEncryptEnd && secretChat.isSecretChatEnabled()) {
        secretChat.switchPrivateMode(false);
      }
    }

    lastMessageUser = message.from_address;
    return message;
  });
}

export const generateTemporaryMessage = (id, text, image, accountId, opponent) => {
  return {
    created_at: new Date() / 1000,
    from_address: accountId,
    id: id,
    to: opponent,
    isFirst: true,
    isMy: true,
    isTemporary: true,
    text,
    image,
  };
}

export const onlyUnique = (value, index, self) => {
  return self.indexOf(value) === index;
}