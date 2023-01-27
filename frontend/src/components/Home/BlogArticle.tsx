import React from "react";

type Props = {
  title: string,
  text: string,
  url: string
};

const BlogArticle: React.FC<Props> = ({ title, text, url }: Props) => (
  <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4">
    <div className="relative bg-white dark:bg-dark shadow-one rounded-md overflow-hidden mb-5 md:mb-10 wow fadeInUp"
         data-wow-delay=".1s">
      <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <a href={url}
             target={"_blank"}
             className="font-bold text-black dark:text-white text-xl sm:text-2xl block mb-4 hover:text-blue-500 dark:hover:text-blue-500 cursor-pointer">
            {title}
          </a>
        </h3>
        <p className="text-base text-body-color font-medium mb-4">
          {text}
        </p>
        <a href={url} className={"block text-right text-blue-400 hover:text-blue-300"} target={"_blank"}>read more &raquo;</a>
      </div>
    </div>
  </div>
);

export default BlogArticle;