import React, { useContext, useEffect, useRef, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import {
  AiFillLike,
  BiSend,
  BsImage,
  IoMdCloseCircleOutline,
} from "react-icons/all";
import Loader from "../../Loader";
import { SecretChat } from "../../../utils/secret-chat";
import { resizeFileImage, uploadMediaToIPFS } from "../../../utils/media";
import AttachTokenPopup from "./AttachTokenPopup";
import { IGroup, IMessage, INearContext } from "../../../types";
import { NearContext } from "../../../context/NearContext";

type Props = {
  toAddress?: string,
  toGroup?: IGroup,
  onMessageSent: (messageText: string, messageMedia: string, encryptKey?: string) => void,
  changePrivateMode?: boolean,
  replyToMessage: IMessage|null,
  setReplyToMessage: (replyToMessage: IMessage|null) => void
};

const WriteMessage: React.FC<Props> = (
  {
    toAddress, toGroup, onMessageSent, changePrivateMode, replyToMessage, setReplyToMessage
  }: Props) => {
  const near: INearContext = useContext(NearContext);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [ messageText, setMessageText ] = useState("");
  const [ messageMedia, setMessageMedia ] = useState("");
  const [ messageTmpMedia, setMessageTmpMedia ] = useState("");
  const [ attachedTokens, setAttachedTokens ] = useState(0);
  const [ isMediaLoading, setIsMediaLoading ] = useState(false);
  const [ isPrivateMode, setIsPrivateMode ] = useState(false);
  const [ isAttachPopupVisible, setIsAttachPopupVisible ] = useState(false);

  const toggleSecretChat = () => {
    if (!toAddress) return;

    if (near.account && near.wallet?.accountId && near.account.level === 2) {
      const secretChat = new SecretChat(toAddress, near.wallet.accountId);

      let messageText;
      if (secretChat.isPrivateModeEnabled()) {
        setIsPrivateMode(false);
        messageText = "(secret-end)";
        secretChat.switchPrivateMode(false);
      } else {
        const chatData = secretChat.getSecretChat();
        if (chatData) {
          setIsPrivateMode(true);
          secretChat.switchPrivateMode(true);
          messageText = "";
        } else {
          let pubKey = secretChat.getMyPublicKey();
          messageText = `(secret-start:${pubKey})`;
        }
      }

      if (messageText) {
        near.mainContract?.sendPrivateMessage(messageText, "", toAddress as string, "", "", 0);
        onMessageSent?.(messageText, messageMedia);
      }
    } else {
      alert("You need 'Gold' Account Level to use encoded messages");
    }
  }

  const sendMessage = (messageText: string) => {
    let sendFunction;
    const replyId = replyToMessage ? replyToMessage.id : "";

    messageText = messageText.trim();

    if (!messageText.length && !messageMedia.length) {
      alert("Please provide message text or upload media");
      return false;
    }

    let encryptKey = "";
    if (toAddress) {
      if (isPrivateMode && near.wallet?.accountId) {
        const encoded = (new SecretChat(toAddress, near.wallet.accountId)).encode(messageText);
        messageText = encoded.secret;
        encryptKey = encoded.nonce;
      }

      sendFunction = near.mainContract?.sendPrivateMessage(messageText, messageMedia, toAddress, replyId, encryptKey, attachedTokens);
    } else if (toGroup) {
      sendFunction = near.mainContract?.sendGroupMessage(messageText, messageMedia, toGroup.id, replyId);
    }

    onMessageSent?.(messageText, messageMedia, encryptKey);

    if (sendFunction) {
      sendFunction.catch(e => {
        console.log(e);
        // add retry...
        alert('Error: Message not sent');
      });
    }

    setMessageMedia("");
    setMessageTmpMedia("");
    setMessageText("");
    setReplyToMessage(null);
  }

  useEffect(() => {
    if (!isMediaLoading) {
      if (inputRef) {
        inputRef.current?.focus();
      }
    }
  }, [ isMediaLoading, replyToMessage, toAddress, toGroup?.id ]);

  useEffect(() => {
    if (changePrivateMode !== undefined) {
      setIsPrivateMode(changePrivateMode);
    }
  }, [ changePrivateMode ]);

  const handleTextChange = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage((e.target as HTMLTextAreaElement).value);
      return false;
    }
  }

  const uploadMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = (e.target as HTMLInputElement).files;
    if (images) {
      resizeFileImage(images[0], 600, 600).then(blobData => {
        setIsMediaLoading(true);

        const reader = new FileReader();
        reader.readAsDataURL(blobData);
        reader.onloadend = () => {
          setMessageTmpMedia(reader.result as string);
        }

        uploadMediaToIPFS(blobData).then(result => {
          setMessageMedia(result);
          setIsMediaLoading(false);
        }).catch(() => setIsMediaLoading(false));
      });
    }
  }

  const attachNEAR = () => {
    if (near.account) {
      setIsAttachPopupVisible(true);
    } else {
      alert("Please update your Account Level to attach payments");
    }
  }

  const removeMedia = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setMessageTmpMedia("");
    setMessageMedia("");
  }

  return (
    <div className={`chat-footer flex-none relative bg-[#101d2c] z-30 relative -mb-16 md:mb-0`}>
      <div className={`flex flex-row items-end px-3 py-4 md:p-4 ${isPrivateMode ? "bg-red-700/20 text-red-500/70" : "text-blue-500"}`}>
        {toAddress && (
          <>
            <button type="button"
                    disabled={isMediaLoading}
                    onClick={() => toggleSecretChat()}
                    title={`${isPrivateMode ? "Disable" : "Start"} Private Mode`}
                    className={`flex flex-shrink-0 focus:outline-none mx-2 mr-1 block w-4 h-5 md:w-7 md:h-6 mb-4
                    absolute top-6 right-16 z-10 md:relative md:top-0 md:right-0
                  ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}`}>
              {isPrivateMode ? (
                <svg viewBox="0 0 40 48"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                     className="w-4 h-5 md:w-6 md:h-6 mt-0.5 fill-current">
                  <path
                    d="M10.9091 21.8182H28.3636V15.2727C28.3636 12.8636 27.5114 10.8068 25.8068 9.10227C24.1023 7.39773 22.0455 6.54545 19.6364 6.54545C17.2273 6.54545 15.1705 7.39773 13.4659 9.10227C11.7614 10.8068 10.9091 12.8636 10.9091 15.2727V21.8182ZM39.2727 25.0909V44.7273C39.2727 45.6364 38.9545 46.4091 38.3182 47.0455C37.6818 47.6818 36.9091 48 36 48H3.27273C2.36364 48 1.59091 47.6818 0.954545 47.0455C0.318182 46.4091 0 45.6364 0 44.7273V25.0909C0 24.1818 0.318182 23.4091 0.954545 22.7727C1.59091 22.1364 2.36364 21.8182 3.27273 21.8182H4.36364V15.2727C4.36364 11.0909 5.86364 7.5 8.86364 4.5C11.8636 1.5 15.4545 0 19.6364 0C23.8182 0 27.4091 1.5 30.4091 4.5C33.4091 7.5 34.9091 11.0909 34.9091 15.2727V21.8182H36C36.9091 21.8182 37.6818 22.1364 38.3182 22.7727C38.9545 23.4091 39.2727 24.1818 39.2727 25.0909Z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 36 48"
                     fill="none"
                     className="w-4 h-5 md:w-6 md:h-6 mt-0.5 fill-current"
                     xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_7)">
                    <path
                      d="M33 24C33.8334 24 34.5416 24.2917 35.125 24.875C35.7084 25.4583 36 26.1667 36 27V45C36 45.8334 35.7084 46.5416 35.125 47.125C34.5416 47.7084 33.8334 48 33 48H3C2.16667 48 1.45833 47.7084 0.875 47.125C0.291667 46.5416 0 45.8334 0 45V27C0 26.1667 0.291667 25.4583 0.875 24.875C1.45833 24.2917 2.16667 24 3 24H4V14C4 10.1458 5.36978 6.84897 8.10938 4.10938C10.849 1.36979 14.1458 0 18 0C21.8542 0 25.151 1.36979 27.8906 4.10938C30.6302 6.84897 32 10.1458 32 14C32 14.5417 31.8022 15.0104 31.4062 15.4062C31.0104 15.8021 30.5417 16 30 16H28C27.4583 16 26.9896 15.8021 26.5938 15.4062C26.1979 15.0104 26 14.5417 26 14C26 11.7917 25.2188 9.90625 23.6562 8.34375C22.0938 6.78125 20.2083 6 18 6C15.7917 6 13.9062 6.78125 12.3438 8.34375C10.7812 9.90625 10 11.7917 10 14V24H33Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_7">
                      <rect width="36" height="48" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>

            <button type="button"
                    disabled={isMediaLoading}
                    onClick={() => attachNEAR()}
                    title={`Attach NEAR tokens`}
                    className={`flex flex-shrink-0 focus:outline-none ml-2 mr-2.5 block w-5 h-5 md:w-6 md:h-6 mb-4 relative
                      ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                    `}>

              {attachedTokens > 0 && (
                <span className={"absolute left-0 right-0 text-center -bottom-5 text-sm text-gray-400 font-semibold"}>
                  <small>{attachedTokens}</small>
                </span>
              )}

              <svg xmlns="http://www.w3.org/2000/svg"
                   className="w-5 h-5 md:w-6 md:h-6 mt-0.5 fill-current"
                   viewBox="0 0 40 40">
                <g clipPath="url(#a)">
                  <path
                    d="M32.0533 2.04444 23.707 14.4444c-.5771.8445.5327 1.8667 1.3318 1.1556l8.2131-7.15556c.222-.17777.5328-.04444.5328.26667V31.0667c0 .3111-.3996.4444-.5772.2222L8.34628 1.51111C7.54717.533333 6.3929 0 5.10544 0h-.8879C1.90899 0 0 1.91111 0 4.26667V35.7333C0 38.0889 1.90899 40 4.26193 40c1.46504 0 2.84129-.7556 3.6404-2.0444l8.34627-12.4c.5771-.8445-.5327-1.8667-1.3318-1.1556l-8.21314 7.1111c-.22197.1778-.53274.0445-.53274-.2667V8.93333c0-.31111.39956-.44444.57714-.22222L31.6093 38.4889C32.4084 39.4667 33.6071 40 34.8502 40h.8879C38.091 40 40 38.0889 40 35.7333V4.26667C40 1.91111 38.091 0 35.7381 0c-1.5095 0-2.8857.755555-3.6848 2.04444Z"
                  />
                </g>
                <defs>
                  <clipPath id="a">
                    <path d="M0 0h40v40H0z"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </>
        )}

        <button type="button"
                title={"Send Image"}
                disabled={isMediaLoading}
                className={`flex flex-shrink-0 focus:outline-none md:mx-2 mr-2 block
                ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                ${!isMediaLoading && messageTmpMedia ? "w-8 h-8 md:w-10 md:h-10 mb-3 md:mb-2" : "w-5 h-5 md:w-6 md:h-6 mb-4"}
                `}>
          {!isMediaLoading && (
            <label className={"cursor-pointer relative"}>
              {messageTmpMedia.length > 0 ? (
                <>
                  <img src={messageTmpMedia} alt="" className={"w-10 h-10 object-cover rounded-md"}/>
                  <IoMdCloseCircleOutline
                    size={16}
                    onClick={removeMedia}
                    className={"absolute -right-1 -top-1 text-white bg-gray-700 rounded-full"}
                  />
                </>
              ) : (
                <BsImage className={"w-7 h-6 md:w-8 md:h-7"}/>
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

        <div className="relative flex-grow md:ml-4 ml-2">
          <label>
            {replyToMessage && (
              <div onClick={() => setReplyToMessage(null)}
                   className={`absolute left-1 top-1 w-32 rounded-full p-[6px] flex flex-row text-sm text-gray-200
                      ${isPrivateMode ? "bg-red-800/40" : "bg-gray-700/80"}
                   `}>
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
              <small className={"text-red-500/80"}>Private Mode</small>
            </div>
          )}
        </div>

        <button type="button"
                className={`flex flex-shrink-0 focus:outline-none mx-2 md:ml-4 block md:w-7 md:h-7 mb-3.5
                ${isPrivateMode ? "hover:text-red-600/80" : "hover:text-blue-600"}
                `}>
          {messageText.length > 0 || messageMedia.length > 0 ? (
            <BiSend className={"w-7 h-6 md:w-8 md:h-7"}
                    onClick={() => sendMessage(messageText)}
            />
          ) : (
            <AiFillLike className={"w-7 h-6 md:w-8 md:h-7"}
                        onClick={() => sendMessage("(like)")}
            />
          )}
        </button>
      </div>

      <AttachTokenPopup setAttachedTokens={setAttachedTokens}
                        isOpen={isAttachPopupVisible}
                        setIsOpen={setIsAttachPopupVisible}
      />

    </div>
  );
};

export default WriteMessage;