import React from "react";
import { mediaURL } from "../../utils/transform";

export const Avatar = ({ media, title, textSize }) => (
  <div
    className="shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-400 to-blue-600 text-center flex items-center
    justify-center border border-indigo-400 rounded-full text-white overflow-hidden">
    {media ? (
      <img src={mediaURL(media)} alt="" className={"object-cover w-full h-full"}/>
    ) : (
      <span className={`font-semibold inline-block opacity-60 ${textSize ? textSize : "text-xl"}`}>
        {title[0].toUpperCase() || ""}
      </span>
    )}
  </div>
)