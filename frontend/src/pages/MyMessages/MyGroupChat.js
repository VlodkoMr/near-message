import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { Loader } from "../../components/Loader";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { NearContext } from "../../context/NearContext";
import { generateTemporaryMessage, loadSocialProfile, onlyUnique, transformMessages } from "../../utils/transform";
import { loadGroupMessages, loadNewGroupMessages } from "../../utils/requests";

const fetchSecondsInterval = 7;

export const MyGroupChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [ messages, setMessages ] = useState([]);
  const [ isReady, setIsReady ] = useState(false);
  const [ group, setGroup ] = useState();
  const [ reloadCounter, setReloadCounter ] = useState(0);
  const [ tmpMessages, setTmpMessages ] = useState([]);

  const loadGroupInfo = async () => {
    return await near.mainContract.getGroupById(parseInt(id));
  }

  useEffect(() => {
    setIsReady(false);
    loadGroupInfo().then(group => {
      setGroup(group);
    })

    loadGroupMessages(id).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));

      const profiles = messages.map(message => message.from_address).filter(onlyUnique);
      console.log(`profiles`, profiles);
      // loadSocialProfile(opponentAddress, near).then(result => {
      //   setOpponent(result);
      // });

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
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.id);
        const newTmp = tmpMessages.filter(msg => newMessageIds.indexOf(msg.id) === -1);
        setTmpMessages([ ...newTmp ]);

        // append new messages
        const newMessages = transformMessages(messages, near.wallet.accountId, lastMessage.from_address);
        setMessages(prev => prev.concat(newMessages));
      }
    });
  }

  // add temporary message
  const appendTemporaryMessage = (id, text, media) => {
    const newMessage = generateTemporaryMessage(id, text, media, near.wallet.accountId);
    tmpMessages.push(newMessage);
    setTmpMessages([ ...tmpMessages ]);
  }

  return (
    <>
      {group && (
        <>
          <MessagesHeader group={group}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <>
                {messages.map(message => (
                    <OneMessage message={message} key={message.id}/>
                  )
                )}

                {tmpMessages.length > 0 && (
                  <>
                    <p className="p-4 text-center text-sm text-gray-500">
                      pending...
                    </p>
                    {tmpMessages.map(tmpMessage => (
                        <OneMessage message={tmpMessage} key={tmpMessage.id}/>
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

          <WriteMessage toGroup={group} onSuccess={appendTemporaryMessage}/>
        </>
      )}
    </>
  );
};
