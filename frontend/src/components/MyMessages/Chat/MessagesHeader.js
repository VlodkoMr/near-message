import React, { useContext, useState } from "react";
import { NearContext } from "../../../context/NearContext";
import { Avatar } from "../../Common/Avatar";
import { formatAddress } from "../../../utils/transform";
import { Link, useOutletContext } from "react-router-dom";
import { CircleButton, SecondaryButton } from "../../../assets/css/components";
import { EditGroupPopup } from "../EditGroupPopup";
import { HiOutlineShare, IoIosShareAlt, IoMdLogOut, MdEdit, RiLogoutCircleRLine } from "react-icons/all";
import { SharePopup } from "./SharePopup";
import { AvatarGroup } from "../../Common/AvatarGroup";
import { isJoinedGroup } from "../../../utils/requests";

export const MessagesHeader = ({ group, opponent }) => {
  const near = useContext(NearContext);
  const [myProfile] = useOutletContext();
  const [editGroupPopupVisible, setEditGroupPopupVisible] = useState(false);
  const [sharePopupVisible, setSharePopupVisible] = useState(false);

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
              {group ? (
                <AvatarGroup group={group} size={14}/>
              ) : (
                <Avatar media={opponent.image}
                        title={opponent.id}
                        textSize={"text-2xl md:text-3xl"}
                />
              )}
            </div>
            <div className="text-sm flex flex-row">
              <div>
                <p className="font-medium text-base mt-0.5">{getTitle()}</p>
                {group ? (
                  <span className={"text-gray-400/80 mr-4"}>
                    {group.members_count || "no"} member{group.members_count > 1 ? "s" : ""}
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
                  {/*<CircleButton className={"p-1 mx-auto md:mx-0"}>*/}
                  {/*  <BsInfo size={32}/>*/}
                  {/*</CircleButton>*/}

                  <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setSharePopupVisible(true)}>
                    <HiOutlineShare size={23}/>
                  </CircleButton>

                  {(group.owner === near.wallet.accountId || group.moderator === near.wallet.accountId) ? (
                    <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setEditGroupPopupVisible(true)}>
                      <MdEdit size={23}/>
                    </CircleButton>
                  ) : (
                    <>
                      {isJoinedGroup(group, near) && (
                        <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setSharePopupVisible(true)}>
                          <RiLogoutCircleRLine size={23}/>
                        </CircleButton>
                      )}
                    </>
                  )}
                </div>
              )}

            </div>
          </>
        ) : (
          <div className="text-sm">
            <p className="font-bold text-base mt-0.5">My Dashboard</p>
            <p className={"text-gray-400 hidden md:block"}>
              account settings & overview
            </p>
          </div>
        )}
      </div>

      <div className="flex">
        <Link to={"/my"} className={"mr-2 pt-0.5 font-medium hover:opacity-80 transition"}>
          <div className={"md:flex md:flex-row md:mr-4 text-right md:text-left"}>
            <div className={"w-12 h-12 mr-3 hidden md:block"}>
              <Avatar media={myProfile?.image} title={near.wallet.accountId}/>
            </div>
            <div className={"leading-5 mt-1 justify-center flex flex-col"}>
              {myProfile?.name ? (
                <>
                  <p className={"text-gray-100 font-medium"}>{myProfile?.name}</p>
                  <small className={"block text-gray-400/80 w-32 whitespace-nowrap overflow-hidden overflow-ellipsis"}>
                    {near.wallet.accountId}
                  </small>
                </>
              ) : (
                <p className={"block text-gray-400/80 text-sm font-semibold w-32 whitespace-nowrap overflow-hidden overflow-ellipsis"}>
                  {near.wallet.accountId}
                </p>
              )}
            </div>
            <div className={"md:hidden text-red-400 text-sm"}>Sign Out</div>
          </div>
        </Link>

        <SecondaryButton small="true" className={"hidden md:block my-1"} onClick={() => near.wallet.signOut()}>
          <span className={"opacity-80"}>Sign Out</span>
        </SecondaryButton>
      </div>

      {group && (
        <>
          {(group.owner === near.wallet.accountId || group.moderator === near.wallet.accountId) && (
            <EditGroupPopup
              isOpen={editGroupPopupVisible}
              setIsOpen={setEditGroupPopupVisible}
              group={group}
            />
          )}

          <SharePopup
            isOpen={sharePopupVisible}
            setIsOpen={setSharePopupVisible}
            group={group}
          />
        </>
      )}

    </div>
  )
}

