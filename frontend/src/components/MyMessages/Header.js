import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";
import Button from "@mui/material/Button";

export const MyMessagesHeader = () => {
  const near = useContext(NearContext);
  return (
    <div className="chat-header px-6 py-4 flex flex-row flex-none justify-between items-center shadow border-b-2 border-gray-800">
      <div className="flex">
        <div className="w-12 h-12 mr-4 relative flex flex-shrink-0">
          <img className="shadow-md rounded-full w-full h-full object-cover"
               src="https://randomuser.me/api/portraits/women/33.jpg"
               alt=""
          />
        </div>
        <div className="text-sm">
          <p className="font-bold">Scarlett Johansson</p>
          <p>Active 1h ago</p>
        </div>
      </div>

      <div className="flex">
        <div>
          <span className={"mr-4 font-medium"}>
            {near.wallet.accountId}
          </span>
          <Button variant={"outlined"} onClick={() => near.wallet.signOut()}>
            SignOut
          </Button>
        </div>
      </div>
    </div>
  )
}

