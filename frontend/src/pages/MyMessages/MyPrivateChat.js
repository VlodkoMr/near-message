import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewPrivateMessages, loadPrivateMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages, loadSocialProfile, getInnerId } from "../../utils/transform";
import { SecretChat } from "../../utils/secret-chat";

const fetchSecondsInterval = 5;

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tmpMessages, setTmpMessages] = useState([]);
  const [opponent, setOpponent] = useState();
  const [reloadCounter, setReloadCounter] = useState(0);
  const [opponentAddress, setOpponentAddress] = useState("");
  const [isPrivateMode, setIsPrivateMode] = useState(false);
  const [replyToMessage, setReplyToMessage] = useState(null);

  useEffect(() => {
    const address = id.split("|");
    const opponentAddress = (address[0] === near.wallet.accountId) ? address[1] : address[0];
    setOpponentAddress(opponentAddress);
    updateIsPrivateMode(opponentAddress);

    setTmpMessages([]);
    setReplyToMessage(null);

    loadSocialProfile(opponentAddress, near).then(result => {
      setOpponent(result);
    }).catch(e => {
      console.log(`Load profile error`, e);
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
  }, [id]);

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

    // check is secret chat enabled
    updateIsPrivateMode(opponentAddress);
  }, [reloadCounter]);

  useEffect(() => {
    setTimeout(() => {
      let behavior = { behavior: 'auto' };
      if (reloadCounter > 0) {
        behavior = { behavior: 'smooth' };
      }
      bottomRef.current?.scrollIntoView(behavior);
    }, 100);
  }, [messages, tmpMessages]);

  const updateIsPrivateMode = (opponent) => {
    if (opponent) {
      const secretChat = new SecretChat(opponent, near.wallet.accountId);
      setIsPrivateMode(secretChat.isPrivateModeEnabled());
    }
  };

  // Get new messages - each few seconds
  const appendNewChatMessages = () => {
    const lastMessage = messages[messages.length - 1];
    loadNewPrivateMessages(id, lastMessage.id).then(messages => {
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.inner_id);
        setTmpMessages(prev => prev.filter(msg => {
          const innerId = getInnerId(msg.text, msg.image, opponentAddress);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(messages, near.wallet.accountId, lastMessage.from_address);
        setMessages(prev => prev.concat(newMessages));
      }
    });
  }

  // add temporary message
  const appendTemporaryMessage = (text, image, encryptKey) => {
    let newMessage = generateTemporaryMessage(text, image, near.wallet.accountId, opponentAddress, encryptKey);
    setTmpMessages(prev => prev.concat(newMessage));
  }

  const isLastMessage = (message, index) => {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  }

  return (
    <>
      {opponent && (
        <>
          <MessagesHeader opponent={opponent}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {messages.map((message, index) => (
                    <OneMessage key={message.id}
                                message={message}
                                opponent={opponent}
                                setReplyToMessage={setReplyToMessage}
                                isLast={isLastMessage(message, index)}
                    />
                  )
                )}
                {tmpMessages.length > 0 && tmpMessages.filter(tmp => tmp.to_address === opponentAddress).map(tmpMessage => (
                    <OneMessage key={tmpMessage.id}
                                message={tmpMessage}
                                opponent={opponent}
                                isLast={true}
                    />
                  )
                )}
              </>
            ) : (
              <div className={"mx-auto w-8 pt-2"}>
                <Loader/>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <WriteMessage toAddress={opponent.id}
                        onMessageSent={appendTemporaryMessage}
                        replyToMessage={replyToMessage}
                        setReplyToMessage={setReplyToMessage}
                        isPrivateMode={isPrivateMode}
                        setIsPrivateMode={setIsPrivateMode}
          />
        </>
      )}
    </>
  );
};
