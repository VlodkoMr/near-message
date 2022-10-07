import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewPrivateMessages, loadPrivateMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages, loadSocialProfile } from "../../utils/transform";
// import useLoadMessages from "../../utils/updateMessageHook";

const fetchSecondsInterval = 10;

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);
  const [ tmp, setTmp ] = useState([]);
  const [ tmpMessages, setTmpMessages ] = useState([]);
  // const [ newMessages, setNewTmpMessages ] = useLoadMessages();
  const [ opponent, setOpponent ] = useState();
  // const [ reloadCounter, setReloadCounter ] = useState(0);
  // const lastInterval = useRef();

  // const source = interval(3000);
  // const subscribe = source.subscribe(val => {
  //   console.log(val);
  //   if (messages.length > 0) {
  //     const lastId = messages[messages.length - 1].id;
  //     console.log(`lastId`, lastId);
  //
  //   } else {
  //     console.log(`load all!!!!!!`);
  //     loadChatMessages();
  //   }
  // });

  const funccc = () => {
    console.log(`tmp`, tmp);
    tmp.push('+');
    setTmp(tmp);

    console.log(`-----------`);
    if (messages.length > 0) {
      const lastId = messages[messages.length - 1].id;
      console.log(`lastId`, lastId);
      loadNewPrivateMessages(id, lastId).then(newMessages => {
        if (newMessages.length) {
          setMessages(transformMessages(newMessages, near.wallet.accountId));
        }
      });
    } else {
      console.log(`noooo messaaagesssss`);
      loadPrivateMessages(id).then(messages => {
        setMessages(transformMessages(messages, near.wallet.accountId));
      });
    }
  }


  useEffect(() => {
    setIsReady(false);
    const address = id.split("|");
    const opponentAddress = (address[0] === near.wallet.accountId) ? address[1] : address[0];

    loadSocialProfile(opponentAddress, near).then(result => {
      setOpponent(result);
    });

    // Load last messages
    loadChatMessages();

    setInterval(() => {
      funccc()
    }, 3000);
    // Update to get new messages
    // if (lastInterval.current) clearInterval(lastInterval.current);
    // lastInterval.current = setInterval(() => {
    //   console.log(`loadNewMessages...`);
    //   loadNewMessages();
    // }, 1000 * fetchSecondsInterval);

    // return () => {
    //   clearInterval(fetchInterval);
    // };
  }, [ id ]);

  // useEffect(() => {
  //   if (reloadCounter) {
  //     console.log(`reloadCounter`, reloadCounter);
  //     console.log(`messages`, messages);
  //
  //     const timeout = setTimeout(() => {
  //       setReloadCounter(prev => prev + 1);
  //
  //       if (messages.length > 0) {
  //         const lastId = messages[messages.length - 1].id;
  //         console.log(`lastId`, lastId);
  //         loadNewPrivateMessages(id, lastId).then(newMessages => {
  //           if (newMessages.length) {
  //             setMessages(prev => prev.concat(transformMessages(newMessages, near.wallet.accountId)));
  //           }
  //         });
  //       } else {
  //         console.log(`load all`);
  //         loadPrivateMessages(id).then(messages => {
  //           setMessages(prev => prev.concat(transformMessages(messages, near.wallet.accountId)));
  //         });
  //       }
  //
  //     }, 1000 * fetchSecondsInterval);
  //
  //     return () => {
  //       clearTimeout(timeout);
  //     };
  //   }
  // }, [ reloadCounter ]);

  // Get last messages - on init
  const loadChatMessages = () => {
    loadPrivateMessages(id).then(messages => {
      console.log(`messages`, messages);
      setMessages(transformMessages(messages, near.wallet.accountId));
      setIsReady(true);
    });
  }

  // Get new messages - each few seconds
  const loadNewMessages = async () => {
    // if (messages.length > 0) {
    // console.log(`messages`, messages);
    // const lastId = messages[messages.length - 1].id;
    // loadNewPrivateMessages(id, lastId).then(newMessages => {
    //   console.log(`newMessages`, newMessages);
    //   if (newMessages.length) {
    //     // remove if found in temporary
    //     const newMessageIds = newMessages.map(msg => msg.id);
    //     const newTmp = tmpMessages.filter(msg => newMessageIds.indexOf(msg.id) === -1);
    //
    //     console.log(`----------- newTmp -----------`, newTmp);
    //
    //     setTmpMessages([ ...newTmp ]);
    //
    //     // add to all messages
    //     setMessages(prev => prev.concat(transformMessages(newMessages, near.wallet.accountId)));
    //   }
    // });
    // } else {
    //   console.log(`loadChatMessages`);
    //   // loadChatMessages();
    // }
  }

  // add temporary message
  const appendTemporaryMessage = (id, text, media) => {
    const newMessage = generateTemporaryMessage(id, text, media, near.wallet.accountId, opponent);
    tmpMessages.push(newMessage);
    setTmpMessages([ ...tmpMessages ]);
  }

  return (
    <>
      {opponent && (
        <MessagesHeader account={opponent}/>
      )}

      <div className={"chat-body p-4 flex-1 overflow-y-scroll"}>
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
      </div>

      {opponent && (
        <WriteMessage toAddress={opponent.id} onSuccess={appendTemporaryMessage}/>
      )}
    </>
  );
};
