import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import MessagesHeader from "../../components/MyMessages/Chat/MessagesHeader";
import WriteMessage from "../../components/MyMessages/Chat/WriteMessage";
import Loader from "../../ui/Loader";
import { NearContext } from "../../context/NearContext";
import { loadNewPrivateMessages, loadPrivateMessages } from "../../utils/requests";
import { generateTemporaryMessage, transformMessages, loadSocialProfile, getInnerId } from "../../utils/transform";
import { SecretChat } from "../../services/SecretChat";
import MessagesList from "../../components/MyMessages/Chat/MessagesList";
import { timestampToDate } from "../../utils/datetime";
import { IMessage, IMessageInput, INearContext, IProfile } from "../../types";
import { MessagesContext } from "./MyMessagesLayout";
import { CHAT_FETCH_INTERVAL, MESSAGES_PER_PAGE } from "../../constants/chat";

const MyPrivateChat: React.FC = () => {
  let { id } = useParams();
  const near: INearContext = useContext(NearContext);
  const { openChatsList } = MessagesContext();
  const bottomRef = useRef<HTMLDivElement|null>(null);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState<IMessage[]>([]);
  const [ tmpMessages, setTmpMessages ] = useState<IMessage[]>([]);
  const [ historyMessages, setHistoryMessages ] = useState<IMessage[]>([]);
  const [ historyPage, setHistoryPage ] = useState(0);
  const [ hideHistoryButton, setHideHistoryButton ] = useState(false);
  const [ opponent, setOpponent ] = useState<IProfile|undefined>();
  const [ reloadCounter, setReloadCounter ] = useState(0);
  const [ opponentAddress, setOpponentAddress ] = useState("");
  const [ isPrivateMode, setIsPrivateMode ] = useState(false);
  const [ replyToMessage, setReplyToMessage ] = useState<IMessage|null>(null);

  useEffect(() => {
    if (!id) return;

    const address = id.split("|");
    const opponentAddress = (address[0] === near.wallet?.accountId) ? address[1] : address[0];
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
    loadPrivateMessages(id, MESSAGES_PER_PAGE).then((messages: IMessageInput[]) => {
      if (!near.wallet?.accountId) return;

      setMessages(transformMessages(messages, near.wallet.accountId));
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
    if (reloadCounter) {
      appendNewChatMessages();
    }

    // check is secret chat enabled
    updateIsPrivateMode(opponentAddress);
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

  const updateIsPrivateMode = (opponent: string) => {
    if (opponent && near.wallet?.accountId) {
      const secretChat = new SecretChat(opponent, near.wallet.accountId);
      setIsPrivateMode(secretChat.isPrivateModeEnabled());
    }
  };

  // Get new messages - each few seconds
  const appendNewChatMessages = () => {
    if (!id || !near.wallet?.accountId) return;

    const lastMessage = messages[messages.length - 1] || null;
    const lastMessageId = lastMessage?.id || "";

    loadNewPrivateMessages(id, lastMessageId).then((messages: IMessageInput[]) => {
      if (messages.length) {
        // remove if found in temporary
        const newMessageIds = messages.map(msg => msg.inner_id);
        setTmpMessages(prev => prev.filter((msg: IMessage) => {
          const innerId = getInnerId(msg.text, msg.image, opponentAddress);
          return newMessageIds.indexOf(innerId) === -1;
        }));

        // append new messages
        const newMessages = transformMessages(
          messages,
          near.wallet?.accountId as string,
          timestampToDate(lastMessage?.created_at)
        );
        setMessages(prev => prev.concat(newMessages));
      }
    }).finally(() => {
      setTimeout(() => {
        setReloadCounter(prev => prev + 1);
      }, 1000 * CHAT_FETCH_INTERVAL);
    });
  }

  // add temporary message
  const appendTemporaryMessage = (text: string, image: string, encryptKey?: string) => {
    if (!near.wallet?.accountId) return;

    let newMessage: IMessage = generateTemporaryMessage(text, image, near.wallet.accountId, opponentAddress, encryptKey || "");
    setTmpMessages((prev: IMessage[]) => prev.concat(newMessage));
  }

  // load previous messages
  const loadHistoryMessages = () => {
    if (!id || !near.wallet?.accountId) return;

    setHideHistoryButton(true);
    setHistoryPage(prev => prev + 1);

    const skipMessages = MESSAGES_PER_PAGE * (historyPage + 1);
    loadPrivateMessages(id, MESSAGES_PER_PAGE, skipMessages).then((messages: IMessageInput[]) => {
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
      {opponent && (
        <>
          <MessagesHeader opponent={opponent} openChatsList={openChatsList}/>

          <div className={"chat-body p-4 flex-1 flex flex-col overflow-y-scroll"}>
            {isReady ? (
              <MessagesList messages={messages}
                            historyMessages={historyMessages}
                            tmpMessages={tmpMessages}
                            messagesPerPage={MESSAGES_PER_PAGE}
                            setReplyToMessage={setReplyToMessage}
                            opponent={opponent}
                            opponentAddress={opponentAddress}
                            loadHistoryMessages={loadHistoryMessages}
                            hideHistoryButton={hideHistoryButton}
                            canReportReply={true}
                            isGroup={false}
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

export default MyPrivateChat;