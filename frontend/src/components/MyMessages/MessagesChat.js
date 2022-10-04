import React, { useContext } from "react";
import { NearContext } from "../../context/NearContext";
import Button from "@mui/material/Button";
import { OneMessage } from "./OneMessage";

export const MessagesChat = () => {
  const near = useContext(NearContext);

  return (
    <>
      <div className="chat-body p-4 flex-1 overflow-y-scroll">

        <p className="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>

        <OneMessage direction={"in"}/>

        <p className="p-4 text-center text-sm text-gray-500">SAT 2:10 PM</p>

        <OneMessage direction={"out"}/>

      </div>

      <div className="chat-footer flex-none">
        <div className="flex flex-row items-center p-4">
          {/*<button type="button"*/}
          {/*        className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">*/}
          {/*  <svg viewBox="0 0 20 20" className="w-full h-full fill-current">*/}
          {/*    <path*/}
          {/*      d="M11,13 L8,10 L2,16 L11,16 L18,16 L13,11 L11,13 Z M0,3.99406028 C0,2.8927712 0.898212381,2 1.99079514,2 L18.0092049,2 C19.1086907,2 20,2.89451376 20,3.99406028 L20,16.0059397 C20,17.1072288 19.1017876,18 18.0092049,18 L1.99079514,18 C0.891309342,18 0,17.1054862 0,16.0059397 L0,3.99406028 Z M15,9 C16.1045695,9 17,8.1045695 17,7 C17,5.8954305 16.1045695,5 15,5 C13.8954305,5 13,5.8954305 13,7 C13,8.1045695 13.8954305,9 15,9 Z"/>*/}
          {/*  </svg>*/}
          {/*</button>*/}

          <div className="relative flex-grow">
            <label>
              <input
                className="rounded-full py-2 pl-3 pr-10 w-full border border-gray-800 focus:border-gray-700 bg-gray-800 focus:bg-gray-900 focus:outline-none text-gray-200 focus:shadow-md transition duration-300 ease-in"
                type="text" placeholder="Aa"/>
              <button type="button"
                      className="absolute top-0 right-0 mt-2 mr-3 flex flex-shrink-0 focus:outline-none block text-blue-600 hover:text-blue-700 w-6 h-6">
                <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
                  <path
                    d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm2.16 3a6 6 0 0 1-11.32 0h11.32z"/>
                </svg>
              </button>
            </label>
          </div>
          <button type="button"
                  className="flex flex-shrink-0 focus:outline-none mx-2 block text-blue-600 hover:text-blue-700 w-6 h-6">
            <svg viewBox="0 0 20 20" className="w-full h-full fill-current">
              <path
                d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z"/>
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
