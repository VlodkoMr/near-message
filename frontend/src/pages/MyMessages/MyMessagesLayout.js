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
  const [currentTab, setCurrentTab] = useState(3);
  const [leftSideVisible, setLeftSideVisible] = useState(false);

  useEffect(() => {
    loadSocialProfile(near.wallet.accountId, near).then(myProfile => {
      setMyProfile(myProfile);
    });

    // update selected tab
    if (location.pathname.indexOf("/my/group/") !== -1 || location.pathname.indexOf("/my/account/") !== -1) {
      setCurrentTab(2);
    } else if (location.pathname === "/my/contacts") {
      setCurrentTab(1);
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
          className={"fixed z-20 gap-2 justify-between bottom-0 left-0 right-0 px-6 py-1.5 flex md:hidden h-16 bg-[#1f2b3b] border-t-2 border-gray-700/30"}>
          <div onClick={() => showContacts()}
               className={`text-center w-1/3 leading-4 text-sm ${currentTab === 1 ? "text-blue-400" : "text-gray-400"}`}>
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-7 fill-current"}>
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
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-8 fill-current"}>
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
            <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className={"mx-auto h-8 w-7 fill-current"}>
              <path
                d="M27 14H26.828C26.35 14 25.924 13.663 25.848 13.191C25.811 12.962 25.767 12.735 25.716 12.511C25.61 12.047 25.874 11.578 26.313 11.396L26.469 11.331C26.979 11.12 27.222 10.535 27.01 10.024C26.799 9.514 26.214 9.271 25.703 9.483L25.543 9.549C25.102 9.732 24.582 9.584 24.329 9.179C24.207 8.983 24.079 8.791 23.945 8.603C23.668 8.215 23.732 7.679 24.069 7.342L24.191 7.22C24.582 6.829 24.582 6.196 24.191 5.806C23.8 5.415 23.167 5.415 22.777 5.806L22.656 5.93C22.319 6.267 21.783 6.331 21.395 6.054C21.207 5.92 21.015 5.792 20.819 5.67C20.414 5.418 20.266 4.897 20.449 4.456L20.515 4.296C20.726 3.786 20.484 3.201 19.974 2.989C19.464 2.778 18.879 3.02 18.667 3.53L18.602 3.686C18.42 4.125 17.951 4.389 17.487 4.283C17.263 4.232 17.036 4.188 16.807 4.151C16.337 4.076 16 3.65 16 3.172V3C16 2.448 15.552 2 15 2C14.448 2 14 2.448 14 3V3.172C14 3.65 13.663 4.076 13.191 4.152C12.962 4.189 12.735 4.233 12.511 4.284C12.047 4.39 11.578 4.126 11.396 3.687L11.331 3.531C11.12 3.021 10.535 2.778 10.024 2.99C9.514 3.201 9.271 3.786 9.483 4.297L9.549 4.457C9.733 4.897 9.586 5.418 9.18 5.67C8.984 5.792 8.792 5.92 8.605 6.053C8.217 6.33 7.681 6.267 7.344 5.93L7.222 5.808C6.831 5.417 6.198 5.417 5.808 5.808C5.418 6.199 5.418 6.832 5.808 7.222L5.93 7.344C6.267 7.681 6.33 8.216 6.053 8.605C5.92 8.792 5.792 8.984 5.67 9.18C5.418 9.586 4.897 9.733 4.456 9.55L4.296 9.484C3.786 9.273 3.201 9.515 2.989 10.025C2.778 10.535 3.02 11.12 3.53 11.332L3.686 11.397C4.125 11.579 4.389 12.048 4.283 12.512C4.232 12.736 4.188 12.963 4.151 13.192C4.076 13.663 3.65 14 3.172 14H3C2.448 14 2 14.448 2 15C2 15.552 2.448 16 3 16H3.172C3.65 16 4.076 16.337 4.152 16.809C4.189 17.038 4.233 17.265 4.284 17.489C4.39 17.953 4.126 18.422 3.687 18.604L3.531 18.669C3.021 18.88 2.778 19.465 2.99 19.976C3.201 20.486 3.786 20.729 4.297 20.517L4.457 20.451C4.898 20.268 5.418 20.416 5.671 20.821C5.793 21.017 5.921 21.209 6.055 21.397C6.332 21.785 6.268 22.321 5.931 22.658L5.809 22.78C5.418 23.171 5.418 23.804 5.809 24.194C6.2 24.584 6.833 24.585 7.223 24.194L7.345 24.072C7.682 23.735 8.218 23.671 8.606 23.948C8.794 24.082 8.986 24.21 9.182 24.332C9.587 24.584 9.735 25.105 9.552 25.546L9.486 25.706C9.275 26.216 9.517 26.801 10.027 27.013C10.537 27.224 11.122 26.982 11.334 26.472L11.399 26.316C11.581 25.877 12.05 25.613 12.514 25.719C12.738 25.77 12.965 25.814 13.194 25.851C13.663 25.924 14 26.35 14 26.828V27C14 27.552 14.448 28 15 28C15.552 28 16 27.552 16 27V26.828C16 26.35 16.337 25.924 16.809 25.848C17.038 25.811 17.265 25.767 17.489 25.716C17.953 25.61 18.422 25.874 18.604 26.313L18.669 26.469C18.88 26.979 19.465 27.222 19.976 27.01C20.486 26.799 20.729 26.214 20.517 25.703L20.451 25.543C20.268 25.102 20.416 24.582 20.821 24.329C21.017 24.207 21.209 24.079 21.397 23.945C21.785 23.668 22.321 23.732 22.658 24.069L22.78 24.191C23.171 24.582 23.804 24.582 24.194 24.191C24.584 23.8 24.585 23.167 24.194 22.777L24.072 22.655C23.735 22.318 23.671 21.782 23.948 21.394C24.082 21.206 24.21 21.014 24.332 20.818C24.584 20.413 25.105 20.265 25.546 20.448L25.706 20.514C26.216 20.725 26.801 20.483 27.013 19.973C27.224 19.463 26.982 18.878 26.472 18.666L26.316 18.601C25.877 18.419 25.613 17.95 25.719 17.486C25.77 17.262 25.814 17.035 25.851 16.806C25.924 16.337 26.35 16 26.828 16H27C27.552 16 28 15.552 28 15C28 14.448 27.552 14 27 14ZM15 23C10.582 23 7 19.418 7 15C7 10.582 10.582 7 15 7C19.418 7 23 10.582 23 15C23 19.418 19.418 23 15 23Z"
              />
              <path d="M24 14H15V16H24V14Z"/>
              <path d="M15.8662 14.4996L11.3662 6.70563L9.63421 7.70563L14.1342 15.4996L15.8662 14.4996Z"/>
              <path d="M11.3661 23.2935L16.1161 15.0665L14.3841 14.0665L9.63415 22.2935L11.3661 23.2935Z"/>
              <path
                d="M15 17C16.1046 17 17 16.1046 17 15C17 13.8954 16.1046 13 15 13C13.8954 13 13 13.8954 13 15C13 16.1046 13.8954 17 15 17Z"/>
            </svg>
            <small>Dashboard</small>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MyMessagesLayout;