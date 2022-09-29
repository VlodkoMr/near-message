import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";

export const OwnerGroups = () => {
  const near = useContext(NearContext);


  return (
    <div className="active-users flex flex-row px-4 overflow-auto w-0 min-w-full">
      <div className="text-sm text-center mr-4">
        <button className="flex flex-shrink-0 focus:outline-none block bg-gray-800 text-gray-600 rounded-full w-16 h-16"
                type="button">
          <svg className="w-full h-full fill-current" viewBox="0 0 24 24">
            <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z"/>
          </svg>
        </button>
        <small className={"font-semibold w-16 overflow-hidden text-ellipsis block whitespace-nowrap"}>New Group</small>
      </div>

      <div className="text-sm text-center mr-2">
        <div className="border-blue-600 rounded-full">
          <div className="w-16 h-16 relative">
            <img className="shadow-md rounded-full w-full h-full object-cover"
                 src="https://randomuser.me/api/portraits/women/12.jpg"
                 alt=""
            />
          </div>
        </div>
        <small className={"font-semibold w-16 overflow-hidden text-ellipsis block whitespace-nowrap"}>GroupName</small>
      </div>

    </div>
  )
}