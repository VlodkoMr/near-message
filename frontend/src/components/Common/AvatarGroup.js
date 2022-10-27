import React from "react";
import { mediaURL } from "../../utils/transform";
import logoImage from "../../assets/img/user-group.png";

export const AvatarGroup = ({ group, size }) => (
  <div className={`relative w-${size || 16} h-${size || 16} ${size < 16 ? "" : "border-2 border-transparent"}`}>
    {group.image ? (
      <img className="shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 object-cover"
           src={mediaURL(group.image)}
      />
    ) : (
      <div
        className="shadow-md w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 flex items-center justify-center rounded-full">
        <img src={logoImage} alt="" className={"object-cover w-full h-full p-3 opacity-60"}/>
      </div>
    )}
  </div>
)