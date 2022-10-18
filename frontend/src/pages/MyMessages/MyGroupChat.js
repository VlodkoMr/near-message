import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { Loader } from "../../components/Loader";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { NearContext } from "../../context/NearContext";
import { generateTemporaryMessage, loadSocialProfiles, onlyUnique, transformMessages } from "../../utils/transform";
import { loadGroupMessages, loadNewGroupMessages } from "../../utils/requests";

const fetchSecondsInterval = 5;

export const MyGroupChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [ messages, setMessages ] = useState([]);
  const [ isReady, setIsReady ] = useState(false);
  const [ group, setGroup ] = useState();
  const [ reloadCounter, setReloadCounter ] = useState(0);
  const [ tmpMessages, setTmpMessages ] = useState([]);
  const [ userProfiles, setUserProfiles ] = useState({});

  const loadGroupInfo = async () => {
    return await near.mainContract.getGroupById(parseInt(id));
  }

  useEffect(() => {
    setIsReady(false);

    setTmpMessages([]);
    loadGroupInfo().then(group => {
      setGroup(group);
    })

    loadGroupMessages(id).then(messages => {
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
        loadGroupMessages(id).then(messages => {
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
    loadNewGroupMessages(id, lastMessage.id).then(messages => {
      if (messages && messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.id);
        setTmpMessages(prev => prev.filter(msg => newMessageIds.indexOf(msg.id) === -1));

        // append new messages
        const newMessages = transformMessages(messages, near.wallet.accountId, lastMessage.from_address, id);
        setMessages(prev => prev.concat(newMessages));
      }
    });
  }

  // add temporary message
  const appendTemporaryMessage = (messageId, text, media) => {
    const tmpMessage = generateTemporaryMessage(messageId, text, media, near.wallet.accountId, id);
    setTmpMessages(prev => prev.concat(tmpMessage));
  }

  const isLastMessage = (message, index) => {
    return !messages[index + 1] || messages[index + 1].from_address !== message.from_address;
  }

  return (
    <>
      {group && (
        <>
          <MessagesHeader group={group}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {messages.map((message, index) => (
                    <OneMessage message={message}
                                key={message.id}
                                opponent={userProfiles[message.from_address] || null}
                                isLast={isLastMessage(message, index)}
                    />
                  )
                )}
                {tmpMessages.length > 0 && tmpMessages.filter(tmp => tmp.to === id).map(tmpMessage => (
                    <OneMessage message={tmpMessage}
                                key={tmpMessage.id}
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

          <WriteMessage toGroup={group} onMessageSent={appendTemporaryMessage}/>
        </>
      )}
    </>
  );
};
