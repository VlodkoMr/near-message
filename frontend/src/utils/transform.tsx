import { SecretChat } from "../services/secretChat";
import { base_encode } from "near-api-js/lib/utils/serialize";
import { timestampToDate } from "./datetime";
import { IMessageInput, IMessage, INearContext, IProfile } from "../types";

export const mediaURL = (ipfsHash: string): string => {
  return `https://ipfs.io/ipfs/${ipfsHash}`;
}

export const socialMediaURL = (ipfsHash: string): string => {
  return `https://ipfs.near.social/ipfs/${ipfsHash}`;
}

export const formatAddress = (address: string): string => {
  if (address.length > 18) {
    return address.slice(0, 16);
  }
  return address;
}

export const loadSocialProfile = async (address: string, near: INearContext): Promise<IProfile|undefined> => {
  const profileData = await near.socialDBContract?.get([ `${address}/profile/**` ]);
  if (profileData) {
    return transformProfile(address, profileData[address]);
  }
}

export const convertToTera = (amount: string): string => {
  return `${amount}000000000000`;
};

export const loadSocialProfiles = async (addressList: string[], near: INearContext): Promise<Record<string, IProfile>|undefined> => {
  let userList: string[] = [];
  let result: Record<string, IProfile> = {};
  addressList.map(address => {
    userList.push(`${address}/profile/**`);
  });

  const profiles = await near.socialDBContract?.get(userList);
  if (profiles) {
    addressList.map(address => {
      result[address] = transformProfile(address, profiles[address] || {});
    });
    return result;
  }
}

export const getInnerId = (text: string, image: string, toAddress: string|number): string => {
  const inner_id = base_encode(`${text}:${image}:${toAddress}`);
  if (inner_id.length > 10) {
    return inner_id.slice(0, 10);
  }
  return inner_id;
}

export const transformProfile = (address: string, socialProfile: any): IProfile => {
  let resultProfile: IProfile = { id: address };
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

export const transformOneMessage = (
  inputMessage: IMessageInput, accountId: string, isUserFirst: boolean, isDateFirst: boolean, isLast: boolean, isTemporary: boolean
) => {
  const isMy = inputMessage.from_address === accountId;
  let message = {
    ...inputMessage,
    isEncryptStart: inputMessage.text.indexOf("(secret-start:") !== -1,
    isEncryptAccept: inputMessage.text.indexOf("(secret-accept:") !== -1,
    isEncryptEnd: inputMessage.text.indexOf("(secret-end)") !== -1,
    isMy,
    isTemporary,
    isUserFirst,
    isDateFirst,
    isLast,
    opponentAddress: isMy ? inputMessage.to_address : inputMessage.from_address,
  } as IMessage;

  if (message.reply_message) {
    message.reply_message = transformOneMessage(
      inputMessage.reply_message as IMessageInput,
      accountId,
      false,
      false,
      false,
      false
    );
  }

  // secret chat
  const secretChat = new SecretChat(message.opponentAddress, accountId);
  if (inputMessage.from_address !== accountId) {
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

export const transformMessages = (
  messages: IMessageInput[], accountId: string, lastMessageDate?: string, lastMessageUser?: string
) => {
  return messages.map((message, index) => {
    const date = timestampToDate(message.created_at || null);
    const isLast = !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
    const isDateFirst = date !== lastMessageDate;
    const isUserFirst = message.from_address !== lastMessageUser;
    const result = transformOneMessage(message, accountId, isUserFirst, isDateFirst, isLast, false);

    lastMessageDate = date as string;
    lastMessageUser = message.from_address;
    return result;
  });
}

export const generateTemporaryMessage = (
  text: string, image: string, accountId: string, opponentAddress: string, encryptKey: string
): IMessage => {
  const inner_id = getInnerId(text, image, opponentAddress);
  const message = {
    id: inner_id,
    from_address: accountId,
    to_address: opponentAddress,
    text,
    inner_id,
    image,
    deposit: "0",
    encrypt_key: encryptKey || ""
  } as IMessageInput;
  return transformOneMessage(message, accountId, true, true, true, true);
}

export const onlyUnique = (value: string, index: number, list: string[]): boolean => {
  return list.indexOf(value) === index;
}

export const decodeMessageText = (message: IMessage, myAccountId: string): string => {
  let result = message.text;
  if (message.encrypt_key) {
    const secretChat = new SecretChat(message.opponentAddress, myAccountId);
    result = secretChat.decode(message.text, message.encrypt_key) as string;
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