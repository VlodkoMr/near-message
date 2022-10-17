import React, { useContext, useEffect, useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";
import { Avatar } from "../../components/MyMessages/Avatar";
import { formatAddress } from "../../utils/transform";
import { NearContext } from "../../context/NearContext";
import { AiOutlineCheckCircle, AiOutlineMinusCircle, BiLinkExternal, CgDanger } from "react-icons/all";
import { PrimaryButton, SecondaryButton } from "../../assets/css/components";

export const MyDashboard = () => {
  const near = useContext(NearContext);
  const [ myProfile ] = useOutletContext();
  const [ account, setAccount ] = useState();
  const [ isReady, setIsReady ] = useState(false);

  console.log(`myProfile`, myProfile);

  const loadAccount = async () => {
    return await near.mainContract.getUserInfo(near.wallet.accountId);
  }

  const loadUserGroups = async () => {
    return await near.mainContract.getUserGroups(near.wallet.accountId);
  }

  useEffect(() => {
    loadAccount().then(result => {
      console.log(`result`, result);
      setAccount(result);
      setIsReady(true);
    })
  }, []);

  const BlockTitle = ({ text, children }) => (
    <div className={"text-lg pb-2 mb-4 font-medium border-b border-gray-700/50 text-gray-400 flex justify-between"}>
      <span>{text}</span>
      {children}
    </div>
  )
  const ExternalLink = ({ text, url }) => (
    <a href={url} target={"_blank"} className={"block text-white hover:text-blue-300 opacity-60 hover:opacity-100 text-sm"}>
      {text}
    </a>
  )

  const AccountLevel = ({ level, price, children, className }) => (
    <div className={`flex-1 pt-3 pb-1 ${className}`}>
      <div className={"flex flex-row justify-between"}>
        <span className={"font-semibold text-lg"}>{level}</span>
        <small className={"font-semibold opacity-60 pt-1"}>{price}</small>
      </div>
      {children}
    </div>
  )

  return (
    <>
      <MessagesHeader title={""} media={""}/>
      <div className={"p-6 mb-auto max-w-[1600px]"}>
        <div className={"flex flex-row gap-6 mb-6"}>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"My Account"}>
              <a href={process.env.NEAR_SOCIAL_PROFILE_URL}
                 target={"_blank"}
                 className={"text-sm pt-1 text-blue-400 hover:text-blue-300"}>
                <span>Open NEAR Social</span>
                <BiLinkExternal size={16} className={"inline ml-2 align-text-top"}/>
              </a>
            </BlockTitle>

            <div className={"flex flex-row md:mr-4 text-right md:text-left"}>
              <div className={"w-20 h-20 mr-6 hidden md:block mt-2"}>
                <Avatar media={myProfile?.image} title={near.wallet.accountId} textSize={"text-3xl"}/>
              </div>
              <div className={"mt-1 flex flex-col"}>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Address:</span>
                  {formatAddress(near.wallet.accountId)}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Name:</span>
                  {myProfile?.name || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Twitter:</span>
                  {myProfile?.twitter || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Github:</span>
                  {myProfile?.github || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Telegram:</span>
                  {myProfile?.telegram || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>Website:</span>
                  {myProfile?.website || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60"}>About:</span>
                  {myProfile?.about || "−"}
                </div>
              </div>
            </div>
          </div>

          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"My Groups"}/>
            <div>
              ...
            </div>
          </div>
        </div>

        <div className={"mb-6"}>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            {isReady && (
              <>
                <BlockTitle text={"Account Level"}>
                  <span className={"bg-gray-700 rounded-full px-4 text-sm leading-7 text-white opacity-60"}>
                    Current: {!account ? ("Free") : (
                    <>
                      ...
                    </>
                  )}
                  </span>
                </BlockTitle>
                <div className={"flex flex-row"}>
                  <AccountLevel level={"Free"} price={""} className={"border-r border-gray-700/50"}>
                    <p className={"mb-1 mt-2 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Up to 5 groups or channels
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Up to 500 group members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Unlimited channels members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineMinusCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      No Private messages encryption
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <CgDanger size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      10 reports about spam lock account
                    </p>
                    {!account && (
                      <SecondaryButton className={"mt-3"}>Current</SecondaryButton>
                    )}
                  </AccountLevel>
                  <AccountLevel level={"Bronze"} price={"7 NEAR"} className={"border-r border-gray-700/50 px-6"}>
                    <p className={"mb-1 mt-2 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Up to 50 groups or channels
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Up to 2000 group members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Unlimited channels members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Private messages encryption
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Temporary lock on spam (up to 1 hour)
                    </p>
                    {!account && (
                      <PrimaryButton className={"mt-3"}>Activate <small>(7 NEAR)</small></PrimaryButton>
                    )}
                    {(account && account.level === 1) && (
                      <SecondaryButton className={"mt-3"}>Current</SecondaryButton>
                    )}
                  </AccountLevel>
                  <AccountLevel level={"Gold"} price={"14 NEAR"} className={"pl-6"}>
                    <p className={"mb-1 mt-2 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Unlimited groups and channels
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Up to 5000 group members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Unlimited channels members
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Private messages encryption
                    </p>
                    <p className={"mb-1 text-sm opacity-60"}>
                      <AiOutlineCheckCircle size={16} className={"inline mr-1 align-text-top opacity-60"}/>
                      Temporary lock on spam (up to 15 min)
                    </p>

                    {(!account || account.level === 1) && (
                      <PrimaryButton className={"mt-3"}>Activate <small>(14 NEAR)</small></PrimaryButton>
                    )}
                    {(account && account.level === 2) && (
                      <SecondaryButton className={"mt-3"}>Current</SecondaryButton>
                    )}
                  </AccountLevel>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={"flex flex-row gap-6 mb-6"}>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"Documentation"}/>
            <div>
              <ExternalLink text={"General Overview"} url={""}/>
              <ExternalLink text={"Smart-Contract Integration"} url={""}/>
              <ExternalLink text={"NEAR-API-JS Integration"} url={""}/>
              <ExternalLink text={"Widgets (React components)"} url={""}/>
            </div>
          </div>
          <div className={"bg-gray-800 py-4 px-6 flex-1 rounded-lg"}>
            <BlockTitle text={"External Links"}/>
            <div className={"flex flex-row"}>
              <div className={"flex-1"}>
                <ExternalLink text={"Privacy Policy"} url={""}/>
                <ExternalLink text={"Terms & Conditions"} url={""}/>
                <ExternalLink text={"Contact Us"} url={""}/>
                <ExternalLink text={"NEAR Social"} url={"https://near.social/"}/>
              </div>
              <div className={"flex-1"}>
                <ExternalLink text={"Website"} url={""}/>
                <ExternalLink text={"Discord"} url={""}/>
                <ExternalLink text={"Twitter"} url={""}/>
                <ExternalLink text={"Telegram"} url={""}/>
              </div>
            </div>
          </div>
        </div>

        <div className={"mb-6"}>
          <div className={"mb-2 font-semibold text-red-400/80"}>Important Information!</div>
          <div className={"bg-red-700/60 py-4 px-6 flex-1 rounded-lg text-sm"}>
            <p className={"font-semibold text-white/80"}>All blockchain data is publically visible!</p>
            <p>Do not send private information, passwords or other important information. </p>
          </div>
        </div>
      </div>
    </>
  );
};
