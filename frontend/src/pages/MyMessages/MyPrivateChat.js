import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewPrivateMessages, loadPrivateMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages, loadSocialProfile } from "../../utils/transform";

const fetchSecondsInterval = 7;

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);
  const [ tmpMessages, setTmpMessages ] = useState([]);
  const [ opponent, setOpponent ] = useState();
  const [ reloadCounter, setReloadCounter ] = useState(0);

  useEffect(() => {
    const address = id.split("|");
    const opponentAddress = (address[0] === near.wallet.accountId) ? address[1] : address[0];

    loadSocialProfile(opponentAddress, near).then(result => {
      setOpponent(result);
    });

    // Load last messages
    loadPrivateMessages(id).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));
      setIsReady(true);
    });

    // Fetch new messages each few seconds
    const updateInterval = setInterval(() => {
      setReloadCounter(prev => prev + 1);
    }, 1000 * fetchSecondsInterval);

    return () => {
      clearInterval(updateInterval);
    }
  }, [ id ]);

  useEffect(() => {
    if (reloadCounter) {
      if (messages.length > 0) {
        appendNewChatMessages();
      } else {
        loadPrivateMessages(id).then(messages => {
          setMessages(transformMessages(messages, near.wallet.accountId));
        });
      }
    }
  }, [ reloadCounter ]);

  useEffect(() => {
    let behavior = { behavior: 'auto' };
    if (reloadCounter > 0) {
      behavior = { behavior: 'smooth' };
    }
    bottomRef.current?.scrollIntoView(behavior);
  }, [ messages, tmpMessages ]);

  // Get new messages - each few seconds
  const appendNewChatMessages = () => {
    const lastMessage = messages[messages.length - 1];
    loadNewPrivateMessages(id, lastMessage.id).then(messages => {
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.id);
        setTmpMessages(prev => prev.filter(msg => newMessageIds.indexOf(msg.id) === -1));

        // append new messages
        const newMessages = transformMessages(messages, near.wallet.accountId, lastMessage.from_address);
        setMessages(prev => prev.concat(newMessages));
      }
    });
  }

  // add temporary message
  const appendTemporaryMessage = (messageId, text, media, toAccount) => {
    if (toAccount === opponent?.id) {
      setTmpMessages(prev => prev.concat(generateTemporaryMessage(messageId, text, media, near.wallet.accountId, opponent)));
    }
  }

  return (
    <>
      {opponent && (
        <>
          <MessagesHeader opponent={opponent}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {messages.map(message => (
                    <OneMessage key={message.id} message={message} opponent={opponent}/>
                  )
                )}

                {tmpMessages.length > 0 && (
                  <>
                    <p className="p-4 text-center text-sm text-gray-500">
                      pending...
                    </p>
                    {tmpMessages.map(tmpMessage => (
                        <OneMessage key={tmpMessage.id} message={tmpMessage} opponent={opponent}/>
                      )
                    )}
                  </>
                )}
              </>
            ) : (
              <div className={"mx-auto w-8 pt-2"}>
                <Loader/>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <WriteMessage toAddress={opponent.id} onMessageSent={appendTemporaryMessage}/>
        </>
      )}
    </>
  );
};
