import React, { useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";

export const MyPrivateChat = () => {
  const navigate = useNavigate();
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);

  return (
    <>
      <MyMessagesHeader/>

      <div className={"chat-body p-4 flex-1 overflow-y-scroll"}>
        {isReady ? messages.map(message => (
            <OneMessage message={message} key={message.id}/>
          )
        ) : (
          <div className={"mx-auto w-8 pt-2"}>
            <Loader/>
          </div>
        )}
      </div>

      <WriteMessage/>
    </>
  );
};
