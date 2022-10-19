import React from "react";
import { useNavigate } from 'react-router-dom';
import { Layout } from "./Layout";

export const Privacy = () => {
  const navigate = useNavigate();


  return (
    <Layout>

      <div className={"mt-32 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4 text-center"}>
          Privacy Policy
        </h1>
        <div className={"text-base mt-8"}>
          (text coming soon)
        </div>
      </div>

    </Layout>
  );
};
