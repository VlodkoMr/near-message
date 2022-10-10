import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { OwnerGroups } from "./OwnerGroups";
import { NearContext } from "../../context/NearContext";
import { loadPrivateChatsPromise, loadGroupChatsPromise } from "../../utils/requests";
import { Loader } from "../Loader";
import { timestampToDate, timestampToTime } from "../../utils/datetime";
import { Avatar } from "./Avatar";
import { AiOutlineUsergroupAdd, BsPencilSquare } from "react-icons/all";
import { NewPrivateMessagePopup } from "./NewPrivateMessagePopup";
import { CircleButton } from "../../assets/css/components";
import { NewGroupPopup } from "./NewGroupPopup";

export const LeftPanel = () => {
  const near = useContext(NearContext);
  let { id } = useParams();
  const [ isReady, setIsReady ] = useState(false);
  const [ groupsById, setGroupsById ] = useState({});
  const [ chatList, setChatList ] = useState([]);
  const [ newMessagePopupVisible, setNewMessagePopupVisible ] = useState(false);
  const [ newGroupPopupVisible, setNewGroupPopupVisible ] = useState(false);

  const loadGroupsIdList = async () => {
    return await near.mainContract.getUserGroups(near.wallet.accountId);
  }

  useEffect(() => {
    loadGroupsIdList().then(groups => {
      let promiseList = [ loadPrivateChatsPromise(near.wallet.accountId) ];
      if (groups.length) {
        setGroupListById(groups);
        promiseList.push(
          loadGroupChatsPromise(groups.map(group => group.id))
        )
      }

      Promise.all(promiseList).then(result => {
        console.log(`result`, result);
        const privateChats = result[0] || [];
        const groupChats = result[1] || [];

        let allChats = privateChats.concat(groupChats);
        allChats.sort((a, b) => b.updated_at - a.updated_at);
        setChatList(allChats);
        setIsReady(true);
      })
    });
  }, []);

  const setGroupListById = (groups) => {
    let groupsById = {};
    groups.map(group => {
      groupsById[group.id] = group;
    });
    console.log(`groupsById`, groupsById);
    setGroupsById(groupsById);
  }

  const handleSearch = () => {

  }

  const isGroupChat = (chat) => {
    return chat["__typename"] === "GroupChat";
  }

  const isSelected = (chat) => {
    return chat.id === id;
  }

  const LastGroupMessage = ({ chat }) => (
    <>
      <div className="w-16 h-16 relative flex flex-shrink-0">
        <Avatar media={groupsById[chat.id].media} title={groupsById[chat.id].title} textSize={"text-4xl"}/>
        <div className="w-6 h-6 hidden md:block group-hover:block absolute right-0 bottom-0">
          <Avatar media={"____from_user.media____"}
                  title={chat.last_message.from_address}
                  textSize={"text-sm"}/>
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
        <p className={"font-medium text-gray-50"}>{groupsById[chat.id].title}</p>
        <div className="flex items-center text-sm">
          <div className="min-w-0 flex-1">
            <p className="truncate opacity-60">{chat.last_message.text}</p>
          </div>
          <div className="ml-2 whitespace-nowrap text-right -mt-5 opacity-60">
            <p>{timestampToDate(chat.updated_at)}</p>
            <p>{timestampToTime(chat.updated_at)}</p>
          </div>
        </div>
      </div>
    </>
  )

  const LastPrivateMessage = ({ chat }) => {
    const opponent = chat.last_message.from_address === near.wallet.accountId ? chat.last_message.to_address : chat.last_message.from_address;

    return (
      <>
        <div className="w-16 h-16 relative flex flex-shrink-0">
          <Avatar media={"____opponent.media____"} title={opponent} textSize={"text-4xl"}/>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
          <p className={"font-medium text-gray-50"}>{opponent}</p>
          <div className="flex items-center text-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate opacity-60">{chat.last_message.text}</p>
            </div>
            <div className="ml-2 whitespace-nowrap text-right -mt-5 opacity-60">
              <p>{timestampToDate(chat.updated_at)}</p>
              <p>{timestampToTime(chat.updated_at)}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="header p-4 flex flex-row justify-between items-center flex-none">
        <CircleButton className={"p-2"} onClick={() => setNewGroupPopupVisible(true)}>
          <AiOutlineUsergroupAdd size={26}/>
        </CircleButton>
        <Link to={"/my"} className="text-md font-bold hidden md:block group-hover:block opacity-70 hover:opacity-100 transition">
          <img src={require("../../assets/img/logo.png")} alt="logo" className={"h-6"}/>
        </Link>
        <CircleButton className={"p-2.5"} onClick={() => setNewMessagePopupVisible(true)}>
          <BsPencilSquare size={20}/>
        </CircleButton>
      </div>

      <div className="search-box px-4 py-3 flex-none">
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
          <>
            {chatList.length > 0 ? chatList.map(chat => (
              <Link to={`/my/${isGroupChat(chat) ? "group" : "account"}/${chat.id}`}
                    key={chat.id}
                    className={`flex justify-between items-center p-2 rounded-lg relative mb-1
                  ${isSelected(chat) ? "bg-blue-500/40 text-gray-200" : "hover:bg-gray-800/60 text-gray-400"}`}>
                {(isGroupChat(chat)) ? (
                  <LastGroupMessage chat={chat}/>
                ) : (
                  <LastPrivateMessage chat={chat}/>
                )}
              </Link>
            )) : (
              <div className={"text-center text-gray-500"}>
                *no messages
              </div>
            )}
          </>
        ) : (
          <div className={`mx-auto w-8`}>
            <Loader/>
          </div>
        )}
      </div>

      <NewPrivateMessagePopup
        isOpen={newMessagePopupVisible}
        setIsOpen={setNewMessagePopupVisible}
      />
      <NewGroupPopup
        isOpen={newGroupPopupVisible}
        setIsOpen={setNewGroupPopupVisible}
      />

    </>
  );
};
