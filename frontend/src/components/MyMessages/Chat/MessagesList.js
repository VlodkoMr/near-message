import React from "react";
import { SecondaryButton } from "../../../assets/css/components";
import { OneMessage } from "./OneMessage";

export const MessagesList = ({
  messages,
  historyMessages,
  tmpMessages,
  messagesPerPage,
  setReplyToMessage,
  opponent,
  opponentAddress,
  userProfiles,
  loadHistoryMessages,
  hideHistoryButton
}) => {

  const isLastMessage = (message, index) => {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  }

  return (
    <>
      {(messages.length >= messagesPerPage && !hideHistoryButton) && (
        <div className={"w-40 mx-auto text-center"}>
          <SecondaryButton small="true" className={"w-full"} onClick={() => loadHistoryMessages()}>
            load previous
          </SecondaryButton>
        </div>
      )}

      {historyMessages.map(message => (
          <OneMessage message={message}
                      key={message.id}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={false}
          />
        )
      )}

      {messages.map((message, index) => (
          <OneMessage message={message}
                      key={message.id}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={isLastMessage(message, index)}
          />
        )
      )}

      {tmpMessages.length > 0 && tmpMessages.filter(tmp => tmp.to_address === opponentAddress).map(tmpMessage => (
          <OneMessage message={tmpMessage}
                      key={tmpMessage.id}
                      opponent={opponent}
                      isLast={true}
          />
        )
      )}
    </>
  )
}

