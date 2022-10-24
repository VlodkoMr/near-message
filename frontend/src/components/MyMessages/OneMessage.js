import React, { useContext, useState } from "react";
import { Avatar } from "./Avatar";
import { timestampToDate, timestampToTime } from "../../utils/datetime";
import { AiFillLike, BsClockHistory } from "react-icons/all";
import { Button } from "@mui/material";
import { NearContext } from "../../context/NearContext";
import { SecretChat } from "../../utils/secret-chat";
import { Loader } from "../Loader";
import { mediaURL, transformMessageText } from "../../utils/transform";
import { MessageAction } from "../../assets/css/components";

export const OneMessage = ({ message, opponent, isLast, setReplyToMessage }) => {
  const near = useContext(NearContext);
  const [isLoading, setIsLoading] = useState(false);

  const acceptPrivateMode = () => {
    const secretChat = new SecretChat(message.from_address, near.wallet.accountId);
    secretChat.storeSecretChatKey(message.text);

    const pubKey = secretChat.getMyPublicKey();
    setIsLoading(true);
    near.mainContract.sendPrivateMessage(`(secret-accept:${pubKey})`, "", opponent.id, "", "").then(() => {
      setIsLoading(false);
    });
  }

  const handleSpamReport = () => {

  }

  return (
    <>
      {message.isFirst && !message.isTemporary && (
        <p className="p-4 text-center text-sm font-medium text-gray-500">
          {timestampToDate(message.created_at)}, {timestampToTime(message.created_at)}
        </p>
      )}

      <div className={`flex flex-row mb-2 justify-start ${message.isMy ? "justify-end" : "justify-start"}`}>
        <div className="hidden md:block md:w-10 md:h-10 relative flex flex-shrink-0 mr-4">
          {!message.isMy && message.isFirst && (
            <Avatar media={opponent?.image || ""} title={message.from_address}/>
          )}
        </div>

        <div className="messages text-sm text-white grid grid-flow-row gap-2">
          {message.isFirst && !message.isMy && (
            <div className={"text-gray-400 font-medium leading-3"}>
              {opponent?.name ? (
                <>{opponent?.name} <small className={"opacity-60"}>({message.from_address})</small></>
              ) : (
                <>{opponent?.id || message.from_address}</>
              )}
            </div>
          )}

          <div className={`flex items-center group ${message.isMy ? "" : "flex-row-reverse justify-end"}`}>
            {message.isTemporary && (
              <div className={"mr-2 text-gray-400 opacity-60"}>
                <BsClockHistory size={16}/>
              </div>
            )}

            {!message.isMy && (
              <>
                <MessageAction onClick={() => handleSpamReport()}>
                  <span className={"text-xl leading-4 font-semibold"}>!</span>
                </MessageAction>

                <MessageAction onClick={() => setReplyToMessage(message)}>
                  <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                    <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                  </svg>
                </MessageAction>
              </>
            )}

            <div className={`max-w-[260px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl whitespace-pre-wrap px-5 
              overflow-hidden overflow-ellipsis text-base relative
              ${message.text === '(like)' ? "py-2.5" : "py-3"}
              ${message.isFirst && message.isMy ? "rounded-t-3xl" : ""}
              ${isLast ? "rounded-b-3xl" : ""}
              ${message.isTemporary ? "opacity-70" : ""}
              ${message.isMy ? "bg-sky-500/50 rounded-l-3xl ml-2" : "bg-gray-700/60 rounded-r-3xl text-gray-100 mr-2"}
              ${message.isEncryptStart || message.isEncryptAccept || message.isEncryptEnd ? "bg-red-600/40" : ""}
              ${message.encrypt_key && (message.isMy ? "pl-12" : "pr-12")}
            `}>
              {message.isEncryptStart && (
                <>
                  Private chat request
                  {!message.isMy ? (
                    <Button disabled={isLoading}>
                      <span
                        onClick={() => acceptPrivateMode()}
                        className={"text-red-300 hover:text-red-200 pl-3 ml-2 border-l border-red-300/40"}>
                        Accept
                        {isLoading && (
                          <span className={"ml-2"}>
                            <Loader size={"sm"}/>
                          </span>
                        )}
                      </span>
                    </Button>
                  ) : " sent"}
                </>
              )}

              {message.isEncryptAccept && "Private chat request accepted"}
              {message.isEncryptEnd && "Private chat disabled"}

              {(!message.isEncryptStart && !message.isEncryptAccept && !message.isEncryptEnd) && (
                <>
                  {message.reply_message && (
                    <p className={"border-b border-gray-200/20 mb-2 pb-1 text-sm opacity-50"}>
                      <svg viewBox="0 0 20 20" className="w-4 h-4 fill-current inline mr-1">
                        <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                      </svg>
                      <b className={"mr-2"}>{message.reply_message.from_address}</b>
                      <span className={"whitespace-nowrap overflow-hidden max-w-[260px] overflow-ellipsis inline-block align-bottom"}>
                        {transformMessageText(message.reply_message, near.wallet.accountId)}
                      </span>
                    </p>
                  )}

                  {message.image && (
                    <img alt=""
                         src={mediaURL(message.image)}
                         className={"h-[220px] min-w-[100px] rounded-lg mt-2 mb-3 object-contain"}
                    />
                  )}

                  {transformMessageText(message, near.wallet.accountId) === '(like)' ? (
                    <AiFillLike size={22}/>
                  ) : (
                    <>{transformMessageText(message, near.wallet.accountId)}</>
                  )}
                </>
              )}

              {message.encrypt_key && (
                <img src={require("../../assets/img/lock.png")}
                     alt=""
                     className={`absolute opacity-20 mx-2 w-5 h-5 top-3.5 ${message.isMy ? "left-2" : "right-2"}`}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}