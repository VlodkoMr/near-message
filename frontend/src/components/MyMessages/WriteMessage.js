import React, { useContext, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { AiFillLike, BiSend, BsImage, RiChatPrivateFill } from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { Loader } from "../Loader";
import { SecretChat } from "../../settings/secret-chat";

export const WriteMessage = ({ toAddress, toGroup, onMessageSent, isSecretChat }) => {
  const near = useContext(NearContext);
  const localKey = toAddress ? `acc-${toAddress}` : `group-${toGroup.id}`;
  const [messageText, setMessageText] = useState("");
  const [messageMedia, setMessageMedia] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // load message from local storage
    setIsLoading(false);
    const savedMessage = localStorage.getItem(localKey);
    if (savedMessage) {
      setMessageText(savedMessage);
    } else {
      setMessageText("");
    }

    // if (toAddress) {
    //   localStorage.getItem(`secretChatKey:${toAddress}`)
    // }


  }, [toAddress, toGroup?.id]);

  useEffect(() => {
    localStorage.setItem(localKey, messageText);
  }, [messageText]);

  const toggleSecretChat = async () => {
    const secretChat = new SecretChat(toAddress, near);
    setIsLoading(true);
    if (secretChat.exists()) {
      secretChat.endChat().then(() => {
        setIsLoading(false);
      });
    } else {
      secretChat.startNewChat().then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      });
    }

    // const isSecretChat = localStorage.getItem(`secretChatKey:${toAddress}`);
    // if (isSecretChat) {
    //   // cancel secret chat
    //   sendMessage(`(secret-end)`, false);
    // } else {
    //   // start secret chat
    //   // new SecretChat(near, toAddress).getMyPublicKey().then(pubKey => {
    //   //   sendMessage(`(secret-start:${pubKey})`);
    //   // });
    // }
  }

  const sendMessage = async (messageText) => {
    let sendFunction;
    if (toAddress) {
      let encodeKey = "";
      if (isSecretChat) {
        const secretChat = new SecretChat(toAddress, near);
        const encoded = await secretChat.encode(messageText);
        messageText = encoded.secret;
        encodeKey = encoded.key;
      }

      sendFunction = near.mainContract.sendPrivateMessage(messageText, messageMedia, toAddress, "", encodeKey);
    } else {
      sendFunction = near.mainContract.sendGroupMessage(messageText, messageMedia, toGroup.id, "");
    }

    messageText = messageText.trim();
    if (messageText.length === 0) {
      alert("Please provide message text");
      return false;
    }

    setIsLoading(true);
    localStorage.setItem(localKey, "");
    sendFunction.then((result) => {
      setMessageText("");
      let messageId = "";
      result.receipts_outcome.map(tx => {
        if (tx.outcome.logs.length > 0) {
          const jsonData = JSON.parse(tx.outcome.logs[0]);
          messageId = jsonData['id'];
        }
      });

      onMessageSent?.(messageId, messageText, messageMedia);
    }).catch(e => {
      console.log(e);
      alert('Error: Message not sent');
    }).finally(() => {
      setIsLoading(false);
    });
  }

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(value);
      return false;
    }
  }

  return (
    <div
      className={`chat-footer flex-non ${isSecretChat ? "bg-red-700/30 text-red-500/80" : "text-blue-500"}`}>
      <div className="flex flex-row items-end p-4 relative">
        {isSecretChat && (
          <div className={"absolute left-6 bottom-1 text-sm font-semibold"}>
            <small className={"text-red-400"}>Private Mode</small>
          </div>
        )}

        {toAddress && (
          <button type="button"
                  title={"Start private conversation"}
                  className={`hidden md:flex flex-shrink-0 focus:outline-none mx-2 block w-7 h-6 mb-4
                  ${isSecretChat ? "hover:text-red-600/80" : "hover:text-blue-600"}
                  `}>
            <RiChatPrivateFill size={28} onClick={() => toggleSecretChat()}/>
          </button>
        )}

        <button type="button"
                title={"Send Image"}
                className={`hidden md:flex flex-shrink-0 focus:outline-none mx-2 block w-6 h-6 mb-4
                ${isSecretChat ? "hover:text-red-600/80" : "hover:text-blue-600"}
                `}>
          <BsImage size={28}/>
        </button>


        {/*<button type="button" border-gray-700/80 focus:border-gray-700/80 bg-gray-800/80  */}
        {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block hover:text-blue-600 w-6 h-6 mr-4 mb-4">*/}
        {/*  <FaSmile size={28}/>*/}
        {/*</button>*/}

        <div className="relative flex-grow md:ml-4">
          <label>
            <TextareaAutosize placeholder="Aa"
                              autoFocus
                              maxRows={10}
                              disabled={isLoading}
                              className={`rounded-3xl py-2 pl-4 pr-10 w-full border text-base
                              bg-gray-800/60  focus:bg-gray-900/60 focus:outline-none 
                              text-gray-100 focus:shadow-md transition duration-300 ease-in
                              ${isSecretChat ? "border-red-700/60" : "border-gray-700/60"}`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyDown={handleTextChange}
            />
          </label>
        </div>

        <button type="button"
                className={`flex flex-shrink-0 focus:outline-none mx-2 ml-4 block md:w-7 md:h-7 mb-3.5
                ${isSecretChat ? "hover:text-red-600/80" : "hover:text-blue-600"}
                `}>
          {isLoading ? (
            <div className={"cursor-default"}>
              <Loader/>
            </div>
          ) : (
            <>
              {messageText.length > 0 ? (
                <BiSend size={30} onClick={() => sendMessage(messageText)}/>
              ) : (
                <AiFillLike size={30} onClick={() => sendMessage("(like)")}/>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

