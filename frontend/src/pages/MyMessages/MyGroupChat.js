import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { loadRoomMessages } from "../../utils/requests";
import { Loader } from "../../components/Loader";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { NearContext } from "../../context/NearContext";
import { transformMessages } from "../../utils/transform";

export const MyGroupChat = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ messages, setMessages ] = useState([]);
  const [ isReady, setIsReady ] = useState(false);
  const [ room, setRoom ] = useState();

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
  }, [ id ]);

  return (
    <>
      {room && (
        <MyMessagesHeader room={room} title={room.title} media={room.media}/>
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

      {room && (
        <WriteMessage toRoom={room}/>
      )}
    </>
  );
};
