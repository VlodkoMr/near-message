import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "./Avatar";
import { timestampToDate, timestampToTime } from "../../utils/datetime";
import { AiFillLike, BsClockHistory, SiLetsencrypt } from "react-icons/all";
import { Button } from "@mui/material";
import { NearContext } from "../../context/NearContext";
import { SecretChat } from "../../utils/secret-chat";
import { Loader } from "../Loader";
import { mediaURL } from "../../utils/transform";

export const OneMessage = ({ message, opponent, isLast }) => {
  const near = useContext(NearContext);
  const [messageText, setMessageText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const acceptPrivateMessage = () => {
    const secretChat = new SecretChat(message.from_address, near);
    setIsLoading(true);
    secretChat.acceptChat(message.text).then(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    });
  }

  const getMessageText = () => {
    if (message.encrypt_key) {
      const opponentAddress = message.from_address !== near.wallet.accountId ? message.from_address : message.to_address;
      const secretChat = new SecretChat(opponentAddress, near);
      const text = secretChat.decode(message.text, message.encrypt_key)
      setMessageText(text);
    } else {
      setMessageText(message.text);
    }
  }

  useEffect(() => {
    getMessageText();
  }, []);

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

            {/*        <button type="button"*/}
            {/*                className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">*/}
            {/*          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">*/}
            {/*            <path d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z*/}
            {/* M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8*/}
            {/*C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"/>*/}
            {/*          </svg>*/}
            {/*        </button>*/}
            {/*        <button type="button"*/}
            {/*                className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">*/}
            {/*          <svg viewBox="0 0 20 20" className="w-full h-full fill-current">*/}
            {/*            <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>*/}
            {/*          </svg>*/}
            {/*        </button>*/}
            {/*        <button type="button"*/}
            {/*                className="hidden group-hover:block flex flex-shrink-0 focus:outline-none mx-2 block rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-700 bg-gray-800 w-8 h-8 p-2">*/}
            {/*          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">*/}
            {/*            <path*/}
            {/*              d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>*/}
            {/*          </svg>*/}
            {/*        </button>*/}

            {message.encrypt_key && (
              <img src={require("../../assets/img/lock.png")}
                   alt=""
                   className={"opacity-30 mx-2 w-5 h-5"}/>
            )}

            <p className={`max-w-[260px] md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl whitespace-pre-wrap px-5 
              overflow-hidden overflow-ellipsis text-base
              ${message.text === '(like)' ? "py-2.5" : "py-3"}
              ${message.isFirst && message.isMy ? "rounded-t-3xl" : ""}
              ${isLast ? "rounded-b-3xl" : ""}
              ${message.isTemporary ? "opacity-70" : ""}
              ${message.isMy ? "bg-sky-500/50 rounded-l-3xl" : "bg-gray-700/60 rounded-r-3xl text-gray-100"}
              ${message.isEncryptStart || message.isEncryptAccept ? "bg-red-700/60" : ""}
            `}>
              {message.isEncryptStart && (
                <>
                  Private chat request
                  {!message.isMy ? (
                    <Button disabled={isLoading}>
                      <span
                        onClick={() => acceptPrivateMessage()}
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

              {(!message.isEncryptStart && !message.isEncryptAccept) && (
                <>
                  {message.image && (
                    <img alt=""
                         src={mediaURL(message.image)}
                         className={"h-[220px] min-w-[100px] rounded-lg my-2 object-contain"}
                    />
                  )}

                  {messageText === '(like)' ? (
                    <AiFillLike size={22}/>
                  ) : (
                    <>{messageText}</>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}