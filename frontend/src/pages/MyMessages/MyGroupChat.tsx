import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import MessagesHeader from "../../components/MyMessages/Chat/MessagesHeader";
import Loader from "../../ui/Loader";
import { NearContext } from "../../context/NearContext";
import { generateTemporaryMessage, getInnerId, loadSocialProfiles, onlyUnique, transformMessages } from "../../utils/transform";
import { isJoinedGroup, loadGroupMessages, loadNewGroupMessages } from "../../utils/requests";
import GroupChatBottom from "../../components/MyMessages/Chat/GroupChatBottom";
import MessagesList from "../../components/MyMessages/Chat/MessagesList";
import { timestampToDate } from "../../utils/datetime";
import { IGroup, IMessage, INearContext, IProfile } from "../../types";
import { MessagesContext } from "./MyMessagesLayout";
import { CHAT_FETCH_INTERVAL, MESSAGES_PER_PAGE } from "../../constants/chat";

const MyGroupChat: React.FC = () => {
  let { id } = useParams();
  const near: INearContext = useContext(NearContext);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { openChatsList } = MessagesContext();
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ historyMessages, setHistoryMessages ] = useState<IMessage[]>([]);
  const [ historyPage, setHistoryPage ] = useState(0);
  const [ hideHistoryButton, setHideHistoryButton ] = useState(false);
  const [ tmpMessages, setTmpMessages ] = useState<IMessage[]>([]);
  const [ isReady, setIsReady ] = useState(false);
  const [ group, setGroup ] = useState<IGroup>();
  const [ reloadCounter, setReloadCounter ] = useState(0);
  const [ userProfiles, setUserProfiles ] = useState<Record<string, IProfile>>({});
  const [ replyToMessage, setReplyToMessage ] = useState(null);
  const [ isJoined, setIsJoined ] = useState(false);

  const loadGroupInfo = async () => {
    if (!id) return;
    return near.mainContract?.getGroupById(parseInt(id));
  }

  useEffect(() => {
    if (!id || !near.wallet?.accountId) return;
    setIsReady(false);

    setReplyToMessage(null);
    setTmpMessages([]);
    loadGroupInfo().then(group => {
      setGroup(group);
    })

    loadGroupMessages(id, MESSAGES_PER_PAGE).then(messages => {
      setMessages(transformMessages(messages, near.wallet?.accountId as string));

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
    }, 1000 * CHAT_FETCH_INTERVAL);

    return () => {
      clearTimeout(updateTimeout);
    }
  }, [ id ]);

  useEffect(() => {
    if (group) {
      isJoinedGroup(group, near).then(result => {
        setIsJoined(result);
      });
    }
  }, [ group ]);

  useEffect(() => {
    if (reloadCounter) {
      appendNewChatMessages();
    }
  }, [ reloadCounter ]);

  useEffect(() => {
    setTimeout(() => {
      let behavior: ScrollOptions = { behavior: 'auto' };
      if (reloadCounter > 0) {
        behavior = { behavior: 'smooth' };
      }
      bottomRef.current?.scrollIntoView(behavior);
    }, 100);
  }, [ messages, tmpMessages ]);

  // Get new messages - each few seconds
  const appendNewChatMessages = () => {
    if (!id || !near.wallet?.accountId) return;
    const lastMessage = messages[messages.length - 1] || null;
    const lastMessageId = parseInt(lastMessage?.id) || 0;

    loadNewGroupMessages(parseInt(id), lastMessageId).then(messages => {
      if (messages && messages.length) {
        // load new user profiles
        const profiles = messages.filter(message => !userProfiles[message.from_address]).map(
          message => message.from_address
        ).filter(onlyUnique);
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
          const innerId = getInnerId(msg.text, msg.image, id as string);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(
          messages,
          near.wallet?.accountId as string,
          timestampToDate(lastMessage?.created_at),
        );
        setMessages(prev => prev.concat(newMessages));
      }
    }).finally(() => {
      setTimeout(() => {
        setReloadCounter(prev => prev + 1);
      }, 1000 * CHAT_FETCH_INTERVAL);
    });
  }

  // Add temporary message
  const appendTemporaryMessage = (text: string, image: string) => {
    if (!id || !near.wallet?.accountId) return;

    const tmpMessage = generateTemporaryMessage(text, image, near.wallet.accountId, id, "");
    setTmpMessages(prev => prev.concat(tmpMessage));
  }

  // load previous messages
  const loadHistoryMessages = () => {
    if (!id || !near.wallet?.accountId) return;

    setHideHistoryButton(true);
    setHistoryPage(prev => prev + 1);

    const skipMessages = MESSAGES_PER_PAGE * (historyPage + 1);
    loadGroupMessages(id, MESSAGES_PER_PAGE, skipMessages).then(messages => {
      const newMessages = transformMessages(messages, near.wallet?.accountId as string);
      if (newMessages.length === MESSAGES_PER_PAGE) {
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
      {id && group && (
        <>
          <MessagesHeader group={group} openChatsList={openChatsList}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {(messages.length || tmpMessages.length) ? (
                  <MessagesList messages={messages}
                                historyMessages={historyMessages}
                                tmpMessages={tmpMessages}
                                messagesPerPage={MESSAGES_PER_PAGE}
                                setReplyToMessage={setReplyToMessage}
                                userProfiles={userProfiles}
                                opponentAddress={id}
                                loadHistoryMessages={loadHistoryMessages}
                                hideHistoryButton={hideHistoryButton}
                                canReportReply={isJoined}
                                opponent={null}
                                isGroup={true}
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