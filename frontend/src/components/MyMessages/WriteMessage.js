import React, { useContext, useEffect, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { AiFillLike, BiSend, BsImage, FaSmile } from "react-icons/all";
import { NearContext } from "../../context/NearContext";

export const WriteMessage = ({ toAddress, toRoom, onSuccess }) => {
  const [ text, setText ] = useState("");
  const [ isLoading, setIsLoading ] = useState(false);
  const near = useContext(NearContext);

  const handleChange = (e) => {
    const value = e.target.value.trim();
    setText(value);

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const sendFunction = toAddress ? "sendPrivateMessage" : "sendRoomMessage";
      const sendTo = toAddress || toRoom.id;

      console.log(`sendTo`, sendTo);
      console.log(`sendFunction`, sendFunction);

      if (value.length === 0) {
        alert("Please provide message text");
        return false;
      }

      setIsLoading(true);

      near.mainContract[sendFunction](value, sendTo, "")
        .then(async () => {
          console.log(`OK!`);
          onSuccess?.();
        })
        .catch(e => {
          console.log(e);
          alert('Message not sent');
        })
        .finally(() => {
          setIsLoading(false);
        });

      return false;
    }
  }

  return (
    <div className="chat-footer flex-none">
      <div className="flex flex-row items-end p-4">
        <button type="button"
                className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mr-4 mb-4">
          <BsImage size={28}/>
        </button>
        {/*<button type="button"*/}
        {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-500 hover:text-blue-600 w-6 h-6 mr-4 mb-4">*/}
        {/*  <FaSmile size={28}/>*/}
        {/*</button>*/}

        <div className="relative flex-grow">
          <label>
            <TextareaAutosize placeholder="Aa"
                              maxRows={10}
                              disabled={isLoading}
                              className={`rounded-3xl py-2 pl-3 pr-10 w-full border border-gray-700/60 focus:border-gray-700 bg-gray-800 
                              focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in`}
                              defaultValue={text}
                              onKeyDown={handleChange}
            />
          </label>
        </div>

        {text.length > 0 ? (
          <button type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 ml-4 block text-blue-500 hover:text-blue-600 w-7 h-7 mb-3.5">
            <BiSend size={30}/>
          </button>
        ) : (
          <button type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 ml-4 block text-blue-500 hover:text-blue-600 w-7 h-7 mb-3.5">
            <AiFillLike size={30}/>
          </button>
        )}
      </div>
    </div>
  );
}

