import React from "react";

type Props = {
  title: string,
  image: string
};

const TechLogo: React.FC = ({ title, image }: Props) => (
  <div target="_blank" rel="nofollow noreferrer"
       className="flex items-center justify-center
                  mx-3 sm:mx-4 xl:mx-6 2xl:mx-8 py-[15px] opacity-80 hover:opacity-100 transition">
    <img src={image} alt={title} className={"h-10 md:h-16"}/>
  </div>
);

export default TechLogo;