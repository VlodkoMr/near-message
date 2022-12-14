import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { NearContext } from "../../../context/NearContext";
import { loadPrivateChatsPromise, loadGroupChatsPromise } from "../../../utils/requests";
import { Loader } from "../../Loader";
import { timestampToDate, timestampToTime } from "../../../utils/datetime";
import { Avatar } from "../../Common/Avatar";
import { decodeMessageText, loadSocialProfiles, onlyUnique, transformOneMessage } from "../../../utils/transform";

const fetchSecondsInterval = 7;

export const LeftPanelChats = ({ searchFilter, setNewMessagePopupVisible, reloadChatList, onChatSelect }) => {
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

  const loadAllChats = () => {
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
        const privateChats = result[0] || [];
        const groupChats = result[1] || [];
        let profiles = [];
        let allChats = privateChats.concat(groupChats);

        allChats.map(chat => {
          // assign to profiles list
          if (Object.keys(chat.last_message).length) {
            chat.last_message = transformOneMessage(chat.last_message, near.wallet.accountId, false, false, false)

            profiles.push(chat.last_message.from_address);
            if (chat.last_message.to_address) {
              profiles.push(chat.last_message.to_address);
            }
          }
          return chat;
        });

        allChats.sort((a, b) => b.updated_at - a.updated_at);

        setChatList(allChats);
        setIsReady(true);

        loadSocialProfiles(profiles.filter(onlyUnique), near).then(result => {
          if (result) {
            setProfileList(result);
          }
        });
      }).finally(() => {
        setTimeout(() => {
          setReloadCounter(prev => prev + 1);
        }, 1000 * fetchSecondsInterval);
      });
    }).catch(e => {
      console.log(`Fetch error`, e);
      setIsBlockchainError(true);
    });
  }

  useEffect(() => {
    loadAllChats();
  }, [reloadCounter, reloadChatList]);

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
      <div className="w-14 h-14 md:w-16 md:h-16 relative flex flex-shrink-0">
        <Avatar media={groupsById[chat.id].image} title={groupsById[chat.id].title} textSize={"text-2xl md:text-4xl"}/>
        <div className="w-5 h-5 md:w-7 md:h-7 group-hover:block absolute right-0 bottom-0">
          <Avatar media={profileList[chat.last_message.from_address]?.image || ""}
                  title={chat.last_message.from_address}
                  textSize={"text-sm"}/>
        </div>
      </div>
      <div className="flex-auto min-w-0 ml-4 mr-2 block group-hover:block">
        <p
          className={"font-medium text-gray-50 overflow-hidden whitespace-nowrap overflow-ellipsis md:max-w-[75%]"}>
          {groupsById[chat.id].title}
        </p>
        <div className="flex items-center text-sm">
          <div className="min-w-0 flex-1">
            <p className="truncate opacity-60 overflow-hidden overflow-ellipsis max-w-[200px]">
              {decodeMessageText(chat.last_message, near.wallet.accountId)}
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
        <div className="w-14 h-14 md:w-16 md:h-16 relative flex flex-shrink-0">
          <Avatar media={profileList[chat.last_message.opponentAddress]?.image || ""}
                  title={chat.last_message.opponentAddress}
                  textSize={"text-2xl md:text-4xl"}/>
        </div>
        <div className="flex-auto min-w-0 ml-4 mr-2 block group-hover:block">
          <p className={"font-medium text-gray-50 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-[75%]"}>
            {profileList[chat.last_message.opponentAddress]?.name || chat.last_message.opponentAddress}
          </p>
          <div className="flex items-center text-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate opacity-60 overflow-hidden overflow-ellipsis max-w-[200px]">
                {decodeMessageText(chat.last_message, near.wallet.accountId)}
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
                return chat.last_message.opponentAddress.toLowerCase().indexOf(searchFilter) !== -1;
              }
            }
            return true;
          }).map(chat => (
            <Link to={`/my/${isGroupChat(chat) ? "group" : "account"}/${chat.id}`}
                  key={chat.id}
                  onClick={() => onChatSelect()}
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
              <p className={"mb-1 mt-2"}>*no chats & messages</p>
              <p>
                You can
                <span onClick={() => setNewMessagePopupVisible(true)}
                      className={"ml-1 text-blue-400 cursor-pointer hover:text-blue-300"}>
                  Send new Message
                </span>
              </p>
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
