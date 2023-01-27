import React, { useContext, useEffect, useRef, useState } from "react";
import { useOutletContext, useParams } from 'react-router-dom';
import MessagesHeader  from "../../components/MyMessages/Chat/MessagesHeader";
import Loader  from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { generateTemporaryMessage, getInnerId, loadSocialProfiles, onlyUnique, transformMessages } from "../../utils/transform";
import { isJoinedGroup, loadGroupMessages, loadNewGroupMessages } from "../../utils/requests";
import GroupChatBottom  from "../../components/MyMessages/Chat/GroupChatBottom";
import MessagesList  from "../../components/MyMessages/Chat/MessagesList";
import { timestampToDate } from "../../utils/datetime";

const fetchSecondsInterval = 5;
const messagesPerPage = 100;

const MyGroupChat: React.FC = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [_, openChatsList] = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [historyMessages, setHistoryMessages] = useState([]);
  const [historyPage, setHistoryPage] = useState(0);
  const [hideHistoryButton, setHideHistoryButton] = useState(false);
  const [tmpMessages, setTmpMessages] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [group, setGroup] = useState();
  const [reloadCounter, setReloadCounter] = useState(0);
  const [userProfiles, setUserProfiles] = useState({});
  const [replyToMessage, setReplyToMessage] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  const loadGroupInfo = async () => {
    return await near.mainContract.getGroupById(parseInt(id));
  }

  useEffect(() => {
    setIsReady(false);

    setReplyToMessage(null);
    setTmpMessages([]);
    loadGroupInfo().then(group => {
      setGroup(group);
    })

    loadGroupMessages(id, messagesPerPage).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));

      const profiles = messages.map(message => message.from_address).filter(onlyUnique);
      loadSocialProfiles(profiles, near).then(result => {
        if (result) {
          setUserProfiles(result);
        }
      });

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
    if (group) {
      isJoinedGroup(group, near).then(result => {
        setIsJoined(result);
      });
    }
  }, [group]);

  useEffect(() => {
    if (reloadCounter) {
      appendNewChatMessages();
    }
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

  // Get new messages - each few seconds
  const appendNewChatMessages = () => {
    const lastMessage = messages[messages.length - 1] || null;
    const lastMessageId = lastMessage?.id || 0;

    loadNewGroupMessages(id, lastMessageId).then(messages => {
      if (messages && messages.length) {
        // load new user profiles
        const profiles = messages.filter(message => !userProfiles[message.from_address]).map(message => message.from_address).filter(onlyUnique);
        loadSocialProfiles(profiles, near).then(result => {
          if (result) {
            setUserProfiles(prev => {
              return { ...prev, ...result };
            });
          }
        });

        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.inner_id);
        setTmpMessages(prev => prev.filter(msg => {
          const innerId = getInnerId(msg.text, msg.image, id);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(
          messages,
          near.wallet.accountId,
          timestampToDate(lastMessage?.created_at),
        );
        setMessages(prev => prev.concat(newMessages));
      }
    }).finally(() => {
      setTimeout(() => {
        setReloadCounter(prev => prev + 1);
      }, 1000 * fetchSecondsInterval);
    });
  }

  // Add temporary message
  const appendTemporaryMessage = (text, image) => {
    const tmpMessage = generateTemporaryMessage(text, image, near.wallet.accountId, id);
    setTmpMessages(prev => prev.concat(tmpMessage));
  }

  // load previous messages
  const loadHistoryMessages = () => {
    setHideHistoryButton(true);
    setHistoryPage(prev => prev + 1);

    const skipMessages = messagesPerPage * (historyPage + 1);
    loadGroupMessages(id, messagesPerPage, skipMessages).then(messages => {
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
      {group && (
        <>
          <MessagesHeader group={group} openChatsList={openChatsList}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {(messages.length || tmpMessages.length) ? (
                  <MessagesList messages={messages}
                                historyMessages={historyMessages}
                                tmpMessages={tmpMessages}
                                messagesPerPage={messagesPerPage}
                                setReplyToMessage={setReplyToMessage}
                                userProfiles={userProfiles}
                                opponentAddress={id}
                                loadHistoryMessages={loadHistoryMessages}
                                hideHistoryButton={hideHistoryButton}
                                canReportReply={isJoined}
                  />
                ) : (
                  <div className={"text-center text-sm opacity-60 pt-2"}>
                    *No Messages
                  </div>
                )}
              </>
            ) : (
              <div className={"mx-auto w-8 pt-2"}>
                <Loader/>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <GroupChatBottom group={group}
                           replyToMessage={replyToMessage}
                           setReplyToMessage={setReplyToMessage}
                           onMessageSent={appendTemporaryMessage}
                           isJoined={isJoined}
                           setIsJoined={setIsJoined}
          />
        </>
      )}
    </>
  );
};

export default MyGroupChat;