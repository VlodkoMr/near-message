import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";
import { loadRoomMessages } from "../../utils/requests";
import { Loader } from "../../components/Loader";
import { OneMessage } from "../../components/MyMessages/OneMessage";
import { WriteMessage } from "../../components/MyMessages/WriteMessage";
import { NearContext } from "../../context/NearContext";

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
    loadRoomInfo().then(room => {
      console.log(`room`, room);
      setRoom(room);
    })

    loadRoomMessages().then(messages => {
      let lastMessageUser;
      messages.map((message, index) => {
        message.isFirst = lastMessageUser !== message.from_user.id;
        message.isMy = message.from_user.id !== near.wallet.accountId;
        message.isLast = !messages[index + 1] || messages[index + 1].from_user.id !== message.from_user.id;

        lastMessageUser = message.from_user.id;
        return message;
      });

      setMessages(messages);
      setIsReady(true);
      console.log(`messages`, messages);
    });
  }, []);

  // const handleSend = (e) => {
  //   e.preventDefault();
  //   if (!toAddress.length || !messageText.length) {
  //     alert('Fill all fields');
  //     return;
  //   }
  //   mainContract.sendMessage(toAddress, messageText)
  //     .then(async () => {
  //       console.log(`OK!`);
  //     })
  //     .finally(() => {
  //       console.log(`finally`);
  //       loadMessages();
  //     });
  // }

  return (
    <>
      {room && (
        <MyMessagesHeader room={room}
                          title={room.title}
                          media={room.media}
        />
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
