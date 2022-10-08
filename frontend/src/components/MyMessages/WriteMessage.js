import React, { useContext, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { AiFillLike, BiSend, BsImage, FaSmile, RiChatPrivateFill } from "react-icons/all";
import { NearContext } from "../../context/NearContext";
import { Loader } from "../Loader";

export const WriteMessage = ({ toAddress, toRoom, onSuccess }) => {
  const near = useContext(NearContext);
  const localKey = toAddress ? `acc-${toAddress}` : `room-${toRoom.id}`;
  const [ messageText, setMessageText ] = useState("");
  const [ messageMedia, setMessageMedia ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    // load message from local storage
    const savedMessage = localStorage.getItem(localKey);
    if (savedMessage) {
      setMessageText(savedMessage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(localKey, messageText);
  }, [ messageText ]);

  const sendMessage = (value) => {
    const sendFunction = toAddress ? "sendPrivateMessage" : "sendRoomMessage";
    const sendTo = toAddress || toRoom.id;

    value = value.trim();
    if (value.length === 0) {
      alert("Please provide message text");
      return false;
    }

    setIsLoading(true);
    near.mainContract[sendFunction](value, messageMedia, sendTo, "")
      .then((result) => {
        localStorage.setItem(localKey, "");
        setMessageText("");

        let messageId = "";
        result.receipts_outcome.map(tx => {
          if (tx.outcome.logs.length > 0) {
            const jsonData = JSON.parse(tx.outcome.logs[0]);
            messageId = jsonData['id'];
          }
        })

        onSuccess?.(messageId, value, messageMedia);
      })
      .catch(e => {
        console.log(e);
        alert('Message not sent');
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
                className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-7 h-6 mb-4">
          <RiChatPrivateFill size={28}/>
        </button>

        <button type="button"
                title={"Send Image"}
                className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mb-4">
          <BsImage size={28}/>
        </button>


        {/*<button type="button"*/}
        {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mr-4 mb-4">*/}
        {/*  <FaSmile size={28}/>*/}
        {/*</button>*/}

        <div className="relative flex-grow ml-4">
          <label>
            <TextareaAutosize placeholder="Aa"
                              maxRows={10}
                              disabled={isLoading}
                              className={`rounded-3xl py-2 pl-3 pr-10 w-full border border-gray-700/60 focus:border-gray-700 bg-gray-800 
                              focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in`}
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              onKeyDown={handleTextChange}
            />
          </label>
        </div>

        <button type="button"
                className="flex flex-shrink-0 focus:outline-none mx-2 ml-4 block text-blue-500 hover:text-blue-600 w-7 h-7 mb-3.5">
          {messageText.length > 0 ? (
            <>
              {isLoading ? (
                <div className={"cursor-default"}>
                  <Loader/>
                </div>
              ) : (
                <BiSend size={30} onClick={() => sendMessage(messageText)}/>
              )}
            </>
          ) : (
            <AiFillLike size={30}/>
          )}
        </button>
      </div>
    </div>
  );
}

