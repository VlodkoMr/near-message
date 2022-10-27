import { AvatarGroup } from "../MyMessages/AvatarGroup";
import React from "react";

export const OnePublicChat = ({ group }) => (
  <div className="w-full md:w-1/2 lg:w-1/3 px-4">
    <div className="shadow-one bg-white dark:bg-[#1D2144] rounded-md px-8 py-6 mb-10 wow fadeInUp"
         data-wow-delay=".1s"
    >
      <div className={`flex flex-row border-b border-body-color dark:border-white border-opacity-10 
      dark:border-opacity-10 pb-4 mb-4`}>
        <div className="flex items-center">
          <AvatarGroup group={group}/>
        </div>
        <div className="text-base text-body-color dark:text-white leading-relaxed ml-4">
          <p>{group.title}</p>
          <small className={"text-blue-100/50"}>
            {group.group_type === "Channel" ? "Channel" : "Public Group"}
          </small>
        </div>

      </div>

      <div className="flex items-center">
        <div className="w-full flex flex-row justify-between">
          <p className="text-sm text-body-color">
            {group.members_count} members
          </p>
          <p>
            Join
          </p>
        </div>
      </div>
    </div>
  </div>
)
