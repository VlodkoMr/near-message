import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";
import Button from "@mui/material/Button";
import { Avatar } from "./Avatar";
import { formatAddress } from "../../utils/transform";
import { Link, useOutletContext } from "react-router-dom";

export const MessagesHeader = ({ group, account }) => {
  const near = useContext(NearContext);
  const [ myProfile ] = useOutletContext();

  const getTitle = () => {
    if (group) {
      return group.title;
    }
    return account.name ? account.name : account.id;
  }

  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-700/60">
      <div className="flex">
        {group || account ? (
          <>
            <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
              <Avatar media={group ? group.media : account.image}
                      title={group ? group.title : account.id}
                      textSize={"text-3xl"}/>
            </div>
            <div className="text-sm">
              <p className="font-bold text-base mt-0.5">{getTitle()}</p>
              {group ? (
                <p className={"text-gray-400/80"}>{group.members.length} members</p>
              ) : (
                <a className={"text-gray-400/80"}
                   href={`https://explorer.${near.wallet.network === 'testnet' ? "testnet." : ""}near.org/accounts/${account.id}`}
                   target={"_blank"}>
                  {account.name ? account.id : "view account"}
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
        <Link to={"/my"} className={"mr-4 font-medium"}>
          <div className={"flex flex-row mr-4"}>
            <div className={"w-9 h-9 mr-2.5 mt-1"}>
              <Avatar media={myProfile?.image} title={near.wallet.accountId}/>
            </div>
            <div className={"leading-5 mt-1 justify-center flex flex-col"}>
              {myProfile?.name && (
                <p className={"text-gray-100"}>{myProfile?.name}</p>
              )}

              <small className={"block text-gray-400/80"}>
                {formatAddress(near.wallet.accountId)}
              </small>
            </div>
          </div>
        </Link>
        <Button variant={"outlined"} onClick={() => near.wallet.signOut()}>
          SignOut
        </Button>
      </div>
    </div>
  )
}

