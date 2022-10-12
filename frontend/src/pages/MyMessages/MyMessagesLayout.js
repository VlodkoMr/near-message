import React, { useContext, useEffect, useState } from "react";
import { LeftPanel } from "../../components/MyMessages/LeftPanel";
import { NearContext } from "../../context/NearContext";
import { loadSocialProfile } from "../../utils/transform";
import { Outlet } from 'react-router-dom';

import "../../assets/css/my-messages.css"

export const MyMessagesLayout = () => {
  const near = useContext(NearContext);
  const [ myProfile, setMyProfile ] = useState({});

  useEffect(() => {
    loadSocialProfile(near.wallet.accountId, near).then(myProfile => {
      setMyProfile(myProfile);
    });
  }, []);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">

      <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-800/40 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section
              className="flex flex-col flex-none overflow-auto w-22 group lg:max-w-sm md:w-2/5  transition-all duration-300 ease-in-out">
              <LeftPanel/>
            </section>

            <section className="flex flex-col flex-auto border-2 border-gray-700/30">
              <Outlet context={[ myProfile ]}/>
            </section>
          </main>
        </div>
      </div>

    </div>
  );
};
