import React from "react";
import { WriteMessage } from "./WriteMessage";

export const GroupChatBottom = ({ group, replyToMessage, setReplyToMessage, onMessageSent }) => {

  const isJoined = () => {

  }

  const canWriteMessages = () => {

  }

  return (
    <>
      {isJoined() ? (
        <>
          {canWriteMessages() && (
            <WriteMessage toGroup={group}
                          replyToMessage={replyToMessage}
                          setReplyToMessage={setReplyToMessage}
                          onMessageSent={onMessageSent}
            />
          )}
        </>
      ) : (
        <>
          JOIN
        </>
      )}
    </>
  );
}

