import React, { memo } from "react";
import { IChatInput } from "../../../../types";
import AvatarGroup from "../../../../ui/AvatarGroup";
import Avatar from "../../../../ui/Avatar";
import { decodeMessageText } from "../../../../utils/transform";
import { timestampToDate, timestampToTime } from "../../../../utils/datetime";

type Props = {
  near: any,
  groupsById: any,
  profileList: any,
  chat: IChatInput
}

const LastGroupMessage: React.FC<Props> = ({ near, groupsById, profileList, chat }: Props) => (
  <>
    <div className="w-14 h-14 md:w-16 md:h-16 relative flex flex-shrink-0">
      <AvatarGroup
        group={groupsById[chat.id]}
        sizeClass={"w-16 h-16"}
        withBorder={false}
      />
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
);

export default memo(LastGroupMessage, (prev, next) => prev.chat.updated_at === next.chat.updated_at);