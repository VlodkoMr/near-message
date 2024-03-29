import React, { SetStateAction, useContext, useState } from "react";
import WriteMessage from "./WriteMessage";
import { NearContext } from "../../../context/NearContext";
import { PrimaryButton, SecondaryButton } from "../../../assets/css/components";
import Loader from "../../../ui/Loader";
import { isChannel } from "../../../utils/requests";
import { IGroup, IMessage, INearContext } from "../../../types";

type Props = {
  group: IGroup,
  replyToMessage: IMessage|null,
  setReplyToMessage: (replyToMessage: SetStateAction<any>) => void,
  onMessageSent: (text: string, image: string) => void,
  isJoined: boolean,
  setIsJoined: (isJoined: boolean) => void
};

const GroupChatBottom: React.FC<Props> = (
  {
    group, replyToMessage, setReplyToMessage, onMessageSent, isJoined, setIsJoined
  }: Props) => {
  const near: INearContext = useContext(NearContext);
  const [ isLoading, setIsLoading ] = useState(false);

  const joinChannel = () => {
    setIsLoading(true);
    const promise = isChannel(group) ? near.mainContract?.joinPublicChannel(group.id) : near.mainContract?.joinPublicGroup(group.id);

    if (promise) {
      promise.then(() => {
        setIsJoined(true);
        setIsLoading(false);
      });
    }
  }

  const leaveChannel = () => {
    setIsLoading(true);
    const promise = isChannel(group) ? near.mainContract?.leaveChannel(group.id) : near.mainContract?.leaveGroup(group.id);
    if (promise) {
      promise.then(() => {
        setIsJoined(false);
        setIsLoading(false);
      });
    }
  }

  const canWriteMessages = () => {
    if (near.wallet && (group.owner === near.wallet.accountId || group.moderator === near.wallet.accountId)) {
      return true;
    }
    if (!isChannel(group)) {
      return isJoined;
    }
    return false;
  }

  return (
    <>
      {canWriteMessages() ? (
        <WriteMessage toGroup={group}
                      replyToMessage={replyToMessage}
                      setReplyToMessage={setReplyToMessage}
                      onMessageSent={onMessageSent}
        />
      ) : (
        <>
          {(group.edit_members && group.group_type !== "Private") && (
            <div className={"px-6 py-4 border-t-2 border-gray-700/30 flex flex-row justify-between"}>
              {isJoined ? (
                <>
                  <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                  <SecondaryButton small="true" onClick={leaveChannel}>
                    Leave {isChannel(group) ? "Channel" : "Group"}
                    {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                  </SecondaryButton>
                </>
              ) : (
                <>
                  <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                  <PrimaryButton small="true" onClick={joinChannel}>
                    Join {isChannel(group) ? "Channel" : "Group"}
                    {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                  </PrimaryButton>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default GroupChatBottom;