import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../../context/NearContext";
import logoImage from "../../assets/img/user-group.png";
import { useParams } from "react-router-dom";

export const OwnerGroups = () => {
  let { id } = useParams();
  const near = useContext(NearContext);
  const [ ownerGroup, setOwnerGroups ] = useState([]);

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
      {ownerGroup.map(group => (
        <div className="text-sm text-center mr-2" key={group.id}>
          <div className={`${group.id === id ? "border-indigo-300/80" : "border-transparent"} border-2 rounded-full`}>
            <div className="w-16 h-16 relative border-2 border-transparent">
              {group.image ? (
                <img className="shadow-md rounded-full w-full h-full object-cover" src={group.image}/>
              ) : (
                <div
                  className="shadow-md w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 flex items-center justify-center rounded-full">
                  <img src={logoImage} alt="" className={"object-cover w-full h-full p-3 opacity-80"}/>
                </div>
              )}
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