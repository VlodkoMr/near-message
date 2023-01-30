import React from "react";
import { socialMediaURL } from "../utils/transform";

type Props = {
  media?: string,
  title: string,
  textSize?: string
}

const Avatar: React.FC<Props> = ({ media, title, textSize }: Props) => (
  <div
    className={`shadow-md rounded-full w-full h-full bg-gradient-to-b from-indigo-300/90 to-blue-500/90 text-center flex items-center
    justify-center border border-indigo-300/60 rounded-full text-white overflow-hidden`}>
    {media ? (
      <img src={socialMediaURL(media)} alt="" className={"object-cover w-full h-full"}/>
    ) : (
      <span className={`font-semibold inline-block opacity-60 ${textSize ? textSize : "text-lg md:text-xl"}`}>
        {title[0].toUpperCase() || ""}
      </span>
    )}
  </div>
);

export default Avatar;