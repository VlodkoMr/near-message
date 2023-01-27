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

interface IMessage {
  id: string;
}

interface IProfile {
  id: string;
  name: string;
}