import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../../context/NearContext";
import logoImage from "../../assets/img/user-group.png";
import { Link, useParams } from "react-router-dom";
import { mediaURL } from "../../utils/transform";
import { AvatarGroup } from "./AvatarGroup";

export const OwnerGroups = ({ searchFilter }) => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ownerGroup, setOwnerGroups] = useState([]);

  const loadOwnerGroups = async () => {
    const groups = await near.mainContract.getOwnerGroups(near.wallet.accountId);
    if (groups) {
      setOwnerGroups(groups.reverse());
    }
  }

  useEffect(() => {
    loadOwnerGroups();
  }, []);

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