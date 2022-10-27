import React from "react";
import { Link, useParams } from "react-router-dom";
import { AvatarGroup } from "../../Common/AvatarGroup";

export const OwnerGroups = ({ searchFilter, ownerGroup }) => {
  let { id } = useParams();

  return ownerGroup && ownerGroup.length > 0 && (
    <div className="active-users flex flex-row px-4 pb-3 overflow-auto w-0 min-w-full">
      {ownerGroup.filter(group => {
        if (searchFilter.length) {
          return group.title.toLowerCase().indexOf(searchFilter) !== -1;
        }
        return true;
      }).map(group => (
        <Link className="text-sm text-center mr-2"
              to={`/my/group/${group.id}`}
              key={group.id}>
          <div className={`border-2 rounded-full
            ${group.id === parseInt(id) ? "border-indigo-400/80" : "border-transparent hover:border-indigo-300/30"} 
          `}>
            <AvatarGroup group={group}/>
          </div>
          <small className={"font-semibold w-16 overflow-hidden text-ellipsis block whitespace-nowrap"}>
            {group.title}
          </small>
        </Link>
      ))}
    </div>
  )

}