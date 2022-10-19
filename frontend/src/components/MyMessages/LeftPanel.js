import React, { useState } from "react";
import { Link } from "react-router-dom";
import { OwnerGroups } from "./OwnerGroups";
import { AiOutlineUsergroupAdd, BsPencilSquare } from "react-icons/all";
import { NewPrivateMessagePopup } from "./NewPrivateMessagePopup";
import { CircleButton } from "../../assets/css/components";
import { NewGroupPopup } from "./NewGroupPopup";
import { LeftPanelChats } from "./LeftPanelChats";

export const LeftPanel = () => {
  const [ newMessagePopupVisible, setNewMessagePopupVisible ] = useState(false);
  const [ newGroupPopupVisible, setNewGroupPopupVisible ] = useState(false);

  const handleSearch = () => {

  }

  return (
    <>
      <div className="header p-4 md:flex md:flex-row justify-between items-center flex-none">
        <CircleButton className={"p-2 mx-auto md:mx-0"} onClick={() => setNewGroupPopupVisible(true)}>
          <AiOutlineUsergroupAdd size={26}/>
        </CircleButton>
        <Link to={"/my"} className="text-md font-bold hidden md:block group-hover:block opacity-90 hover:opacity-100 transition">
          <img src={require("../../assets/img/logo.png")} alt="logo" className={"h-6"}/>
        </Link>
        <CircleButton className={"p-2.5 mx-auto md:mx-0 mt-2 md:mt-0"} onClick={() => setNewMessagePopupVisible(true)}>
          <BsPencilSquare size={20}/>
        </CircleButton>
      </div>

      <div className="hidden md:block search-box px-4 py-3 flex-none">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <label>
              <input
                className="rounded-full py-2 pr-6 pl-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900
                 focus:outline-none text-gray-100 focus:shadow-md transition duration-300 ease-in"
                type="text" placeholder="Search"/>
              <span className="absolute top-0 left-0 mt-2 ml-3 inline-block">
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                      <path fill="#bbb"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                  </svg>
              </span>
            </label>
          </div>
        </form>
      </div>

      <OwnerGroups/>

      <div className="contacts p-2 flex-1 overflow-y-scroll">
        <LeftPanelChats />
      </div>

      <NewPrivateMessagePopup
        isOpen={newMessagePopupVisible}
        setIsOpen={setNewMessagePopupVisible}
      />
      <NewGroupPopup
        isOpen={newGroupPopupVisible}
        setIsOpen={setNewGroupPopupVisible}
      />

    </>
  );
};
