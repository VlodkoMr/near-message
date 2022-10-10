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
  const profileData = await near.socialDBContract.get([ `${address}/profile/**` ]);
  return transformProfile(address, profileData[address]);
}

export const loadSocialProfiles = async (addressList, near) => {
  let userList = [];
  let result = {};
  addressList.map(address => {
    userList.push(`${address}/profile/**`);
  });

  const profiles = await near.socialDBContract.get(userList);
  Object.keys(profiles).forEach(address => {
    result[address] = transformProfile(address, profiles[address] || {});
    console.log(`result[address]`, result[address]);
  });
  return result;
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

export const transformMessages = (messages, accountId, lastMessageUser) => {
  return messages.map((message, index) => {
    message.isFirst = lastMessageUser !== message.from_user.id;
    message.isMy = message.from_user.id === accountId;
    message.isLast = !messages[index + 1] || messages[index + 1].from_user.id !== message.from_user.id;
    message.isTemporary = false;

    lastMessageUser = message.from_user.id;
    return message;
  });
}

export const generateTemporaryMessage = (id, text, media, accountId) => {
  return {
    created_at: new Date() / 1000,
    from_user: { id: accountId, media: null },
    id: id,
    isFirst: true,
    isLast: true,
    isMy: true,
    isTemporary: true,
    text,
    media,
  };
}