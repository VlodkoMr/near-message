import React, { useContext, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { AiFillLike, BiSend, BsImage, RiChatPrivateFill } from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { Loader } from "../Loader";

export const WriteMessage = ({ toAddress, toGroup, onMessageSent }) => {
  const near = useContext(NearContext);
  const localKey = toAddress ? `acc-${toAddress}` : `group-${toGroup.id}`;
  const [ messageText, setMessageText ] = useState("");
  const [ messageMedia, setMessageMedia ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    // load message from local storage
    setIsLoading(false);
    const savedMessage = localStorage.getItem(localKey);
    if (savedMessage) {
      setMessageText(savedMessage);
    } else {
      setMessageText("");
    }
  }, [ toAddress, toGroup?.id ]);

  useEffect(() => {
    localStorage.setItem(localKey, messageText);
  }, [ messageText ]);

  const sendMessage = (value) => {
    const sendFunction = toAddress ? "sendPrivateMessage" : "sendGroupMessage";
    const sendTo = toAddress || toGroup.id;

    value = value.trim();
    if (value.length === 0) {
      alert("Please provide message text");
      return false;
    }

    setIsLoading(true);
    localStorage.setItem(localKey, "");
    near.mainContract[sendFunction](value, messageMedia, sendTo, "")
      .then((result) => {
        setMessageText("");
        let messageId = "";
        result.receipts_outcome.map(tx => {
          if (tx.outcome.logs.length > 0) {
            const jsonData = JSON.parse(tx.outcome.logs[0]);
            messageId = jsonData['id'];
          }
        });

        onMessageSent?.(messageId, value, messageMedia);
      })
      .catch(e => {
        console.log(e);
        alert('Error: Message not sent');
      })
      .finally(() => {
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
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-end p-4 relative">
        <button type="button"
                title={"Start private conversation"}
                className="hidden md:flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-7 h-6 mb-4">
          <RiChatPrivateFill size={28}/>
        </button>

        <button type="button"
                title={"Send Image"}
                className="hidden md:flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mb-4">
          <BsImage size={28}/>
        </button>


        {/*<button type="button" border-gray-700/80 focus:border-gray-700/80 bg-gray-800/80  */}
        {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mr-4 mb-4">*/}
        {/*  <FaSmile size={28}/>*/}
        {/*</button>*/}

        <div className="relative flex-grow md:ml-4">
          <label>
            <TextareaAutosize placeholder="Aa"
                              autoFocus
                              maxRows={10}
                              disabled={isLoading}
                              className={`rounded-3xl py-2 pl-4 pr-10 w-full border text-base
                              bg-gray-800/60 border-gray-700/60 focus:bg-gray-900/60 focus:outline-none 
                              text-gray-100 focus:shadow-md transition duration-300 ease-in`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyDown={handleTextChange}
            />
          </label>
        </div>

        <button type="button"
                className="flex flex-shrink-0 focus:outline-none mx-2 ml-4 block text-blue-500 hover:text-blue-600 md:w-7 md:h-7 mb-3.5">
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

