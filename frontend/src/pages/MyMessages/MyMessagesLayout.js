import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom';
import { LeftPanel } from "../../components/MyMessages/LeftPanel";

import "../../assets/css/my-messages.css"
import { NearContext } from "../../context/NearContext";

export const MyMessagesLayout = () => {
  const near = useContext(NearContext);

  useEffect(() => {

  }, []);

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-700">

      <div className="h-screen w-full flex antialiased text-gray-200 bg-gray-900/80 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section
              className="flex flex-col flex-none overflow-auto w-24 group lg:max-w-sm md:w-2/5 transition-all duration-300 ease-in-out">
              <LeftPanel/>
            </section>

            <section className="flex flex-col flex-auto border-l border-gray-700/60">

              <Outlet/>

            </section>
          </main>
        </div>
      </div>

    </div>
  );
};
