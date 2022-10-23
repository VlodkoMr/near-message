import React, { useContext, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { AiFillLike, BiSend, BsImage, IoMdCloseCircleOutline, RiChatPrivateFill } from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { Loader } from "../Loader";
import { SecretChat } from "../../utils/secret-chat";
import { resizeFileImage, uploadMediaToIPFS } from "../../utils/media";

export const WriteMessage = ({ toAddress, toGroup, onMessageSent, isSecretChat }) => {
  const near = useContext(NearContext);
  const inputRef = useRef(null);
  const localKey = toAddress ? `acc-${toAddress}` : `group-${toGroup.id}`;
  const [messageText, setMessageText] = useState("");
  const [messageMedia, setMessageMedia] = useState("");
  const [messageTmpMedia, setMessageTmpMedia] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  useEffect(() => {
    // load message from local storage
    setIsLoading(false);
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

  const toggleSecretChat = async () => {
    const secretChat = new SecretChat(toAddress, near.wallet.accountId, near);
    setIsLoading(true);
    if (secretChat.secretChatEnabled()) {
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
  }

  const sendMessage = (messageText) => {
    let sendFunction;
    if (toAddress) {
      // Private Mode
      let encodeKey = "";
      if (isSecretChat) {
        const encoded = (new SecretChat(toAddress, near.wallet.accountId)).encode(messageText);
        messageText = encoded.secret;
        encodeKey = encoded.nonce;
      }
      sendFunction = near.mainContract.sendPrivateMessage(messageText, messageMedia, toAddress, "", encodeKey);
    } else {
      sendFunction = near.mainContract.sendGroupMessage(messageText, messageMedia, toGroup.id, "");
    }

    messageText = messageText.trim();
    if (!messageText.length && !messageMedia.length) {
      alert("Please provide message text or upload media");
      return false;
    }

    setIsLoading(true);
    localStorage.setItem(localKey, "");
    sendFunction.then((result) => {
      setMessageMedia("");
      setMessageTmpMedia("");
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

  useEffect(() => {
    // return input focus
    if (!isLoading) {
      inputRef.current.focus();
    }
  }, [isLoading]);

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
      ${isSecretChat ? "bg-red-700/20 text-red-500/70" : "text-blue-500"}`}>

      {/*{messageMedia && (*/}
      {/*  <div className={"p-4 absolute h-10 left-0 right-0 -bottom-10"}>*/}
      {/*    messageMedia*/}
      {/*  </div>*/}
      {/*)}*/}

      <div className="flex flex-row items-end p-4 relative">
        {isSecretChat && (
          <div className={"absolute left-6 bottom-1 text-sm font-semibold"}>
            <small className={"text-red-400/60"}>Private Mode</small>
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
                className={`hidden md:flex flex-shrink-0 focus:outline-none mx-2 block
                ${isSecretChat ? "hover:text-red-600/80" : "hover:text-blue-600"}
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
            <TextareaAutosize placeholder="Aa"
                              autoFocus
                              ref={inputRef}
                              maxRows={10}
                              disabled={isLoading || isMediaLoading}
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
              {messageText.length > 0 || messageMedia.length > 0 ? (
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

