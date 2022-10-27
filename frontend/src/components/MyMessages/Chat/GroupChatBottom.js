import React, { useContext, useEffect, useState } from "react";
import { WriteMessage } from "./WriteMessage";
import { NearContext } from "../../../context/NearContext";
import { PrimaryButton, SecondaryButton } from "../../../assets/css/components";
import { Loader } from "../../Loader";

export const GroupChatBottom = ({ group, replyToMessage, setReplyToMessage, onMessageSent }) => {
  const near = useContext(NearContext);
  const [isJoined, setIsJoined] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadGroupsIdList = async () => {
    return await near.mainContract.getUserGroups(near.wallet.accountId);
  }

  useEffect(() => {
    console.log(`group`, group);
    if (group.members.length) {
      setIsJoined(group.members.indexOf(near.wallet.accountId) !== -1);
    } else {
      loadGroupsIdList().then(myGroups => {
        let idList = myGroups.map(group => group.id);
        setIsJoined(idList.indexOf(group.id) !== -1);
      })
    }
  }, [group.id]);

  const isChannel = () => {
    return group.group_type === "Channel";
  }

  const joinChannel = () => {
    setIsLoading(true);
    const promise = isChannel() ? near.mainContract.joinPublicChannel(group.id) : near.mainContract.joinPublicGroup(group.id);

    promise.then(result => {
      console.log(`join`);
      setIsJoined(true);
      setIsLoading(false);
    });
  }

  const leaveChannel = () => {
    setIsLoading(true);
    const promise = isChannel() ? near.mainContract.leaveChannel(group.id) : near.mainContract.leaveGroup(group.id);
    promise.then(result => {
      console.log(`leave`);
      setIsJoined(false);
      setIsLoading(false);
    });
  }

  const canWriteMessages = () => {
    if (group.owner === near.wallet.accountId) {
      return true;
    }
    if (!isChannel()) {
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
                  <SecondaryButton small="true" onClick={() => leaveChannel()}>
                    Leave {isChannel() ? "Channel" : "Group"}
                    {isLoading && (<span className={"ml-2"}><Loader size={"sm"}/></span>)}
                  </SecondaryButton>
                </>
              ) : (
                <>
                  <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                  <PrimaryButton small="true" onClick={() => joinChannel()}>
                    Join {isChannel() ? "Channel" : "Group"}
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
}

