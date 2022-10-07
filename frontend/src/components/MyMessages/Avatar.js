import React from "react";
import { mediaURL } from "../../utils/transform";

export const Avatar = ({ media, title, textSize }) => (
  <div
    className="shadow-md rounded-full w-full h-full bg-gray-600 text-center flex items-center justify-center border
    border-gray-500/80 rounded-full text-white overflow-hidden">
    {media ? (
      <img src={mediaURL(media)} alt="" className={"object-cover w-full h-full"}/>
    ) : (
      <span className={`font-medium inline-block opacity-50 ${textSize ? textSize : "text-xl"}`}>
        {title[0].toUpperCase()}
      </span>
    )}
  </div>
)