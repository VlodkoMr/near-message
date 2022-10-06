import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";
import { loadPrivateMessages } from "../../utils/requests";
import { transformMessages } from "../../utils/transform";

export const MyPrivateChat = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);
  const [ opponent, setOpponent ] = useState({
    address: "",
    media: "",
    level: "",
    instagram: "",
    telegram: "",
    twitter: "",
    website: "",
  });

  useEffect(() => {
    setIsReady(false);

    const address = id.split("|");
    const opponent = (address[0] === near.wallet.accountId) ? address[1] : address[0];
    loadUserInfo(opponent).then(result => {
      setOpponent(result);
    });

    loadChatMessages().then(messages => {
      console.log(`messages`, messages);
    });
  }, [ id ]);

  const loadUserInfo = async (opponentAddress) => {
    const user = await near.mainContract.getUserInfo(opponentAddress);
    if (user) {
      return user;
    }
    return { address: opponentAddress };
  }

  const loadChatMessages = async () => {
    loadPrivateMessages(id).then(messages => {
      setMessages(transformMessages(messages, near.wallet.accountId));
      setIsReady(true);
    });
  }

  return (
    <>
      {opponent.address && (
        <MyMessagesHeader title={opponent.address} media={opponent.media}/>
      )}

      <div className={"chat-body p-4 flex-1 overflow-y-scroll"}>
        {isReady ? messages.map(message => (
            <OneMessage message={message} key={message.id}/>
          )
        ) : (
          <div className={"mx-auto w-8 pt-2"}>
            <Loader/>
          </div>
        )}
      </div>

      <WriteMessage/>
    </>
  );
};
