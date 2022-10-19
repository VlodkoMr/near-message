import React from "react";
import { Link } from 'react-router-dom';
import { Layout } from "./Layout";

export const Error404 = () => {
  return (
    <Layout>

      <div className={"mt-32 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4 text-center"}>
          Error 404
        </h1>
        <div className={"text-lg mt-8 text-center "}>
          Page not found. <Link className={"underline"} to={"/"}>Return to homepage &raquo;</Link>
        </div>
      </div>

    </Layout>
  );
};
