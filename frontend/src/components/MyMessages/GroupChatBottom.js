import React, { useContext, useEffect, useState } from "react";
import { WriteMessage } from "./WriteMessage";
import { NearContext } from "../../context/NearContext";
import { PrimaryButton, SecondaryButton } from "../../assets/css/components";

export const GroupChatBottom = ({ group, replyToMessage, setReplyToMessage, onMessageSent }) => {
  const near = useContext(NearContext);
  const [isJoined, setIsJoined] = useState(false);

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

  const joinChannel = () => {
    if (group.group_type === "Channel") {
      near.mainContract.joinPublicChannel(group.id).then(result => {
        console.log(`join Channel`);
        setIsJoined(true);
      });
    } else {
      near.mainContract.joinPublicGroup(group.id).then(result => {
        console.log(`join`);
        setIsJoined(true);
      });
    }
  }

  const leaveChannel = () => {
    if (group.group_type === "Channel") {
      near.mainContract.leaveChannel(group.id).then(result => {
        console.log(`leaveChannel`);
        setIsJoined(false);
      });
    } else {
      near.mainContract.leaveGroup(group.id).then(result => {
        console.log(`leaveGroup`);
        setIsJoined(false);
      });
    }
  }

  const canWriteMessages = () => {
    if (group.owner === near.wallet.accountId) {
      return true;
    }
    if (group.group_type !== "Channel") {
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
          {group.edit_members && (
            <div className={"px-6 py-4 border-t-2 border-gray-700/30 flex flex-row justify-between"}>
              {isJoined ? (
                <>
                  <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                  <SecondaryButton small="true" onClick={() => leaveChannel()}>
                    Leave {group.group_type === "Channel" ? "Channel" : "Group"}
                  </SecondaryButton>
                </>
              ) : (
                <>
                  <p className={"text-sm w-2/3 opacity-60"}>{group.text}</p>
                  <PrimaryButton small="true" onClick={() => joinChannel()}>
                    Join {group.group_type === "Channel" ? "Channel" : "Group"}
                  </PrimaryButton>
                </>
              )}
            </div>
          )}
        </>
      )}
      {/*{group.owner === near.wallet.accountId ? (*/}
      {/*  <div class={"flex flex-row justify-between p-4"}>*/}
      {/*    OWNER*/}
      {/*  </div>*/}
      {/*) : isJoined ? (*/}
      {/*  <>*/}
      {/*    {canWriteMessages() ? (*/}
      {/*      <WriteMessage toGroup={group}*/}
      {/*                    replyToMessage={replyToMessage}*/}
      {/*                    setReplyToMessage={setReplyToMessage}*/}
      {/*                    onMessageSent={onMessageSent}*/}
      {/*      />*/}
      {/*    ) : (*/}
      {/*      <>*/}
      {/*        can't write*/}
      {/*      </>*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    JOIN*/}
      {/*  </>*/}
      {/*)}*/}
    </>
  );
}

