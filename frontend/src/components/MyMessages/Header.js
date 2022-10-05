import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";
import Button from "@mui/material/Button";
import { UserGroupAvatar } from "./UserGroupAvatar";

export const MyMessagesHeader = ({ room, title, media }) => {
  const near = useContext(NearContext);

  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-700/60">
      <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <UserGroupAvatar media={media} title={title} textSize={"text-3xl"}/>
        </div>
        <div className="text-sm">
          <p className="font-bold text-base mt-0.5">{title}</p>
          <p className={"text-gray-400"}>
            {room ? (
              `${room.members.length} members`
            ) : (
              `last message ... ago`
            )}
          </p>
        </div>
      </div>

      <div className="flex">
        <div>
          <span className={"mr-4 font-medium text-gray-200"}>
            {near.wallet.accountId}
          </span>
          <Button variant={"outlined"} onClick={() => near.wallet.signOut()}>
            SignOut
          </Button>
        </div>
      </div>
    </div>
  )
}

