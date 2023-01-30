import React from "react";
import { Link, useParams } from "react-router-dom";
import AvatarGroup from "../../../ui/AvatarGroup";
import { IGroup } from "../../../types";

type Props = {
  searchFilter: string,
  ownerGroup: IGroup[],
  onChatSelect: () => void
};

const OwnerGroups: React.FC<Props> = ({ searchFilter, ownerGroup, onChatSelect }: Props) => {
  let { id } = useParams();

  return (
    <>
      {ownerGroup && ownerGroup.length > 0 && (
        <>
          <p className={"md:hidden text-sm font-semibold text-gray-400 text-center"}>
            My Groups/Channels
          </p>
          <div className="active-users flex flex-row px-4 pb-3 overflow-auto w-0 min-w-full">
            {ownerGroup.filter(group => {
              if (searchFilter.length) {
                return group.title.toLowerCase().indexOf(searchFilter) !== -1;
              }
              return true;
            }).map(group => (
              <Link className="text-sm text-center mr-2"
                    to={`/my/group/${group.id}`}
                    onClick={() => onChatSelect()}
                    key={group.id}>
                <div className={`border-2 rounded-full
                  ${group.id === parseInt(id as string) ? "border-indigo-400/80" : "border-transparent hover:border-indigo-300/30"} 
                `}>
                  <AvatarGroup
                    group={group}
                    sizeClass={"w-14 h-14 md:w-16 md:h-16"}
                  />
                </div>
                <small className={"font-semibold w-14 md:w-16 overflow-hidden text-ellipsis block whitespace-nowrap"}>
                  {group.title}
                </small>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  )
};

export default OwnerGroups;