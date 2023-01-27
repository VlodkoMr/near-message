import MainContract from "./interfaces/mainContract";
import SocialDBContract from "./interfaces/socialDBContract";

interface INearContext {
  wallet: any,
  mainContract: MainContract|null,
  socialDBContract: SocialDBContract|null,
  isSigned: boolean,
  account: any
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
  createdAt: number;
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

interface IChatInput {
  id: string;
  last_message: IMessage;
  updated_at: number;
  __typename: string;
  is_removed: boolean;
}
