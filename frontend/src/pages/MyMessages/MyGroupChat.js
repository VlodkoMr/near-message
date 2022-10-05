import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { createClient } from "urql";

import { API_URL } from "../../settings/config";
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { loadRoomMessages } from "../../utils/requests";

export const MyGroupChat = () => {
  const navigate = useNavigate();
  const [ toAddress, setToAddress ] = useState("");
  const [ messageText, setMessageText ] = useState("");
  const [ messages, setMessages ] = useState([]);


  useEffect(() => {
    loadRoomMessages().then(messages => {
      console.log(`messages`, messages);
    });
  }, []);

  // const handleSend = (e) => {
  //   e.preventDefault();
  //   if (!toAddress.length || !messageText.length) {
  //     alert('Fill all fields');
  //     return;
  //   }
  //   mainContract.sendMessage(toAddress, messageText)
  //     .then(async () => {
  //       console.log(`OK!`);
  //     })
  //     .finally(() => {
  //       console.log(`finally`);
  //       loadMessages();
  //     });
  // }

  return (
    <>
      <MyMessagesHeader/>
      <div>
        MyGroupChat
      </div>
    </>
  );
};
