import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Layout from "./Layout";
import OnePublicChat from "../components/Home/OnePublicChat";
import { NearContext } from "../context/NearContext";
import { INearContext } from "../types";

const PublicCommunities: React.FC = () => {
  const near: INearContext = useContext(NearContext);
  const [publicGroups, setPublicGroups] = useState([]);

  const loadLastPublicChats = async () => {
    return await near.mainContract.getPublicGroups(30);
  }

  useEffect(() => {
    loadLastPublicChats().then(result => {
      if (result) {
        setPublicGroups(result);
      }
    });
  }, []);

  return (
    <Layout>

      <div className={"mt-32 mb-8 text-gray-200 container"}>
        <h1 className={"text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px] mb-4 text-center"}>
          Public Communities
        </h1>
        <p className="mb-10 text-body-color text-base text-center md:text-lg leading-relaxed md:leading-relaxed max-w-[570px] mx-auto">
          Review the list of our public communities - chats and channels.
          Join community to get latest news and messages in chatMe application.
        </p>

        <div className="flex flex-wrap mx-[-16px] text-lg my-10 text-center">
          {publicGroups.map(group => (
            <OnePublicChat key={group.id} group={group}/>
          ))}
        </div>

        <Link to={"/"}>&laquo; back</Link>
      </div>

    </Layout>
  );
};

export default PublicCommunities;