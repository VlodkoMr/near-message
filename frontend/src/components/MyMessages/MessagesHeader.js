import React, { useContext, useState } from "react";
import { NearContext } from "../../context/NearContext";
import { Avatar } from "./Avatar";
import { formatAddress } from "../../utils/transform";
import { Link, useOutletContext } from "react-router-dom";
import { CircleButton, SecondaryButton } from "../../assets/css/components";
import { EditGroupPopup } from "./EditGroupPopup";
import {
  AiOutlineInfo,
  AiOutlineShareAlt,
  AiOutlineUsergroupAdd, BsInfo,
  FaInfo, HiOutlineInformationCircle,
  IoIosInformation,
  IoIosShareAlt,
  MdEdit,
  TiInfoLarge, TiInfoLargeOutline
} from "react-icons/all";

export const MessagesHeader = ({ group, opponent }) => {
  const near = useContext(NearContext);
  const [myProfile] = useOutletContext();
  const [editGroupPopupVisible, setEditGroupPopupVisible] = useState(false);

  const getTitle = () => {
    if (group) {
      return group.title;
    }
    return opponent.name ? opponent.name : opponent.id;
  }

  return (
    <div
      className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-700/30">
      <div className="flex">
        {group || opponent ? (
          <>
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0 hidden md:block">
              <Avatar media={group ? group.image : opponent.image}
                      title={group ? group.title : opponent.id}
                      textSize={"text-3xl"}
              />
            </div>
            <div className="text-sm flex flex-row">
              <div>
                <p className="font-medium text-base mt-0.5">{getTitle()}</p>
                {group ? (
                  <span className={"text-gray-400/80 mr-4"}>
                    {group.members_count} members
                  </span>
                ) : (
                  <a className={"text-gray-400/80"}
                     href={`https://explorer.${near.wallet.network === 'testnet' ? "testnet." : ""}near.org/accounts/${opponent.id}`}
                     target={"_blank"}>
                    {opponent.name ? opponent.id : "view account"}
                  </a>
                )}
              </div>

              {group && (
                <div className={"flex flex-row gap-2 ml-10 mt-1"}>
                  <CircleButton className={"p-1 mx-auto md:mx-0"}>
                    <BsInfo size={32}/>
                  </CircleButton>

                  {group.owner === near.wallet.accountId && (
                    <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setEditGroupPopupVisible(true)}>
                      <MdEdit size={23}/>
                    </CircleButton>
                  )}

                  <CircleButton className={"p-2 mx-auto md:mx-0"}>
                    <IoIosShareAlt size={24}/>
                  </CircleButton>
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="text-sm">
            <p className="font-bold text-base mt-0.5">My Dashboard</p>
            <p className={"text-gray-400"}>
              account settings & overview
            </p>
          </div>
        )}
      </div>

      <div className="flex">
        <Link to={"/my"} className={"mr-2 pt-0.5 font-medium hover:opacity-80 transition"}>
          <div className={"flex flex-row md:mr-4 text-right md:text-left"}>
            <div className={"w-12 h-12 mr-3 hidden md:block"}>
              <Avatar media={myProfile?.image} title={near.wallet.accountId}/>
            </div>
            <div className={"leading-5 mt-1 justify-center flex flex-col"}>
              {myProfile?.name ? (
                <>
                  <p className={"text-gray-100 font-medium"}>{myProfile?.name}</p>
                  <small className={"block text-gray-400/80"}>
                    {formatAddress(near.wallet.accountId)}
                  </small>
                </>
              ) : (
                <p className={"block text-gray-400/80 text-sm font-semibold"}>
                  {formatAddress(near.wallet.accountId)}
                </p>
              )}
            </div>
          </div>
        </Link>

        <SecondaryButton small="true" className={"hidden md:block my-1"} onClick={() => near.wallet.signOut()}>
          <span className={"opacity-80"}>Sign Out</span>
        </SecondaryButton>
      </div>

      {(group && group.owner === near.wallet.accountId) && (
        <EditGroupPopup
          isOpen={editGroupPopupVisible}
          setIsOpen={setEditGroupPopupVisible}
          group={group}
        />
      )}
    </div>
  )
}

