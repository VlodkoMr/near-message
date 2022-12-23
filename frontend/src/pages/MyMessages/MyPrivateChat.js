import React, { useContext, useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/Chat/MessagesHeader";
import { WriteMessage } from "../../components/MyMessages/Chat/WriteMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewPrivateMessages, loadPrivateMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages, loadSocialProfile, getInnerId } from "../../utils/transform";
import { SecretChat } from "../../utils/secret-chat";
import { MessagesList } from "../../components/MyMessages/Chat/MessagesList";
import { timestampToDate } from "../../utils/datetime";

const fetchSecondsInterval = 5;
const messagesPerPage = 100;

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [_, openChatsList] = useOutletContext();
  const bottomRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tmpMessages, setTmpMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [hideHistoryButton, setHideHistoryButton] = useState(false);
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
    loadPrivateMessages(id, messagesPerPage).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));
      setIsReady(true);
    });

    // Fetch new messages each few seconds
    const updateTimeout = setTimeout(() => {
      setReloadCounter(prev => prev + 1);
    }, 1000 * fetchSecondsInterval);

    return () => {
      clearTimeout(updateTimeout);
    }
  }, [id]);

  useEffect(() => {
    if (reloadCounter) {
      appendNewChatMessages();
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
    const lastMessage = messages[messages.length - 1] || null;
    const lastMessageId = lastMessage?.id || 0;

    loadNewPrivateMessages(id, lastMessageId).then(messages => {
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.inner_id);
        setTmpMessages(prev => prev.filter(msg => {
          const innerId = getInnerId(msg.text, msg.image, opponentAddress);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(
          messages,
          near.wallet.accountId,
          lastMessage?.from_address,
          timestampToDate(lastMessage?.created_at)
        );
        setMessages(prev => prev.concat(newMessages));
      }
    }).finally(() => {
      setTimeout(() => {
        setReloadCounter(prev => prev + 1);
      }, 1000 * fetchSecondsInterval);
    });
  }

  // add temporary message
  const appendTemporaryMessage = (text, image, encryptKey) => {
    let newMessage = generateTemporaryMessage(text, image, near.wallet.accountId, opponentAddress, encryptKey);
    setTmpMessages(prev => prev.concat(newMessage));
  }

  // load previous messages
  const loadHistoryMessages = () => {
    setHideHistoryButton(true);
    setHistoryPage(prev => prev + 1);

    const skipMessages = messagesPerPage * (historyPage + 1);
    loadPrivateMessages(id, messagesPerPage, skipMessages).then(messages => {
      const newMessages = transformMessages(messages, near.wallet.accountId);
      if (newMessages.length === messagesPerPage) {
        setHideHistoryButton(false);
      }

      setHistoryMessages(prev => {
        prev.unshift(...newMessages);
        return prev;
      });
    });
  }

  return (
    <>
      {opponent && (
        <>
          <MessagesHeader opponent={opponent} openChatsList={openChatsList}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <MessagesList messages={messages}
                            historyMessages={historyMessages}
                            tmpMessages={tmpMessages}
                            messagesPerPage={messagesPerPage}
                            setReplyToMessage={setReplyToMessage}
                            opponent={opponent}
                            opponentAddress={opponentAddress}
                            loadHistoryMessages={loadHistoryMessages}
                            hideHistoryButton={hideHistoryButton}
              />
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
                        changePrivateMode={isPrivateMode}
          />
        </>
      )}
    </>
  );
};
