import { AvatarGroup } from "../Common/AvatarGroup";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { NearContext } from "../../context/NearContext";

export const OnePublicChat = ({ group }) => {
  const near = useContext(NearContext);

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="shadow-one bg-white dark:bg-[#1D2144] rounded-md px-8 py-6 mb-8 wow fadeInUp"
           data-wow-delay=".1s"
      >
        <div className={`flex flex-row border-b border-body-color dark:border-white border-opacity-10 
      dark:border-opacity-10 pb-4 mb-4 flex-grow`}>
          <div className="flex items-center">
            <AvatarGroup group={group} size={12}/>
          </div>
          <div className="text-base text-body-color dark:text-white leading-relaxed ml-4">
            <p className={"flex max-h-10 leading-5 overflow-hidden"}>
              {near.wallet.accountId ? (
                <Link to={`/my/group/${group.id}`} className={"hover:opacity-80 transition self-end"}>
                  {group.title}
                </Link>
              ) : (
                <>{group.title}</>
              )}
            </p>
            <small className={"text-blue-100/50"}>
              {group.group_type === "Channel" ? "Channel" : "Public Group"}
            </small>
          </div>

        </div>

        <div className="flex items-center">
          <div className="w-full flex flex-row justify-between">
            <p className="text-sm text-body-color">
              {group.members_count || "no"} members
            </p>
            <p className={"text-sm text-body-color"}>
              {near.wallet.accountId ? (
                <Link to={`/my/group/${group.id}`} className={"text-blue-400 hover:text-blue-300 transition"}>
                  visit {group.group_type === "Channel" ? "channel" : "group"} &raquo;
                </Link>
              ) : (
                <>
                  connect wallet for review
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
