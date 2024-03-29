import React, { useContext, useEffect, useState } from "react";
import MessagesHeader from "../../components/MyMessages/Chat/MessagesHeader";
import Avatar from "../../ui/Avatar";
import { NearContext } from "../../context/NearContext";
import { AiOutlineCheckCircle, AiOutlineMinusCircle, BiLinkExternal, CgDanger, GoChevronDown, IoClose } from "react-icons/all";
import { PrimaryButton, SecondaryButton } from "../../assets/css/components";
import Loader from "../../ui/Loader";
import { timestampToDate, timestampToTime } from "../../utils/datetime";
import ExportKeysPopup from "../../components/MyMessages/Dashboard/ExportKeysPopup";
import ImportKeysPopup from "../../components/MyMessages/Dashboard/ImportKeysPopup";
import { INearContext } from "../../types";
import { MessagesContext } from "./MyMessagesLayout";

const MyDashboard: React.FC = () => {
  const near: INearContext = useContext(NearContext);
  const { myProfile } = MessagesContext();
  const [ isUpgradeLoading, setIsUpgradeLoading ] = useState(0);
  const [ isMoreInfoHidden, setIsMoreInfoHidden ] = useState(true);
  const [ isWarningHidden, setIsWarningHidden ] = useState(true);
  const [ spamCount, setSpamCount ] = useState(0);
  const [ isExportPopupVisible, setIsExportPopupVisible ] = useState(false);
  const [ isImportPopupVisible, setIsImportPopupVisible ] = useState(false);

  const loadSpamCount = async () => {
    if (!near.wallet || !near.wallet.accountId) return;
    return near.mainContract?.getSpamCount(near.wallet.accountId);
  }

  const hideDashboardWarning = () => {
    setIsWarningHidden(true);
    localStorage.setItem('hideDashboardInfo', "true")
  }

  useEffect(() => {
    let isHidden = localStorage.getItem('chatme:hideDashboardWarning');
    if (!isHidden) {
      setIsWarningHidden(false);
    }

    loadSpamCount().then(result => {
      setSpamCount(parseInt(result));
    });
  }, []);

  const getLevelPrice = (level: number): number => {
    if (level === 2) {
      if (!near.account) {
        return 14;
      }
    }
    return 7;
  }

  const spamTimeLimit = (level: number): string => {
    if (level === 1) {
      return "1 minute";
    }
    return "15 seconds";
  }

  const spamMaxLimit = (level: number): string => {
    if (level === 1) {
      return "1 hour";
    }
    return "15 minutes";
  }

  const activateLevel = async (level: number) => {
    setIsUpgradeLoading(level);
    return near.mainContract?.userAccountLevelUp(getLevelPrice(level));
  }

  const BlockTitle = (
    { text, children, isRed = false }: {
      text: string, children?: React.ReactNode, isRed?: boolean
    }) => (
    <div
      className={`text-lg pb-2 mb-4 font-medium border-b flex justify-between 
        ${isRed ? "border-red-600/20 text-red-200/70" : "border-gray-700/50 text-gray-400"}`}>
      <span>{text}</span>
      {children}
    </div>
  )

  const ExternalLink = ({ text, url }: {text: string, url: string}) => (
    <a href={url} target={"_blank"} className={"block text-white hover:text-blue-300 opacity-60 hover:opacity-100 text-sm mb-1.5"}>
      <BiLinkExternal size={16} className={"dashboard-icon"}/> {text}
    </a>
  )

  const AccountLevel = (
    { level, price, children, className, isCurrent }: {
      level: string, price: string, children: React.ReactNode, className: string, isCurrent: boolean
    }) => (
    <div className={`flex-1 py-3 ${className} ${isCurrent && "bg-blue-800/5"}`}>
      <div className={"flex flex-row"}>
        <span className={"font-semibold text-lg"}>{level}</span>
        {price && (
          <small className={"font-semibold opacity-60 pt-1.5 ml-1"}> / {price}</small>
        )}
      </div>
      {children}
    </div>
  )

  return (
    <>
      <MessagesHeader/>

      <div className={"px-2 py-4 md:p-6 mb-auto lg:max-w-[1600px] overflow-y-scroll"}>
        <div className={"md:flex md:flex-row md:gap-6 mb-4 md:mb-6"}>
          <div className={"bg-[#1f2b3b] py-4 px-4 md:px-6 flex-1 rounded-lg mb-4 md:mb-6 md:mb-0"}>
            <BlockTitle text={"My Account"}>
              <a href={process.env.NEAR_SOCIAL_PROFILE_URL}
                 target={"_blank"}
                 className={"text-sm pt-1 text-blue-400 hover:text-blue-300"}>
                <span>
                  <span className={"hidden md:visible"}>Open</span> NEAR Social
                </span>
                <BiLinkExternal size={16} className={"inline ml-2 align-text-top"}/>
              </a>
            </BlockTitle>

            <div className={"flex flex-row md:mr-4 text-left"}>
              <div className={"w-20 h-20 mr-6 hidden md:block mt-2"}>
                <Avatar media={myProfile?.image} title={near.wallet?.accountId as string} textSize={"text-2xl md:text-3xl"}/>
              </div>
              <div className={"mt-1 flex flex-col"}>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Address:</span>
                  <span
                    className={"whitespace-nowrap overflow-hidden w-32 overflow-ellipsis align-bottom inline-block"}>
                    {near.wallet?.accountId}
                  </span>
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Name:</span>
                  {myProfile?.name || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Twitter:</span>
                  {myProfile?.twitter || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Github:</span>
                  {myProfile?.github || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Telegram:</span>
                  {myProfile?.telegram || "−"}
                </div>
                <div>
                  <span className={"w-20 inline-block opacity-60 text-sm"}>Website:</span>
                  {myProfile?.website || "−"}
                </div>
                {/*<div>*/}
                {/*  <span className={"w-20 inline-block opacity-60"}>About:</span>*/}
                {/*  {myProfile?.about || "−"}*/}
                {/*</div>*/}
              </div>
            </div>
          </div>

          <div className={"bg-[#1f2b3b] py-4 px-4 md:px-6 md:flex-1 rounded-lg"}>
            <BlockTitle text={"Account Keys"}/>
            <div>
              <p className={"opacity-60 text-sm"}>
                Account keys used for private conversations: each device generate it's own keys.
                To decode private messages in another device you can export/import your private keys.
              </p>
              <div className={"my-4"}>
                <SecondaryButton small="true" onClick={() => setIsExportPopupVisible(true)}>
                  Export Key
                </SecondaryButton>
                <span className={"ml-4"}>
                  <SecondaryButton small="true" onClick={() => setIsImportPopupVisible(true)}>
                    Import Key
                  </SecondaryButton>
                </span>
              </div>
              <p className={"text-sm"}>NOTE: Import function replace previous keys on your device.</p>
            </div>
          </div>
        </div>

        <div className={"mb-4 md:mb-6"}>
          <div className={"bg-[#1f2b3b] py-4 px-4 md:px-6 md:flex-1 rounded-lg"}>
            <BlockTitle text={"My Account Level"}>
                <span className={"bg-gray-700/60 rounded-full px-4 text-sm leading-7 text-white opacity-60"}>
                  <span className={"mr-1"}>Current Plan:</span>
                  {!near.account ? ("Free") : near.account.level === 1 ? "Bronze" : "Gold"}
                </span>
            </BlockTitle>
            <div className={"md:flex md:flex-row"}>
              <AccountLevel level={"Free"} price={""} isCurrent={!near.account} className={"md:border-r border-gray-700/50 px-6"}>
                <p className={"mb-1 mt-2 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Up to 5 groups or channels.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Up to 500 group members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Unlimited channels members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineMinusCircle size={16} className={"dashboard-icon"}/>
                  No Private messages encryption.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineMinusCircle size={16} className={"dashboard-icon"}/>
                  No sending NEAR tokens with message.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <CgDanger size={16} className={"dashboard-icon"}/>
                  10 reports about spam lock account.
                </p>
                {!near.account && (
                  <SecondaryButton small="true" className={"mt-4 pointer-events-none opacity-50"}>
                    Current Plan
                  </SecondaryButton>
                )}
              </AccountLevel>
              <AccountLevel level={"Bronze"} price={"7 NEAR"} isCurrent={!!near.account && near.account.level === 1}
                            className={"md:border-r border-gray-700/50 px-6"}>
                <p className={"mb-1 mt-2 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Up to 50 groups or channels.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Up to 2000 group members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Unlimited channels members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineMinusCircle size={16} className={"dashboard-icon"}/>
                  No Private messages encryption.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Send NEAR tokens with message.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Temporary lock on spam (up to 1 hour).
                </p>
                {!near.account && (
                  <PrimaryButton small="true"
                                 className={"mt-4"}
                                 disabled={isUpgradeLoading > 0}
                                 onClick={() => activateLevel(1)}>
                    Activate <small>({getLevelPrice(1)} NEAR)</small>
                    {isUpgradeLoading === 1 && (
                      <span className={"ml-2"}>
                        <Loader size={"sm"}/>
                      </span>
                    )}
                  </PrimaryButton>
                )}
                {(near.account && near.account.level === 1) && (
                  <SecondaryButton className={"mt-3 pointer-events-none opacity-50"}>Current Plan</SecondaryButton>
                )}
              </AccountLevel>
              <AccountLevel level={"Gold"} price={"14 NEAR"} isCurrent={!!near.account && near.account.level === 2} className={`px-6`}>
                <p className={"mb-1 mt-2 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Unlimited groups and channels.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Up to 5000 group members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Unlimited channels members.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Private messages encryption.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Send NEAR tokens with message.
                </p>
                <p className={"mb-1 text-sm opacity-60"}>
                  <AiOutlineCheckCircle size={16} className={"dashboard-icon"}/>
                  Temporary lock on spam (up to 15 min).
                </p>

                {(!near.account || near.account.level === 1) && (
                  <PrimaryButton small="true"
                                 className={"mt-4"}
                                 disabled={isUpgradeLoading > 0}
                                 onClick={() => activateLevel(2)}>
                    Activate <small>({getLevelPrice(2)} NEAR)</small>
                    {isUpgradeLoading === 2 && (
                      <span className={"ml-2"}>
                        <Loader size={"sm"}/>
                      </span>
                    )}
                  </PrimaryButton>
                )}
                {(near.account && near.account.level === 2) && (
                  <SecondaryButton small="true" className={"mt-4 pointer-events-none opacity-50"}>
                    Current Plan
                  </SecondaryButton>
                )}
              </AccountLevel>
            </div>
          </div>
        </div>

        {!isWarningHidden && (
          <div className={"mb-4 md:mb-6"}>
            <div className={"bg-red-600/40 px-4 md:px-6 py-4 flex-1 rounded-lg text-sm"}>
              <BlockTitle text={"Important Information"} isRed={true}>
                <IoClose size={26} className={"cursor-pointer hover:opacity-80"} onClick={() => hideDashboardWarning()}/>
              </BlockTitle>
              <p>
                <b>Do not send private information, passwords or other important information.</b> <br/>
                For private conversations, you can enable "Private Mode", but we recommend not to send any personal/sensitive content.<br/>
              </p>
              <p className={"mt-3"}>
                <span className={"mr-2"}>Read more:</span>
                <a target={"_blank"}
                   className={"text-red-100 underline"}
                   href="https://app.gitbook.com/o/ZWL77oAzm0TY0jaGJVeN/s/MDX44NNqtBur20016Wmc/chatme-web-interface/direct-messages#how-does-the-encryption-work">
                  How does the encryption work
                </a>
                <a target={"_blank"}
                   className={"ml-2 text-red-100 underline"}
                   href="https://github.com/NEARFoundation/near-js-encryption-box/issues/4">
                  Data encryption security
                </a>
              </p>
            </div>
          </div>
        )}

        {!isMoreInfoHidden ? (
          <>
            <div className={"mb-4 md:mb-6 md:flex md:flex-row md:gap-6"}>
              <div className={"bg-[#1f2b3b] px-4 md:px-6 py-4 flex-1 rounded-lg md:w-1/2 mb-6 md:mb-0"}>
                <BlockTitle text={"Account Spam Level"}/>
                <div className={"flex flex-row"}>
                  {!near.account ? (
                    <div>
                      {spamCount >= 10 ? (
                        <p className={"text-red-500 font-semibold text-xl"}>
                          Account Locked! We receive more than 10 spam reports in your messages.
                        </p>
                      ) : (
                        <p>
                          <b>Spam Level:</b>
                          <span className={"ml-4 text-lg"}>{spamCount}/10</span>
                        </p>
                      )}
                      <p className={"opacity-60 text-sm mt-2"}>
                        Account limit: 10 reports about spam in your messages. <br/>
                        You can upgrade Account Level to avoid complete lock.
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p>
                        <b>Spam Level:</b>
                        <span className={"ml-4 text-lg"}>{0} reports</span>
                      </p>

                      <p className={"opacity-60 text-sm mt-2"}>
                        Account limit: +{spamTimeLimit(near.account.level)} lock after each spam report in your messages.
                        Lock start after each spam report, up to {spamMaxLimit(near.account.level)}.
                      </p>
                      {near.account.last_spam_report > 0 && (
                        <p className={"opacity-60"}>
                          Last spam report:
                          <span className={"ml-2"}>
                        {timestampToDate(near.account.last_spam_report / 1000000)} {timestampToTime(near.account.last_spam_report / 1000000)}
                      </span>
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className={"bg-[#1f2b3b] px-4 md:px-6 py-4 flex-1 rounded-lg md:w-1/2"}>
                <BlockTitle text={"Documentation & Links"}/>
                <div className={"md:flex md:flex-row pt-2"}>
                  <div className={"flex-1"}>
                    <ExternalLink text={"Introduction"} url={"https://chatme.gitbook.io/chatme/"}/>
                    <ExternalLink text={"Web Interface"} url={"https://chatme.gitbook.io/chatme/chatme-web-interface/get-started"}/>
                    <ExternalLink text={"Get Started Integration"} url={"https://chatme.gitbook.io/chatme/documentation/get-started"}/>
                    <ExternalLink text={"Widgets (React components)"}
                                  url={"https://chatme.gitbook.io/chatme/documentation/frontend-widgets"}/>
                  </div>
                  <div className={"flex-1"}>
                    <ExternalLink text={"FAQ"} url={"/faq"}/>
                    <ExternalLink text={"Discord"} url={"https://discord.gg/pcvvn4EJpa"}/>
                    <ExternalLink text={"Twitter"} url={"https://twitter.com/chatme_near"}/>
                    <ExternalLink text={"Telegram"} url={"https://t.me/chatme_near"}/>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className={"border-t-2 border-gray-400/10 mt-8"}>
            <div onClick={() => setIsMoreInfoHidden(false)}
                 className={"-mt-3.5 bg-gray-800 hover:text-gray-400 text-gray-300 w-32 text-sm mx-auto text-center py-1 pl-3 pr-1 rounded-full cursor-pointer"}>
              <span className={"mr-2"}>Show More</span>
              <GoChevronDown className={"inline"} size={16}/>
            </div>
          </div>
        )}
      </div>

      <ExportKeysPopup isOpen={isExportPopupVisible} setIsOpen={setIsExportPopupVisible}/>
      <ImportKeysPopup isOpen={isImportPopupVisible} setIsOpen={setIsImportPopupVisible}/>
    </>
  );
};

export default MyDashboard;