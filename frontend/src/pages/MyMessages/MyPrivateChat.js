import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewRoomMessages, loadPrivateMessages, loadRoomMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages } from "../../utils/transform";

const fetchSecondsInterval = 10;

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);
  const [ opponent, setOpponent ] = useState({
    id: "",
    media: "",
    level: "",
    instagram: "",
    telegram: "",
    twitter: "",
    website: "",
  });

  useEffect(() => {
    setIsReady(false);
    loadUserInfo().then(result => {
      setOpponent(result);
    });

    // Load last messages
    loadChatMessages().then(() => {
      setIsReady(true);
    });

    // Update to get new messages
    const fetchInterval = setInterval(() => {
      if (messages.length > 0) {
        //   const lastMessageId = messages[messages.length - 1]
        //   loadNewRoomMessages(id, lastMessageId).then(newMessages => {
        //     if (newMessages.length) {
        //       newMessages = transformMessages(newMessages, near.wallet.accountId);
        //
        //       console.log(`newMessages`, newMessages);
        //
        //
        //       // setMessages();
        //     }
        //   });
        // } else {
        //   loadRoomMessages(id).then(messages => {
        //     setMessages(transformMessages(messages, near.wallet.accountId));
        //   });
      } else {
        loadChatMessages();
      }
    }, 1000 * fetchSecondsInterval);

    return () => {
      clearInterval(fetchInterval);
    };
  }, [ id ]);

  const loadUserInfo = async () => {
    const address = id.split("|");
    const opponentAddress = (address[0] === near.wallet.accountId) ? address[1] : address[0];
    const user = await near.mainContract.getUserInfo(opponentAddress);
    if (user) {
      return user;
    }
    return { id: opponentAddress };
  }

  const loadChatMessages = async () => {
    loadPrivateMessages(id).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));
    });
  }

  const updateMessagesList = (messageId, messageText, messageMedia) => {
    // add temporary message
    const tmpMessage = generateTemporaryMessage(messageId, messageText, messageMedia, near.wallet.accountId, opponent);
    messages.push(tmpMessage);
    setMessages(messages);
  }

  return (
    <>
      {opponent.id && (
        <MyMessagesHeader title={opponent.id} media={opponent.media}/>
      )}

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

      {opponent.id && (
        <WriteMessage toAddress={opponent.id} onSuccess={updateMessagesList}/>
      )}
    </>
  );
};
