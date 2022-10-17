import React, { useContext } from "react";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { Avatar } from "../../components/MyMessages/Avatar";
import { formatAddress } from "../../utils/transform";
import { NearContext } from "../../context/NearContext";
import { BiLinkExternal } from "react-icons/all";

export const MyDashboard = () => {
  const near = useContext(NearContext);
  const [ myProfile ] = useOutletContext();

  console.log(`myProfile`, myProfile);

  const BlockTitle = ({ text, isProfile }) => (
    <div className={"text-lg pb-2 mb-4 font-medium border-b border-gray-700/50 text-gray-400 flex justify-between"}>
      <span>{text}</span>
      {isProfile && (
        <a href={process.env.NEAR_SOCIAL_PROFILE_URL}
           target={"_blank"}
           className={"text-sm pt-1 text-blue-400 hover:text-blue-300"}>
          <span>Open NEAR Social</span>
          <BiLinkExternal size={16} className={"inline ml-2 align-text-top"}/>
        </a>
      )}
    </div>
  )

  return (
    <>
      <MessagesHeader title={""} media={""}/>
      <div className={"p-6 mb-auto"}>
        <div className={"flex flex-row gap-6 mb-6"}>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"My Account"} isProfile={true}/>

            <div className={"flex flex-row md:mr-4 text-right md:text-left"}>
              <div className={"w-24 h-24 mr-8 hidden md:block"}>
                <Avatar media={myProfile?.image} title={near.wallet.accountId} textSize={"text-3xl"}/>
              </div>
              <div className={"mt-1 flex flex-col"}>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Address:</span> {formatAddress(near.wallet.accountId)}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Name:</span> {myProfile?.name || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Twitter:</span> {myProfile?.twitter || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Github:</span> {myProfile?.github || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Telegram:</span> {myProfile?.telegram || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Website:</span> {myProfile?.website || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>About:</span> {myProfile?.about || "−"}
                </div>
              </div>
            </div>
          </div>

          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"ChatMe Account Level"}/>
            <div className={"flex flex-row"}>
              <div className={"flex-1"}>1</div>
              <div className={"flex-1"}>2</div>
              <div className={"flex-1"}>3</div>
            </div>
          </div>
        </div>

        <div className={"mb-6"}>
          {/*<div className={"mb-2 font-semibold text-gray-400/80"}>My Groups</div>*/}
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"My Groups"}/>
            <div>
              ...
            </div>
          </div>
        </div>

        <div className={"flex flex-row gap-6 mb-6"}>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"Documentation"}/>
            <div>
              1
            </div>
          </div>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"External Links"}/>
            <div>
              1
            </div>
          </div>
        </div>

        <div className={"mb-6"}>
          <div className={"mb-2 font-semibold text-red-400/80"}>Important Information!</div>
          <div className={"bg-red-700/60 py-4 px-6 flex-1 rounded-lg text-sm"}>
            <p className={"font-semibold text-gray-100/80"}>All blockchain data is publically visible!</p>
            <p>Do not send private information, passwords or other important information. </p>
          </div>
        </div>
      </div>
    </>
  );
};
