import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { Loader } from "../../components/Loader";
import { NearContext } from "../../context/NearContext";

export const MyPrivateChat = () => {
  const navigate = useNavigate();
  const near = useContext(NearContext);
  const [ isReady, setIsReady ] = useState(false);
  const [ messages, setMessages ] = useState([]);
  const [ opponentAddress, setOpponentAddress ] = useState();
  const [ opponentMedia, setOpponentMedia ] = useState("");
  let { id } = useParams();

  useEffect(() => {
    const address = id.split("|");
    if (address[0] === near.wallet.accountId) {
      setOpponentAddress(address[1]);
    } else {
      setOpponentAddress(address[0]);
    }
  }, [ id ]);

  useEffect(() => {
    if (opponentAddress) {
      loadUserInfo();
    }
  }, [ opponentAddress ]);

  const loadUserInfo = async () => {
    const user = await near.mainContract.getUserInfo(opponentAddress);
    if (user) {
      setOpponentMedia(user.media);
    }
  }

  return (
    <>
      {opponentAddress && (
        <MyMessagesHeader title={opponentAddress} media={opponentMedia}/>
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
