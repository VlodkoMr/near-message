import MainContract from "./contracts/MainContract";
import SocialDBContract from "./contracts/SocialDBContract";
import { Wallet } from "./services/NearWallet";

interface INearContext {
  wallet: Wallet|undefined,
  mainContract: MainContract|undefined,
  socialDBContract: SocialDBContract|undefined,
  account: IUserAccount|undefined,
  isSigned: boolean,
}

type GroupType = "Public"|"Private"|"Channel";

interface IGroup {
  id: number;
  image: string;
  title: string;
  group_type: GroupType;
  edit_members: boolean;
  members_count: number;
  moderator: string;
  owner: string;
  text: string;
  url: string;
  members: string[];
}

interface IMessageInput {
  id: string;
  text: string;
  image: string;
  from_address: string;
  to_address: string;
  inner_id: string;
  created_at?: number;
  deposit: string;
  encrypt_key: string;
  reply_message?: IInputMessage;
}

interface IMessage {
  id: string;
  text: string;
  image: string;
  from_address: string;
  to_address: string;
  inner_id: string;
  deposit: string;
  isEncryptStart: boolean;
  isEncryptEnd: boolean;
  isEncryptAccept: boolean;
  isMy: boolean;
  isTemporary: boolean;
  isUserFirst: boolean;
  isDateFirst: boolean;
  isLast: boolean;
  opponentAddress: string;
  reply_message: IInputMessage|null;
  encrypt_key: string;
  created_at: number;
}

interface IProfile {
  id: string;
  name?: string;
  image?: string;
  github?: string;
  telegram?: string;
  twitter?: string;
  website?: string;
}

interface IUserAccount {
  id: string;
  level: number;
  last_spam_report: number;
  spam_counts: number;
  verified: boolean;
}

interface IChatInput {
  id: string;
  last_message: IMessage;
  updated_at: number;
  is_removed: boolean;
  __typename: string;
}

type EditGroupFormData = {
  title: string,
  logo: string,
  text: string,
  url: string,
  owner: string,
  moderator: string,
  group_type: GroupType|"",
  members: string[],
}