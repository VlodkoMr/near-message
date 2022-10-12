import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../../context/NearContext";
import logoImage from "../../assets/img/group.png";

export const OwnerGroups = () => {
  const near = useContext(NearContext);
  const [ ownerGroup, setOwnerGroups ] = useState([]);

  const loadOwnerGroups = async () => {
    const groups = await near.mainContract.getOwnerGroups(near.wallet.accountId);
    if (groups) {
      setOwnerGroups(groups);
    }
  }

  useEffect(() => {
    loadOwnerGroups();
  }, []);

  return ownerGroup && ownerGroup.length > 0 && (
    <div className="active-users flex flex-row px-4 pb-3 overflow-auto w-0 min-w-full">
      {ownerGroup.map(group => (
        <div className="text-sm text-center mr-2" key={group.id}>
          <div className="border-blue-600 rounded-full">
            <div className="w-16 h-16 relative">
              <img className="shadow-md rounded-full w-full h-full object-cover"
                   src={group.image || logoImage}
                   alt={group.id}
              />
            </div>
          </div>
          <small className={"font-semibold w-16 overflow-hidden text-ellipsis block whitespace-nowrap"}>
            {group.title}
          </small>
        </div>
      ))}
    </div>
  )

}