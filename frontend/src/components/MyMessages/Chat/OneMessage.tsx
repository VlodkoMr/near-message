import React, { memo, useContext, useState } from "react";
import Loader from "../../../ui/Loader";
import Avatar from "../../../ui/Avatar";
import { timestampToDate, timestampToTime } from "../../../utils/datetime";
import { AiFillLike, BsClockHistory } from "react-icons/all";
import { Button } from "@mui/material";
import { NearContext } from "../../../context/NearContext";
import { SecretChat } from "../../../services/SecretChat";
import { decodeMessageText, mediaURL } from "../../../utils/transform";
import { MessageAction } from "../../../assets/css/components";
import { utils } from "near-api-js";
import { LinkItUrl } from "react-linkify-it";
import { IMessage, IProfile } from "../../../types";

type Props = {
  message: IMessage,
  opponent: IProfile|null,
  isLast: boolean,
  setReplyToMessage?: (replyToMessage: IMessage|null) => void,
  canReportReply: boolean,
  isGroup: boolean
};

const OneMessage: React.FC<Props> = (
  {
    message, opponent, isLast, setReplyToMessage, canReportReply, isGroup
  }: Props) => {
  const near = useContext(NearContext);
  const [ isLoading, setIsLoading ] = useState(false);

  const acceptPrivateMode = () => {
    if (!near.wallet?.accountId) return;

    const secretChat = new SecretChat(message.from_address, near.wallet.accountId);
    secretChat.storeSecretChatKey(message.text);

    setIsLoading(true);
    const messageText = `(secret-accept:${secretChat.getMyPublicKey()})`;
    near.mainContract?.sendPrivateMessage(
      messageText,
      "",
      opponent?.id as string,
      "",
      "",
      0
    ).then(() => {
      setIsLoading(false);
    });
  }

  const handleSpamReport = () => {
    if (confirm("Do you want to Report Spam in this message?")) {
      near.mainContract?.spamReport(message.id, message.from_address, isGroup).then(() => {
        message.text = "*Spam report sent";
        alert("Thank you, spam report sent");
      });
    }
  }

  return (
    <>
      {message.isDateFirst && !message.isTemporary && (
        <p className="p-4 text-center text-sm font-medium text-gray-500">
          {timestampToDate(message.created_at, true)}
        </p>
      )}

      <div className={`flex flex-row mb-2 justify-start ${message.isMy ? "justify-end" : "justify-start"}`}>
        <div className="hidden md:block md:w-10 md:h-10 relative flex flex-shrink-0 mr-4">
          {!message.isMy && (message.isUserFirst || message.isDateFirst) && (
            <Avatar media={opponent?.image || ""} title={message.from_address}/>
          )}
        </div>

        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          {!message.isMy && (message.isUserFirst || message.isDateFirst) && (
            <div className={"text-gray-400 font-medium leading-3 address-limit"}>
              {opponent?.name ? (
                <>{opponent?.name} <small className={"opacity-60"}>({message.from_address})</small></>
              ) : (
                <>{opponent?.id || message.from_address}</>
              )}
            </div>
          )}

          <div className={`flex items-center group relative ${message.isMy ? "" : "flex-row-reverse justify-end"}`}>
            {message.isTemporary && (
              <div className={"mr-2 text-gray-400 opacity-60"}>
                <BsClockHistory size={16}/>
              </div>
            )}

            {!message.isMy && !message.isEncryptStart && !message.isEncryptAccept && !message.isEncryptEnd && (
              <>
                {canReportReply && (
                  <>
                    <MessageAction onClick={() => handleSpamReport()} title={"Spam Report"}>
                      <div className={"text-xl leading-4 font-semibold transition w-full h-full"}>!</div>
                      {/*<small className={"opacity-50 -ml-1 mt-1 block group-hover:text-gray-500"}>spam</small>*/}
                    </MessageAction>

                    <MessageAction onClick={() => {
                      if (setReplyToMessage) {
                        setReplyToMessage(message);
                      }
                    }} title={"Reply"}>
                      <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                      </svg>
                      {/*<small className={"opacity-50 -ml-1 mt-1 block group-hover:text-gray-500"}>reply</small>*/}
                    </MessageAction>
                  </>
                )}
              </>
            )}

            <div className={`md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl whitespace-pre-wrap px-5 
              overflow-ellipsis text-base relative min-h-[46px]
              ${message.text === '(like)' ? "py-2.5" : "py-3"}
              ${message.isMy && (message.isUserFirst || message.isDateFirst) ? "rounded-t-3xl mt-2" : ""}
              ${isLast ? "rounded-b-3xl" : ""}
              ${message.isTemporary ? "opacity-70" : ""}
              ${message.isMy ? "bg-sky-600/50 rounded-l-3xl ml-2" : "bg-gray-700/60 rounded-r-3xl text-gray-100 mr-2"}
              ${message.isEncryptStart || message.isEncryptAccept || message.isEncryptEnd ? "bg-red-600/30" : ""}
            `}>
              {message.reply_message && (
                <p className={"border-b border-gray-200/20 mb-2 pb-1 text-sm opacity-50"}>
                  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current inline mr-1">
                    <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                  </svg>
                  <b className={"mr-2 address-limit inline-block leading-3"}>{message.reply_message.from_address}</b>
                  <span className={"whitespace-nowrap overflow-hidden max-w-[260px] overflow-ellipsis inline-block align-bottom"}>
                    {near.wallet?.accountId ? decodeMessageText(message.reply_message, near.wallet.accountId) : ""}
                  </span>
                </p>
              )}

              {parseInt(message.deposit) > 0 && (
                <div className={`text-sm whitespace-nowrap rounded-lg py-2 px-3 font-semibold mt-1 mb-3
                ${message.isMy ? "bg-sky-800" : "bg-sky-800/50"}`}>
                  Deposit: {utils.format.formatNearAmount(message.deposit)} NEAR
                </div>
              )}

              {near.wallet?.accountId && (
                <div className={"flex justify-between"}>
                  <p>
                    {decodeMessageText(message, near.wallet.accountId) === '(like)' ? (
                      <AiFillLike className={"inline"} size={26}/>
                    ) : (
                      <LinkItUrl className={`text-blue-300 hover:underline`}>
                        {decodeMessageText(message, near.wallet.accountId)}
                        {message.isEncryptStart && message.isMy && " sent"}
                      </LinkItUrl>
                    )}
                  </p>

                  <span className={"ml-2.5 leading-6 text-xs opacity-40"}>
                  {timestampToTime(message?.created_at)}
                </span>
                </div>
              )}

              {message.isEncryptStart && (
                <>
                  {!message.isMy ? (
                    <div className={"my-1.5"}>
                      <Button disabled={isLoading}
                              onClick={() => acceptPrivateMode()}
                              variant={"contained"}>
                        Accept
                        {isLoading && (
                          <span className={"ml-2"}>
                            <Loader size={"sm"}/>
                          </span>
                        )}
                      </Button>
                    </div>
                  ) : ""}
                </>
              )}

              {message.image && (
                <img alt=""
                     src={mediaURL(message.image)}
                     className={"h-[220px] min-w-[100px] rounded-lg mb-2 mt-3 object-contain"}
                />
              )}

              {message.encrypt_key && (
                <img src={require("../../../assets/img/lock.png")}
                     alt=""
                     className={`absolute w-4 h-4 top-0 ${message.isMy ? "-left-1" : "-right-1"}`}/>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default memo(OneMessage, (prev, next) => {
  return prev.message.id === next.message.id
    && prev.message.isLast === next.message.isLast
    && prev.message.isUserFirst === next.message.isUserFirst;
});