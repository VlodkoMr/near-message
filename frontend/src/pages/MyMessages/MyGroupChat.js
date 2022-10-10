import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { loadNewRoomMessages, loadRoomMessages } from "../../utils/requests";
import { Loader } from "../../components/Loader";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { NearContext } from "../../context/NearContext";
import { generateTemporaryMessage, transformMessages } from "../../utils/transform";

const fetchSecondsInterval = 7;

export const MyGroupChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const bottomRef = useRef(null);
  const [ messages, setMessages ] = useState([]);
  const [ isReady, setIsReady ] = useState(false);
  const [ room, setRoom ] = useState();
  const [ reloadCounter, setReloadCounter ] = useState(0);
  const [ tmpMessages, setTmpMessages ] = useState([]);

  const loadRoomInfo = async () => {
    return await near.mainContract.getRoomById(parseInt(id));
  }

  useEffect(() => {
    setIsReady(false);
    loadRoomInfo().then(room => {
      setRoom(room);
    })

    loadRoomMessages(id).then(messages => {
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
        loadRoomMessages(id).then(messages => {
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
    loadNewRoomMessages(id, lastMessage.id).then(messages => {
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.id);
        const newTmp = tmpMessages.filter(msg => newMessageIds.indexOf(msg.id) === -1);
        setTmpMessages([ ...newTmp ]);

        // append new messages
        const newMessages = transformMessages(messages, near.wallet.accountId, lastMessage.from_user.id);
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
      {room && (
        <MessagesHeader room={room}/>
      )}

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

      {room && (
        <WriteMessage toRoom={room} onSuccess={appendTemporaryMessage}/>
      )}
    </>
  );
};
