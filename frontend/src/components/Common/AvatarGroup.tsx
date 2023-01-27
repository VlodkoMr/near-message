import React from "react";
import { mediaURL } from '../../utils/transform';
import logoImage from '@assets/img/user-group.png';

type Props = {
  group: IGroup,
  sizeClass: string,
  withBorder: boolean
};

const AvatarGroup: React.FC<Props> = ({ group, sizeClass, withBorder }: Props) => (
  <div className={`relative ${sizeClass} ${withBorder ? "" : "border-2 border-transparent"}`}>
    {group.image ? (
      <img className="shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 object-cover"
           src={mediaURL(group.image)}
           alt={"group"}
      />
    ) : (
      <div
        className="shadow-md w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 flex items-center justify-center rounded-full">
        <img src={logoImage} alt="" className={"object-cover w-full h-full p-3 opacity-60"}/>
      </div>
    )}
  </div>
);

export default AvatarGroup;