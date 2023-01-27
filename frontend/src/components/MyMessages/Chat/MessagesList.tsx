import React from "react";
import { SecondaryButton } from "../../../assets/css/components";
import OneMessage  from "./OneMessage";

type Props = {
  messages: IMessage[],
  historyMessages: IMessage[],
  tmpMessages: IMessage[],
  messagesPerPage: number,
  setReplyToMessage: (replyToMessage: IMessage|null) => void,
  opponent: IProfile|null,
  opponentAddress: string,
  userProfiles: Record<string, IProfile>,
  loadHistoryMessages: () => void,
  hideHistoryButton: boolean,
  canReportReply: boolean
};

const MessagesList: React.FC<Props> = (
  {
    messages, historyMessages, tmpMessages, messagesPerPage, setReplyToMessage, opponent, opponentAddress,
    userProfiles, loadHistoryMessages, hideHistoryButton, canReportReply
  }: Props) => {

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
                      canReportReply={canReportReply}
                      opponent={opponent ? opponent : userProfiles[message.from_address] || null}
                      setReplyToMessage={setReplyToMessage}
                      isLast={false}
          />
        )
      )}

      {messages.map((message, index) => (
          <OneMessage message={message}
                      key={message.id}
                      canReportReply={canReportReply}
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
                      canReportReply={false}
                      isLast={true}
          />
        )
      )}
    </>
  )
};

export default MessagesList;