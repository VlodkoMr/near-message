import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NearContext } from "../../context/NearContext";
import { loadPrivateChatsPromise, loadGroupChatsPromise } from "../../utils/requests";
import { Loader } from "../Loader";
import { timestampToDate, timestampToTime } from "../../utils/datetime";
import { Avatar } from "./Avatar";
import { loadSocialProfiles, onlyUnique, transformMessageText } from "../../utils/transform";

const fetchSecondsInterval = 5;

export const LeftPanelChats = ({ searchFilter }) => {
  const near = useContext(NearContext);
  let { id } = useParams();
  const [isReady, setIsReady] = useState(false);
  const [groupsById, setGroupsById] = useState({});
  const [chatList, setChatList] = useState([]);
  const [profileList, setProfileList] = useState({});
  const [reloadCounter, setReloadCounter] = useState(0);
  const [isBlockchainError, setIsBlockchainError] = useState(false);

  const loadGroupsIdList = async () => {
    return await near.mainContract.getUserGroups(near.wallet.accountId);
  }

  useEffect(() => {
    // Fetch new chats each few seconds
    const updateInterval = setInterval(() => {
      setReloadCounter(prev => prev + 1);
    }, 1000 * fetchSecondsInterval);

    return () => {
      clearInterval(updateInterval);
    }
  }, []);

  useEffect(() => {
    loadGroupsIdList().then(groups => {
      setIsBlockchainError(false);
      let promiseList = [loadPrivateChatsPromise(near.wallet.accountId)];
      if (groups.length) {
        setGroupListById(groups);
        promiseList.push(
          loadGroupChatsPromise(groups.map(group => group.id))
        )
      }

      Promise.all(promiseList).then(result => {
        let privateChats = result[0] || [];
        const groupChats = result[1] || [];

        privateChats = privateChats.map(chat => {
          chat.opponent = chat.last_message.from_address === near.wallet.accountId ? chat.last_message.to_address : chat.last_message.from_address;
          return chat;
        })

        console.log(`privateChats`, privateChats);

        let allChats = privateChats.concat(groupChats);
        allChats.sort((a, b) => b.updated_at - a.updated_at);
        setChatList(allChats);
        setIsReady(true);

        let profiles = [];
        allChats.map(chat => {
          if (Object.keys(chat.last_message).length) {
            profiles.push(chat.last_message.from_address);
            if (chat.last_message.to_address) {
              profiles.push(chat.last_message.to_address);
            }
          }
        });
        loadSocialProfiles(profiles.filter(onlyUnique), near).then(result => {
          if (result) {
            setProfileList(result);
          }
        });
      })
    }).catch(e => {
      console.log(`Fetch error`, e);
      setIsBlockchainError(true);
    });
  }, [reloadCounter]);

  const setGroupListById = (groups) => {
    let groupsById = {};
    groups.map(group => {
      groupsById[group.id] = group;
    });
    setGroupsById(groupsById);
  }

  const isGroupChat = (chat) => {
    return chat["__typename"] === "GroupChat";
  }

  const isSelected = (chat) => {
    return chat.id === id;
  }

  const LastGroupMessage = ({ chat }) => (
    <>
      <div className="w-12 h-12 md:w-16 md:h-16 relative flex flex-shrink-0">
        <Avatar media={groupsById[chat.id].image} title={groupsById[chat.id].title} textSize={"text-4xl"}/>
        <div className="w-5 h-5 md:w-7 md:h-7 group-hover:block absolute right-0 bottom-0">
          <Avatar media={profileList[chat.last_message.from_address]?.image || ""}
                  title={chat.last_message.from_address}
                  textSize={"text-sm"}/>
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
        <p className={"font-medium text-gray-50"}>{groupsById[chat.id].title}</p>
        <div className="flex items-center text-sm">
          <div className="min-w-0 flex-1">
            <p className="truncate opacity-60 overflow-hidden overflow-ellipsis max-w-[200px]">
              {transformMessageText(chat.last_message, near.wallet.accountId)}
            </p>
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
    return (
      <>
        <div className="w-12 h-12 md:w-16 md:h-16 relative flex flex-shrink-0">
          <Avatar media={profileList[chat.opponent]?.image || ""}
                  title={chat.opponent}
                  textSize={"text-4xl"}/>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-2 hidden md:block group-hover:block">
          <p className={"font-medium text-gray-50"}>{chat.opponent}</p>
          <div className="flex items-center text-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate opacity-60 overflow-hidden overflow-ellipsis max-w-[200px]">
                {transformMessageText(chat.last_message, near.wallet.accountId)}
              </p>
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
      {isReady ? (
        <>
          {chatList.length > 0 ? chatList.filter(chat => {
            if (searchFilter.length) {
              if (isGroupChat(chat)) {
                return groupsById[chat.id].title.toLowerCase().indexOf(searchFilter) !== -1;
              } else {
                return chat.opponent.toLowerCase().indexOf(searchFilter) !== -1;
              }
            }
            return true;
          }).map(chat => (
            <Link to={`/my/${isGroupChat(chat) ? "group" : "account"}/${chat.id}`}
                  key={chat.id}
                  className={`flex justify-between items-center p-2 rounded-lg relative mb-1
                  ${isSelected(chat) ? "bg-sky-500/40 text-gray-50" : "hover:bg-gray-800/80 text-gray-400"}`}>
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
        <>
          {isBlockchainError && (
            <div className={"font-medium text-center bg-red-600 p-3 mb-4"}>
              Blockchain RPC Error, please wait.
            </div>
          )}
          <div className={`mx-auto w-8`}>
            <Loader/>
          </div>
        </>
      )}
    </>
  );
};
