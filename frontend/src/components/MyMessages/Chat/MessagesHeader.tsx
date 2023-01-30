import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../../../context/NearContext";
import Avatar from "../../../ui/Avatar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleButton, SecondaryButton } from "../../../assets/css/components";
import EditGroupPopup from "../EditGroupPopup";
import { HiOutlineShare, IoIosArrowDropleftCircle, MdEdit, RiLogoutCircleRLine } from "react-icons/all";
import SharePopup from "./SharePopup";
import AvatarGroup from "../../../ui/AvatarGroup";
import { isChannel, isJoinedGroup } from "../../../utils/requests";
import { IGroup, IProfile } from "../../../types";
import { MessagesContext } from "../../../pages/MyMessages/MyMessagesLayout";

type Props = {
  group?: IGroup,
  opponent?: IProfile,
  openChatsList?: () => void
};

const MessagesHeader: React.FC<Props> = ({ group, opponent, openChatsList }: Props) => {
  const near = useContext(NearContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { myProfile } = MessagesContext();
  const [ editGroupPopupVisible, setEditGroupPopupVisible ] = useState(false);
  const [ sharePopupVisible, setSharePopupVisible ] = useState(false);
  const [ isJoined, setIsJoined ] = useState(false);

  const leaveGroup = async () => {
    if (!group) return;

    navigate("/my");
    if (isChannel(group)) {
      await near.mainContract?.leaveChannel(group.id);
    } else {
      await near.mainContract?.leaveGroup(group.id);
    }
  }

  const getTitle = () => {
    if (group) {
      return group.title;
    } else if (opponent) {
      return opponent.name ? opponent.name : opponent.id;
    }
  }

  useEffect(() => {
    if (group) {
      isJoinedGroup(group, near).then(result => {
        setIsJoined(result);
      });
    }
  }, [ group ]);

  return (
    <div
      className={`chat-header px-3 py-3 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-700/30 
      bg-[#1f2b3b] md:bg-transparent`}>
      <div className="flex">
        {(group || opponent) ? (
          <>
            <div className="w-12 h-12 mr-3 relative flex flex-shrink-0 hidden md:block">
              {group && (
                <AvatarGroup
                  group={group}
                  sizeClass={"w-12 h-12"}
                />
              )}
              {opponent && (
                <Avatar media={opponent.image}
                        title={opponent.id}
                        textSize={"text-2xl md:text-3xl"}
                />
              )}
            </div>

            <div className="text-sm flex flex-row w-full">
              <div className={"md:hidden text-gray-400 mr-3 pt-2"} onClick={() => openChatsList?.()}>
                <IoIosArrowDropleftCircle size={36}/>
              </div>
              <div>
                <p className="font-medium text-base mt-0.5 address-limit">
                  {getTitle()}
                </p>
                {group && (
                  <span className={"text-gray-400/80 mr-4"}>
                    {group.members_count || "no"} member{group.members_count > 1 ? "s" : ""}
                  </span>
                )}
                {opponent && (
                  <a className={"text-gray-400/80"}
                     href={`https://explorer.${near.wallet?.network === 'testnet' ? "testnet." : ""}near.org/accounts/${opponent.id}`}
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

                  {(near.wallet && (group.owner === near.wallet.accountId || group.moderator === near.wallet.accountId)) ? (
                    <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setEditGroupPopupVisible(true)}>
                      <MdEdit size={23}/>
                    </CircleButton>
                  ) : (
                    <>
                      {isJoined && (
                        <CircleButton
                          title={"Leave"}
                          className={"p-2 mx-auto md:mx-0"}
                          onClick={() => leaveGroup()}>
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
            <p className={"text-gray-400 block"}>
              account settings & overview
            </p>
          </div>
        )}
      </div>

      <div className={`${location.pathname === "/my" ? "flex" : "hidden"} md:flex`}>
        <Link to={"/my"} className={"pt-0.5 font-medium hover:opacity-80 transition"}>
          <div className={"md:flex md:flex-row text-right md:text-left"}>
            <div className={"w-12 h-12 mr-3 hidden md:block"}>
              <Avatar media={myProfile?.image} title={near.wallet?.accountId as string}/>
            </div>
            <div className={"leading-5 mt-1 justify-center flex flex-col"}>
              {myProfile?.name ? (
                <>
                  <p className={"text-gray-100 font-medium hidden md:block w-32 mr-2 address-limit"}>{myProfile?.name}</p>
                  <small className={"block text-gray-400 w-32 address-limit"}>
                    {near.wallet?.accountId}
                  </small>
                </>
              ) : (
                <p className={"block text-gray-400/80 text-sm font-semibold w-32 mr-2 address-limit -mt-1"}>
                  {near.wallet?.accountId}
                </p>
              )}
            </div>
            <div className={"md:hidden text-red-400 text-sm"}>Sign Out</div>
          </div>
        </Link>

        <SecondaryButton small="true"
                         className={"hidden md:block my-1"}
                         onClick={() => near.wallet?.signOut()}>
          <span className={"opacity-80"}>Sign Out</span>
        </SecondaryButton>
      </div>

      {group && (
        <>
          {(near.wallet && (group.owner === near.wallet.accountId || group.moderator === near.wallet.accountId)) && (
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
};

export default MessagesHeader;