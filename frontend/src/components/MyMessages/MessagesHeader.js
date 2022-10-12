import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";
import { Avatar } from "./Avatar";
import { formatAddress } from "../../utils/transform";
import { Link, useOutletContext } from "react-router-dom";
import { SecondaryButton } from "../../assets/css/components";

export const MessagesHeader = ({ group, opponent }) => {
  const near = useContext(NearContext);
  const [ myProfile ] = useOutletContext();

  const getTitle = () => {
    if (group) {
      return group.title;
    }
    return opponent.name ? opponent.name : opponent.id;
  }

  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-700/60">
      <div className="flex">
        {group || opponent ? (
          <>
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
              <Avatar media={group ? group.image : opponent.image}
                      title={group ? group.title : opponent.id}
                      textSize={"text-3xl"}/>
            </div>
            <div className="text-sm">
              <p className="font-bold text-base mt-0.5">{getTitle()}</p>
              {group ? (
                <p className={"text-gray-400/80"}>{group.members.length} members</p>
              ) : (
                <a className={"text-gray-400/80"}
                   href={`https://explorer.${near.wallet.network === 'testnet' ? "testnet." : ""}near.org/accounts/${opponent.id}`}
                   target={"_blank"}>
                  {opponent.name ? opponent.id : "view account"}
                </a>
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
        <Link to={"/my"} className={"mr-3 pt-0.5 font-medium"}>
          <div className={"flex flex-row mr-4"}>
            <div className={"w-10 h-10 mr-3 mt-1"}>
              <Avatar media={myProfile?.image} title={near.wallet.accountId}/>
            </div>
            <div className={"leading-5 mt-1 justify-center flex flex-col"}>
              {myProfile?.name ? (
                <>
                  <p className={"text-gray-100"}>{myProfile?.name}</p>
                  <small className={"block text-gray-400/80"}>
                    {formatAddress(near.wallet.accountId)}
                  </small>
                </>
              ) : (
                <p className={"block text-gray-400/80 text-sm"}>
                  {formatAddress(near.wallet.accountId)}
                </p>
              )}
            </div>
          </div>
        </Link>

        <SecondaryButton onClick={() => near.wallet.signOut()}>
          <span className={"opacity-80"}>Sign Out</span>
        </SecondaryButton>
      </div>
    </div>
  )
}

