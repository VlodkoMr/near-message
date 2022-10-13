import React from "react";
import { mediaURL } from "../../utils/transform";

export const Avatar = ({ media, title, textSize }) => (
  <div
    className="shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 text-center flex items-center
    justify-center border border-indigo-400/90 rounded-full text-white overflow-hidden">
    {media ? (
      <img src={mediaURL(media)} alt="" className={"object-cover w-full h-full"}/>
    ) : (
      <span className={`font-semibold inline-block opacity-80 ${textSize ? textSize : "text-xl"}`}>
        {title[0].toUpperCase() || ""}
      </span>
    )}
  </div>
)