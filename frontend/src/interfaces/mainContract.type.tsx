import { GroupType } from "../types";

interface IMainContract {
  contractId: string;
  wallet: any;

  getGroupById(id: number): Promise<any>;

  getPublicGroups(page_limit: number, skip?: number): Promise<any>;

  getUserInfo(address: string): Promise<any>;

  getSpamCount(address: string): Promise<any>;

  userAccountLevelUp(depositNEAR: number): Promise<any>;

  getOwnerGroups(account: string): Promise<any>;

  getUserGroups(account: string): Promise<any>;

  createNewGroup(title: string, image: string, text: string, url: string, group_type: GroupType, members: string[], moderator: string): Promise<any>;

  editGroup(id: string, title: string, image: string, text: string, url: string): Promise<any>;

  ownerAddGroupMembers(id: string, members: string[]): Promise<any>;

  ownerRemoveGroupMembers(id: string, members: string[]): Promise<any>;

  ownerRemoveGroup(id: string, confirm_title: string): Promise<any>;

  joinPublicGroup(id: number): Promise<any>;

  joinPublicChannel(id: number): Promise<any>;

  leaveGroup(id: string): Promise<any>;

  leaveChannel(id: string): Promise<any>;

  spamReport(message_id: string, message_sender: string): Promise<any>;

  sendPrivateMessage(text: string, image: string, to_address: string, reply_message_id: string, encrypt_key: string, attached_tokens: number): Promise<any>;

  sendGroupMessage(text: string, image: string, group_id: string, reply_message_id: string): Promise<any>;

}

export default IMainContract;