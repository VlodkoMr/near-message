import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { createClient } from "urql";

import { API_URL } from "../../settings/config";

export const MyGroupChat = () => {
  const navigate = useNavigate();
  const [ toAddress, setToAddress ] = useState("");
  const [ messageText, setMessageText ] = useState("");
  const [ messages, setMessages ] = useState([]);

  const loadMessages = async () => {
    const tokensQuery = `
        query {
          messages {
            id
            fromAddress
            toAddress
            text
          }
        }
      `
    console.log(`API_URL`, API_URL);
    const client = new createClient({
      url: API_URL,
    })

    const result = await client.query(tokensQuery).toPromise()
    console.log(`result.data`, result.data);

    setMessages(result.data.messages);
  }

  useEffect(() => {
    loadMessages();
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
      MyGroupChat
    </>
  );
};
