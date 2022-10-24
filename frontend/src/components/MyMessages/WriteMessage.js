import React, { useContext, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import {
  AiFillLike,
  BiSend,
  BsImage,
  IoMdCloseCircleOutline,
  MdOutlineEnhancedEncryption,
  MdOutlineNoEncryption,
} from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { Loader } from "../Loader";
import { SecretChat } from "../../utils/secret-chat";
import { resizeFileImage, uploadMediaToIPFS } from "../../utils/media";

export const WriteMessage = ({
  toAddress, toGroup, onMessageSent, isPrivateMode, replyToMessage, setReplyToMessage
}) => {
  const near = useContext(NearContext);
  const inputRef = useRef(null);
  const localKey = toAddress ? `chatme:acc-${toAddress}` : `chatme:group-${toGroup.id}`;
  const [messageText, setMessageText] = useState("");
  const [messageMedia, setMessageMedia] = useState("");
  const [messageTmpMedia, setMessageTmpMedia] = useState("");
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  useEffect(() => {
    // load message from local storage
    const savedMessage = localStorage.getItem(localKey);
    if (savedMessage) {
      setMessageText(savedMessage);
    } else {
      setMessageText("");
    }
  }, [toAddress, toGroup?.id]);

  useEffect(() => {
    localStorage.setItem(localKey, messageText);
  }, [messageText]);

  const toggleSecretChat = () => {
    const secretChat = new SecretChat(toAddress, near.wallet.accountId);

    let messageText;
    if (secretChat.isPrivateModeEnabled()) {
      messageText = "(secret-end)";
    } else {
      const chatData = secretChat.getSecretChat();
      if (chatData) {
        secretChat.switchPrivateMode(true);
        messageText = "";
      } else {
        let pubKey = secretChat.getMyPublicKey();
        messageText = `(secret-start:${pubKey})`;
      }
    }

    if (messageText) {
      near.mainContract.sendPrivateMessage(messageText, "", toAddress, "", false);
      onMessageSent?.(messageText, messageMedia, toAddress);
    }
  }

  const sendMessage = (messageText) => {
    let sendFunction;
    const replyId = replyToMessage ? replyToMessage.id : "";
    messageText = messageText.trim();

    if (!messageText.length && !messageMedia.length) {
      alert("Please provide message text or upload media");
      return false;
    }

    if (toAddress) {
      // move here encoding
      sendFunction = near.mainContract.sendPrivateMessage(messageText, messageMedia, toAddress, replyId, isPrivateMode);
    } else {
      sendFunction = near.mainContract.sendGroupMessage(messageText, messageMedia, toGroup.id, replyId);
    }

    onMessageSent?.(messageText, messageMedia, toAddress);

    sendFunction.catch(e => {
      console.log(e);
      // add retry...
      alert('Error: Message not sent');
    });

    setMessageMedia("");
    setMessageTmpMedia("");
    setMessageText("");
    setReplyToMessage(null);
    localStorage.setItem(localKey, "");
  }

  useEffect(() => {
    if (!isMediaLoading) {
      inputRef.current.focus();
    }
  }, [isMediaLoading, replyToMessage]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(value);
      return false;
    }
  }

  const uploadMedia = (e) => {
    const image = e.target.files[0];
    resizeFileImage(image, 600, 600).then(blobData => {
      setIsMediaLoading(true);

      const reader = new FileReader();
      reader.readAsDataURL(blobData);
      reader.onloadend = () => {
        setMessageTmpMedia(reader.result);
      }

      uploadMediaToIPFS(blobData).then(result => {
        setMessageMedia(result);
        setIsMediaLoading(false);
      }).catch(() => setIsMediaLoading(false));
    });
  }

  const removeMedia = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setMessageTmpMedia("");
    setMessageMedia("");
  }

  return (
    <div className={`chat-footer flex-non relative
      ${isPrivateMode ? "bg-red-700/20 text-red-500/70" : "text-blue-500"}`}>

      <div className="flex flex-row items-end p-4 relative">
        {toAddress && (
          <button type="button"
                  disabled={isMediaLoading}
                  title={"Start private conversation"}
                  className={`hidden md:flex flex-shrink-0 focus:outline-none mx-2 block w-7 h-6 mb-4
                  ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                  `}>
            {isPrivateMode ? (
              <MdOutlineNoEncryption size={26} onClick={() => toggleSecretChat()}/>
            ) : (
              <MdOutlineEnhancedEncryption size={26} onClick={() => toggleSecretChat()}/>
            )}
          </button>
        )}

        <button type="button"
                title={"Send Image"}
                disabled={isMediaLoading}
                className={`hidden md:flex flex-shrink-0 focus:outline-none mx-2 block
                ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                ${!isMediaLoading && messageTmpMedia ? "w-10 h-10 mb-2" : "w-6 h-6 mb-4"}
                `}>
          {!isMediaLoading && (
            <label className={"cursor-pointer relative"}>
              {messageTmpMedia.length > 0 ? (
                <>
                  <img src={messageTmpMedia} alt="" className={"w-10 h-10 object-cover rounded-md"}/>
                  <IoMdCloseCircleOutline
                    size={16}
                    onClick={(e) => removeMedia(e)}
                    className={"absolute -right-1 -top-1 text-white bg-gray-700 rounded-full"}
                  />
                </>
              ) : (
                <BsImage size={26}/>
              )}

              <input type="file"
                     className={"hidden"}
                     accept={"image/*"}
                     onChange={(e) => uploadMedia(e)}
              />
            </label>
          )}

          {isMediaLoading && (
            <Loader size={"md"}/>
          )}
        </button>

        {/*<button type="button" border-gray-700/80 focus:border-gray-700/80 bg-gray-800/80  */}
        {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block hover:text-blue-600 w-6 h-6 mr-4 mb-4">*/}
        {/*  <FaSmile size={28}/>*/}
        {/*</button>*/}

        <div className="relative flex-grow md:ml-4">
          <label>
            {replyToMessage && (
              <div onClick={() => setReplyToMessage(null)}
                   className={"absolute left-1 top-1 w-32 bg-gray-700 rounded-full p-[6px] flex flex-row text-sm text-gray-200"}>
                <svg viewBox="0 0 20 20" className="w-5 h-5 fill-current opacity-50 ml-1 mt-0.5">
                  <path d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"/>
                </svg>
                <span className={"whitespace-nowrap overflow-ellipsis w-20 overflow-hidden ml-1.5 pt-0.5"}>
                  {replyToMessage.from_address}
                </span>
              </div>
            )}
            <TextareaAutosize placeholder="Aa"
                              autoFocus
                              ref={inputRef}
                              maxRows={10}
                              disabled={isMediaLoading}
                              className={`rounded-3xl py-2 pl-4 pr-10 w-full border text-base
                              focus:outline-none 
                              ${replyToMessage ? "pl-36" : ""}
                              text-gray-100 focus:shadow-md transition duration-300 ease-in
                              ${isPrivateMode ? "border-red-700/60 bg-gray-900/40 focus:bg-gray-900/80" : "border-gray-700/60 bg-gray-800/60 focus:bg-gray-900/60"}`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyDown={handleTextChange}
            />
          </label>
          {isPrivateMode && (
            <div className={"absolute left-4 -bottom-3.5 text-sm font-semibold"}>
              <small className={"text-red-400/60"}>Private Mode</small>
            </div>
          )}
        </div>

        <button type="button"
                className={`flex flex-shrink-0 focus:outline-none mx-2 ml-4 block md:w-7 md:h-7 mb-3.5
                ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                `}>
          {messageText.length > 0 || messageMedia.length > 0 ? (
            <BiSend size={30} onClick={() => sendMessage(messageText)}/>
          ) : (
            <AiFillLike size={30} onClick={() => sendMessage("(like)")}/>
          )}
        </button>
      </div>
    </div>
  );
}

