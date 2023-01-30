import React, { memo, useContext } from "react";
import { IChatInput, IProfile } from "../../../../types";
import Avatar from "../../../../ui/Avatar";
import { decodeMessageText } from "../../../../utils/transform";
import { timestampToDate, timestampToTime } from "../../../../utils/datetime";
import { NearContext } from "../../../../context/NearContext";

type Props = {
  profileList: Record<string, IProfile>
  chat: IChatInput
}

const LastPrivateMessage = ({ profileList, chat }: Props) => {
  const near = useContext(NearContext);

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
              {near.wallet?.accountId ? decodeMessageText(chat.last_message, near.wallet.accountId) : ""}
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
};

export default memo(LastPrivateMessage, (prev, next) => prev.chat.updated_at === next.chat.updated_at);