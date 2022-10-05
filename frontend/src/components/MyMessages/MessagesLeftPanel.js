import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { OwnerGroups } from "./OwnerGroups";
import { NearContext } from "../../context/NearContext";
import { loadPrivateChatsPromise, loadRoomChatsPromise } from "../../utils/requests";
import { Loader } from "../Loader";
import { timestampToDate, timestampToTime } from "../../utils/format";
import { UserGroupAvatar } from "./UserGroupAvatar";

export const MessagesLeftPanel = () => {
  const near = useContext(NearContext);
  const [ isReady, setIsReady ] = useState(false);
  const [ roomsById, setRoomsById ] = useState({});
  const [ chatList, setChatList ] = useState([]);

  const loadRoomsIdList = async () => {
    return await near.mainContract.getUserRooms(near.wallet.accountId);
  }

  useEffect(() => {
    loadRoomsIdList().then(rooms => {
      let promiseList = [ loadPrivateChatsPromise(near.wallet.accountId) ];
      if (rooms.length) {
        setRoomListById(rooms);
        promiseList.push(
          loadRoomChatsPromise(rooms.map(room => room.id))
        )
      }

      Promise.all(promiseList).then(result => {
        let allChats = result[0].concat(result[1]);
        allChats.sort((a, b) => b.updated_at - a.updated_at);

        console.log(`allChats`, allChats);
        console.log(`allChats`, allChats.map(c => c["__typename"]));

        setChatList(allChats);
        setIsReady(true);
      })
    });
  }, []);

  const setRoomListById = (rooms) => {
    let roomsById = {};
    rooms.map(room => {
      roomsById[room.id] = room;
    });
    console.log(`roomsById`, roomsById);
    setRoomsById(roomsById);
  }

  const handleSearch = () => {

  }
  const isRoomChat = (chat) => {
    return chat["__typename"] === "RoomChat";
  }

  const LastRoomMessage = ({ chat }) => (
    <>
      <div className="w-16 h-16 relative flex flex-shrink-0">
        <UserGroupAvatar media={roomsById[chat.id].media} title={roomsById[chat.id].title} textSize={"text-4xl"}/>
        <div className="w-6 h-6 hidden md:block group-hover:block absolute right-0 bottom-0 border border-gray-500 rounded-full">
          <UserGroupAvatar media={chat.last_message.from_user.media}
                           title={chat.last_message.from_user.id}
                           textSize={"text-sm"}/>
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
        <p className={"font-medium"}>{roomsById[chat.id].title}</p>
        <div className="flex items-center text-sm text-gray-600">
          <div className="min-w-0 flex-1">
            <p className="truncate">{chat.last_message.text}</p>
          </div>
          <p className="ml-2 whitespace-nowrap text-right -mt-5">
            <div>{timestampToDate(chat.updated_at)}</div>
            <div>{timestampToTime(chat.updated_at)}</div>
          </p>
        </div>
      </div>
    </>
  )

  const LastPrivateMessage = ({ chat }) => {
    const opponent = chat.last_message.from_user.id === near.wallet.accountId ? chat.last_message.to_user : chat.last_message.from_user;

    return (
      <>
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <UserGroupAvatar media={opponent.media} title={opponent.id} textSize={"text-4xl"}/>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
          <p className={"font-medium"}>{opponent.id}</p>
          <div className="flex items-center text-sm text-gray-600">
            <div className="min-w-0 flex-1">
              <p className="truncate">{chat.last_message.text}</p>
            </div>
            <p className="ml-2 whitespace-nowrap text-right -mt-5">
              <div>{timestampToDate(chat.updated_at)}</div>
              <div>{timestampToTime(chat.updated_at)}</div>
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="header p-4 flex flex-row justify-between items-center flex-none">
        <Link to={"/"}
              className="w-12 h-12 relative flex flex-shrink-0 hover:bg-gray-700 bg-gray-800 rounded-full justify-center transition">
          <img src={require("../../assets/img/logo.png")} alt="logo" className={"h-6 mt-3 opacity-90"}/>
        </Link>
        <p className="text-md font-bold hidden md:block group-hover:block">NEAR Messenger</p>
        <a href="#"
           className="block rounded-full hover:bg-gray-700 bg-gray-800 w-12 h-12 p-3 hidden md:block group-hover:block ">
          <svg viewBox="0 0 24 24" className="w-full h-full fill-current">
            <path
              d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z"/>
          </svg>
        </a>
      </div>

      <div className="search-box p-4 flex-none">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <label>
              <input
                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text" placeholder="Search"/>
              <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                  </svg>
              </span>
            </label>
          </div>
        </form>
      </div>

      <OwnerGroups/>

      <div className="contacts p-2 flex-1 overflow-y-scroll">
        {isReady ? (
          chatList.map(chat => (
            <Link to={`/my/${isRoomChat(chat) ? "group" : "account"}/${chat.id}`}
                  key={chat.id}
                  className="flex justify-between items-center p-2 hover:bg-gray-800 rounded-lg relative">
              {(isRoomChat(chat)) ? (
                <LastRoomMessage chat={chat}/>
              ) : (
                <LastPrivateMessage chat={chat}/>
              )}
            </Link>
          ))
        ) : (
          <div className={`mx-auto w-8`}>
            <Loader/>
          </div>
        )}
      </div>
    </>
  );
};
