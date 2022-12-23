import React, { useContext, useEffect, useState } from "react";
import { LeftPanel } from "../../components/MyMessages/LeftPanel/LeftPanel";
import { NearContext } from "../../context/NearContext";
import { loadSocialProfile } from "../../utils/transform";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import "../../assets/css/my-messages.css"

const MyMessagesLayout = () => {
  const near = useContext(NearContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [myProfile, setMyProfile] = useState({});
  const [currentTab, setCurrentTab] = useState(2);
  const [leftSideVisible, setLeftSideVisible] = useState(true);

  useEffect(() => {
    loadSocialProfile(near.wallet.accountId, near).then(myProfile => {
      setMyProfile(myProfile);
    });

    // update selected tab
    if (location.pathname.indexOf("/my/group/") !== -1 || location.pathname.indexOf("/my/account/") !== -1) {
      setCurrentTab(2);
      setLeftSideVisible(false);
    } else if (location.pathname === "/my/contacts") {
      setCurrentTab(1);
      setLeftSideVisible(false);
    }
  }, []);

  const showContacts = () => {
    // setCurrentTab(1);
    // navigate("/my/contacts");
    alert("Coming soon...");
    setLeftSideVisible(false);
  }

  const showChatList = () => {
    setCurrentTab(2);
    openChatsList();
  }

  const showDashboard = () => {
    setCurrentTab(3);
    navigate("/my");
    setLeftSideVisible(false);
  }

  const onChatSelect = () => {
    setLeftSideVisible(false);
  }

  const openChatsList = () => {
    setLeftSideVisible(true);
  }

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">

      <div className="h-screen w-full flex antialiased text-gray-200 bg-[#101d2c] overflow-hidden pb-16 md:pb-0">
        <div className="flex-1 flex flex-col">
          <main className="flex-grow flex flex-row min-h-0">
            <section
              className={`${leftSideVisible ? "flex w-full absolute md:relative top-0 bottom-0 z-10 bg-[#101d2c]" : "hidden md:flex"} 
              flex-col overflow-auto group lg:max-w-sm min-w-[300px] md:w-2/5 transition-all duration-300 ease-in-out`}>
              <LeftPanel onChatSelect={onChatSelect}/>
            </section>

            <section className={`flex flex-col flex-auto border-l-2 border-gray-700/30`}>
              <Outlet context={[myProfile, openChatsList]}/>
            </section>
          </main>
        </div>

        <div
          className={`fixed gap-2 justify-between bottom-0 left-0 right-0 px-6 py-1.5 flex md:hidden h-16 bg-[#1f2b3b] border-t-2 border-gray-700/30
          ${leftSideVisible ? "z-30" : "z-20"}`}>
          <div onClick={() => showContacts()}
               className={`text-center w-1/3 leading-4 text-sm ${currentTab === 1 ? "text-blue-400" : "text-gray-400"}`}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-7 fill-current"}>
              <path
                d="M12.684 19.993C12.382 19.732 12.139 19.417 12 19V17C12.383 16.811 13.363 15.676 13.734 14.605C13.42 14.107 13.174 13.48 13.07 12.665C12.984 11.988 13.086 11.399 13.293 10.91C13.138 10.371 13 9.696 13 9C13 7.614 13.287 6.345 13.799 5.243C13.337 4.779 12.743 4.5 12 4.5C12 4.5 11.626 3 9.5 3C6.012 3 4 5.721 4 9C4 10.104 4.528 11.214 4.528 11.214C4.316 11.336 3.966 11.724 4.054 12.412C4.218 13.695 4.774 14.02 5.128 14.047C5.263 15.245 6.55 16.777 7 17V19C6 22 0 20 0 27H9C9 22.824 10.864 20.99 12.684 19.993Z"
              />
              <path
                d="M23 19V17C23.45 16.777 24.737 15.245 24.872 14.048C25.226 14.021 25.782 13.696 25.946 12.413C26.034 11.724 25.684 11.337 25.472 11.215C25.472 11.215 26 10.212 26 9.00098C26 6.57298 25.047 4.50098 23 4.50098C23 4.50098 22.626 3.00098 20.5 3.00098C17.012 2.99998 15 5.72098 15 8.99998C15 10.104 15.528 11.214 15.528 11.214C15.316 11.336 14.966 11.724 15.054 12.412C15.218 13.695 15.774 14.02 16.128 14.047C16.263 15.245 17.55 16.777 18 17V19C17 22 11 20 11 27H30C30 20 24 22 23 19Z"
              />
            </svg>
            <small>Contacts</small>
          </div>

          <div onClick={() => showChatList()}
               className={`text-center w-1/3 leading-4 text-sm mx-4 ${currentTab === 2 ? "text-blue-400" : "text-gray-400"}`}>
            <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-8 fill-current"}>
              <path d="M20 28C15.038 28 11 24.411 11 20C11 15.589 15.038 12 20 12C24.962 12 29 15.589 29 20C29 24.411 24.962 28 20 28Z"/>
              <path
                d="M3.5 24C3.77614 24 4 23.7761 4 23.5C4 23.2239 3.77614 23 3.5 23C3.22386 23 3 23.2239 3 23.5C3 23.7761 3.22386 24 3.5 24Z"/>
              <path
                d="M10 20C10 15.037 14.486 11 20 11C21.382 11 22.7 11.254 23.899 11.713C23.203 6.799 18.594 3 13 3C6.925 3 2 7.477 2 13C2 17.73 5.617 21.684 10.471 22.724C10.167 21.864 10 20.949 10 20Z"
              />
              <path
                d="M27.868 27.279C25.445 25.131 26.333 23 26.333 23L20.5 24.667C20.5 24.667 23.552 27.768 27.514 27.992L27.868 27.279Z"
              />
              <path
                d="M27.583 28C27.8133 28 28 27.8133 28 27.583C28 27.3527 27.8133 27.166 27.583 27.166C27.3527 27.166 27.166 27.3527 27.166 27.583C27.166 27.8133 27.3527 28 27.583 28Z"
              />
              <path
                d="M9.00001 20C9.00001 18.879 9.21801 17.806 9.60101 16.8L4.00001 14C4.00001 14 8.07801 19.434 3.32201 23.034L3.58301 23.99C5.85901 23.99 7.74601 22.857 9.15301 21.577C9.06101 21.062 9.00001 20.538 9.00001 20Z"
              />
            </svg>
            <small>Chats & Messages</small>
          </div>

          <div onClick={() => showDashboard()}
               className={`text-center w-1/3 leading-4 text-sm ${currentTab === 3 ? "text-blue-400" : "text-gray-400"}`}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-7 fill-current"}>
              <path
                d="M4 13h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1zm-1 7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v4zm10 0a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v7zm1-10h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1z"/>
            </svg>
            <small>Dashboard</small>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MyMessagesLayout;