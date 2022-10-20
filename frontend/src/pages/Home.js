import { useContext, useEffect, useState } from "react";
import { Layout } from "./Layout";
import { NearContext } from "../context/NearContext";
import { PrimaryButton, SecondaryButton } from "../assets/css/components";
import { HiChat, HiUserGroup, ImFeed, MdChromeReaderMode, MdSecurity, SiLetsencrypt } from "react-icons/all";
import { SectionTitle } from "../components/Home/SectionTitle";
import { OneFeature } from "../components/Home/OneFeature";
import { TechCheckbox } from "../components/Home/TechCheckbox";
import { TechLogo } from "../components/Home/TechLogo";
import { PriceBlock } from "../components/Home/PriceBlock";
import { PriceBlockItem } from "../components/Home/PriceBlockItem";
import { BlogArticle } from "../components/Home/BlogArticle";
import { useLocation } from "react-router-dom";
import { animateScroll } from "react-scroll";
import { OnePublicChat } from "../components/Home/OnePublicChat";

export const Home = () => {
  const location = useLocation();
  const [ zoomTechDetails, setZoomTechDetails ] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const path = location.hash.replace('#', '');
      const element = document.getElementById(path);
      if (element) {
        const offset = element.getBoundingClientRect();
        animateScroll.scrollTo(offset.top - 100, true);
      }
    }
  }, []);

  // const PartnerLogo = ({ title, image, url }) => (
  //   <a href={url} target="_blank" rel="nofollow noreferrer"
  //      className="flex items-center justify-center lg:max-w-[130px] xl:max-w-[150px] 2xl:max-w-[160px]
  //                 mx-3 sm:mx-4 xl:mx-6 2xl:mx-8 py-[15px] grayscale hover:grayscale-0 opacity-80 hover:opacity-100
  //                 dark:opacity-80 dark:hover:opacity-100 transition">
  //     <img src={image} alt={title}/>
  //   </a>
  // )

  return (
    <Layout>
      <section
        id="home"
        className="
        relative z-10 pt-[120px] pb-[110px]
        md:pt-[150px] md:pb-[120px]
        xl:pt-[180px] xl:pb-[160px]
        2xl:pt-[210px] 2xl:pb-[200px]
      "
      >
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="max-w-[620px] wow fadeInUp"
                data-wow-delay=".2s"
              >
                <h1
                  className="
                  text-black
                  dark:text-white
                  font-bold
                  text-3xl sm:text-4xl md:text-5xl
                  leading-tight
                  sm:leading-tight
                  md:leading-tight
                  mb-5
                "
                >
                  <span className={"text-sky-500 mr-3"}>Chats & Messages</span>
                  service for NEAR Blockchain
                </h1>
                <p
                  className="
                  text-lg
                  md:text-lg
                  leading-relaxed
                  md:leading-relaxed
                  text-body-color
                  dark:text-white dark:opacity-90
                  mb-12
                "
                >
                  All-in-One solution: direct messages, channels, public and private chats. <br/>
                  You can integrate our features into your NEAR project by follow simple instructions
                  with pre-build components or call smart-contract directly
                  to send private messages, create your chats and channels.
                </p>
                <div>

                  <PrimaryButton to={"/my"}>
                    My Messages
                  </PrimaryButton>
                  <SecondaryButton to={"/my"} className={"ml-4"}>
                    Documentation
                  </SecondaryButton>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="absolute top-0 right-0 z-[-1] opacity-50">
          <svg
            width="450"
            height="556"
            viewBox="0 0 450 556"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="277" cy="63" r="225" fill="url(#paint0_linear_25:217)"/>
            <circle
              cx="17.9997"
              cy="182"
              r="18"
              fill="url(#paint1_radial_25:217)"
            />
            <circle
              cx="76.9997"
              cy="288"
              r="34"
              fill="url(#paint2_radial_25:217)"
            />
            <circle
              cx="325.486"
              cy="302.87"
              r="180"
              transform="rotate(-37.6852 325.486 302.87)"
              fill="url(#paint3_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="184.521"
              cy="315.521"
              r="132.862"
              transform="rotate(114.874 184.521 315.521)"
              stroke="url(#paint4_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="356"
              cy="290"
              r="179.5"
              transform="rotate(-30 356 290)"
              stroke="url(#paint5_linear_25:217)"
            />
            <circle
              opacity="0.8"
              cx="191.659"
              cy="302.659"
              r="133.362"
              transform="rotate(133.319 191.659 302.659)"
              fill="url(#paint6_linear_25:217)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25:217"
                x1="-54.5003"
                y1="-178"
                x2="222"
                y2="288"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <radialGradient
                id="paint1_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(17.9997 182) rotate(90) scale(18)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08"/>
              </radialGradient>
              <radialGradient
                id="paint2_radial_25:217"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(76.9997 288) rotate(90) scale(34)"
              >
                <stop offset="0.145833" stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.08"/>
              </radialGradient>
              <linearGradient
                id="paint3_linear_25:217"
                x1="226.775"
                y1="-66.1548"
                x2="292.157"
                y2="351.421"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:217"
                x1="184.521"
                y1="182.159"
                x2="184.521"
                y2="448.882"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint5_linear_25:217"
                x1="356"
                y1="110"
                x2="356"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="white" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint6_linear_25:217"
                x1="118.524"
                y1="29.2497"
                x2="166.965"
                y2="338.63"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-70">
          <svg
            width="364"
            height="201"
            viewBox="0 0 364 201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.88928 72.3303C33.6599 66.4798 101.397 64.9086 150.178 105.427C211.155 156.076 229.59 162.093 264.333 166.607C299.076 171.12 337.718 183.657 362.889 212.24"
              stroke="url(#paint0_linear_25:218)"
            />
            <path
              d="M-22.1107 72.3303C5.65989 66.4798 73.3965 64.9086 122.178 105.427C183.155 156.076 201.59 162.093 236.333 166.607C271.076 171.12 309.718 183.657 334.889 212.24"
              stroke="url(#paint1_linear_25:218)"
            />
            <path
              d="M-53.1107 72.3303C-25.3401 66.4798 42.3965 64.9086 91.1783 105.427C152.155 156.076 170.59 162.093 205.333 166.607C240.076 171.12 278.718 183.657 303.889 212.24"
              stroke="url(#paint2_linear_25:218)"
            />
            <path
              d="M-98.1618 65.0889C-68.1416 60.0601 4.73364 60.4882 56.0734 102.431C120.248 154.86 139.905 161.419 177.137 166.956C214.37 172.493 255.575 186.165 281.856 215.481"
              stroke="url(#paint3_linear_25:218)"
            />
            <circle
              opacity="0.8"
              cx="214.505"
              cy="60.5054"
              r="49.7205"
              transform="rotate(-13.421 214.505 60.5054)"
              stroke="url(#paint4_linear_25:218)"
            />
            <circle cx="220" cy="63" r="43" fill="url(#paint5_radial_25:218)"/>
            <defs>
              <linearGradient
                id="paint0_linear_25:218"
                x1="184.389"
                y1="69.2405"
                x2="184.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint1_linear_25:218"
                x1="156.389"
                y1="69.2405"
                x2="156.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint2_linear_25:218"
                x1="125.389"
                y1="69.2405"
                x2="125.389"
                y2="212.24"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint3_linear_25:218"
                x1="93.8507"
                y1="67.2674"
                x2="89.9278"
                y2="210.214"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint4_linear_25:218"
                x1="214.505"
                y1="10.2849"
                x2="212.684"
                y2="99.5816"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <radialGradient
                id="paint5_radial_25:218"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(220 63) rotate(90) scale(43)"
              >
                <stop offset="0.145833" stopColor="white" stopOpacity="0"/>
                <stop offset="1" stopColor="white" stopOpacity="0.08"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

      </section>

      <section className="bg-primary bg-opacity-[3%] pt-[100px] pb-[50px]">
        <div className="container" id="features">
          <SectionTitle title={"Main Features"}
                        text={`Best features implemented in our service for NEAR blockchain - fast, 
                      secure and cheap solution with easy integration and cross-platform communication.`}
          />

          <div className="flex flex-wrap mx-[-16px]">
            <OneFeature title={"Direct Messages"}
                        icon={<HiChat size={38}/>}
                        text={"Send messages or media files to any NEAR account for free. You pay less than 1 cent to send any message and store it in NEAR blockchain."}/>
            <OneFeature title={"Public/Private Chats"}
                        icon={<HiUserGroup size={36}/>}
                        text={"Create group chats and distribute messages for everyone in your group. Only group members can write messages."}/>
            <OneFeature title={"Public Channels"}
                        icon={<ImFeed size={36}/>}
                        text={"Broadcast your messages to general public audience and extend your community. No limit for participants!"}/>
            <OneFeature title={"Spam Protection"}
                        icon={<MdSecurity size={36}/>}
                        text={"We have multiple rules that protect our community from spam or malicious messages on smart-contract level."}/>
            <OneFeature title={"Encryption Mode"}
                        icon={<SiLetsencrypt size={34}/>}
                        text={"Write encrypted private message to any account: all your messages will be visible and decoded only for recipient account."}/>
            <OneFeature title={"Simple Integration"}
                        icon={<MdChromeReaderMode size={36}/>}
                        text={"Use ChatMe in your NEAR project and get all benefits in your application. Read documentation for more details about integration."}/>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-[100px]">
        <div className="container" id={"overview"}>
          <SectionTitle title={"Video Overview"} text={``}/>

          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[770px] h-96 bg-gray-900 rounded-md overflow-hidden wow fadeInUp text-white text-center"
                   data-wow-delay=".15s"
              >
                ___video___
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 pt-[100px] pb-20 bg-primary bg-opacity-[3%]">
        <div className="container" id="chats">
          <SectionTitle title={"Public Chats & Channels"}
                        text={`Join `}/>

          <div className="flex flex-wrap mx-[-16px]">
            <OnePublicChat/>
            <OnePublicChat/>
            <OnePublicChat/>
          </div>

          <div className={"text-gray-300/60 text-center mb-10"}>
            <b className={"mr-1.5"}>DISCLAIMER</b>
            The information presented herein has been provided by third parties and is made available solely for general
            information purposes. ChatMe does not warrant the accuracy of this information. The information should not be construed as
            professional or financial advice of any kind.
          </div>
        </div>
        <div className="absolute top-5 right-0 z-[-1]">
          <svg
            width="238"
            height="531"
            viewBox="0 0 238 531"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="422.819"
              y="-70.8145"
              width="196"
              height="541.607"
              rx="2"
              transform="rotate(51.2997 422.819 -70.8145)"
              fill="url(#paint0_linear_83:2)"
            />
            <rect
              opacity="0.3"
              x="426.568"
              y="144.886"
              width="59.7544"
              height="541.607"
              rx="2"
              transform="rotate(51.2997 426.568 144.886)"
              fill="url(#paint1_linear_83:2)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_83:2"
                x1="517.152"
                y1="-251.373"
                x2="517.152"
                y2="459.865"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint1_linear_83:2"
                x1="455.327"
                y1="-35.673"
                x2="455.327"
                y2="675.565"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute left-0 bottom-5 z-[-1]">
          <svg
            width="279"
            height="106"
            viewBox="0 0 279 106"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.5">
              <path
                d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"
                stroke="url(#paint0_linear_72:302)"
              />
              <path
                d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"
                stroke="url(#paint1_linear_72:302)"
              />
              <path
                d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"
                stroke="url(#paint2_linear_72:302)"
              />
              <path
                d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"
                stroke="url(#paint3_linear_72:302)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_72:302"
                x1="256.267"
                y1="53.6717"
                x2="-40.8688"
                y2="8.15715"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint1_linear_72:302"
                x1="256.267"
                y1="42.6717"
                x2="-40.8688"
                y2="-2.84285"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint2_linear_72:302"
                x1="256.267"
                y1="64.6717"
                x2="-40.8688"
                y2="19.1572"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
              <linearGradient
                id="paint3_linear_72:302"
                x1="256.267"
                y1="76.6717"
                x2="-40.8688"
                y2="31.1572"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0"/>
                <stop offset="1" stopColor="#4A6CF7"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section id="about" className="py-[100px] bg-primary bg-opacity-5">
        <div className="container">
          <div>
            <div className="flex flex-wrap items-center mx-[-16px]">
              <div className={`w-full px-4 ${zoomTechDetails ? "lg:w-1/3" : "lg:w-1/2"}`}>
                <div className="mb-12 lg:mb-0 max-w-[620px] wow fadeInUp" data-wow-delay=".15s">
                  <h2
                    className="text-black dark:text-white font-bold text-3xl sm:text-4xl md:text-[45px]
                    lg:text-4xl xl:text-[45px] leading-tight sm:leading-tight md:leading-tight lg:leading-tight
                    xl:leading-tight mb-6">
                    Technical Details
                  </h2>
                  <p className="font-medium text-body-color text-base leading-relaxed
                    sm:leading-relaxed mb-11"
                  >
                    Rust smart-contract create groups and channels, manage members, validate and send messages into NEAR Blockchain.
                    We don't use smart-contract data storage, that's why you don't need to pay additional fees by sending any message, only
                    transaction fee. The Graph index smart-contract logs to read and delivery your message in few seconds.
                  </p>
                  <div className="flex flex-wrap mx-[-12px]">
                    <div className="w-full px-3">
                      <TechCheckbox text={"Fast message delivery: 3-5 seconds."}/>
                      <TechCheckbox text={"No storage payments, only transaction fee ~7 TGas."}/>
                      <TechCheckbox
                        text={`<a href='https://near.social/' target='_blank' class='text-blue-300'>NEAR Social</a> 
                        integration provide more information about Accounts.`}/>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`w-full pl-8 ${zoomTechDetails ? "lg:w-2/3" : "lg:w-1/2"}`}>
                <div
                  className="text-center lg:text-right wow fadeInUp"
                  data-wow-delay=".2s"
                >
                  <img
                    src={require("../assets/img/tech-example.png")}
                    alt="about-image"
                    onClick={() => setZoomTechDetails(prev => !prev)}
                    className={`max-w-full mx-auto lg:mr-0 ${zoomTechDetails ? "cursor-zoom-out" : "cursor-zoom-in"}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mt-10">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4 bg-dark dark:bg-primary dark:bg-opacity-5 rounded-md wow fadeInUp
                py-8 px-8 sm:px-10 md:py-[40px] md:px-[50px] xl:p-[50px] 2xl:py-[60px] 2xl:px-[70px]">
              <div className="flex flex-wrap items-center justify-center" data-wow-delay=".1s">
                <TechLogo title={"NEAR"} image={require("../assets/img/logo/near.png")}/>
                <TechLogo title={"Rust"} image={require("../assets/img/logo/rust.png")}/>
                <TechLogo title={"The Graph"} image={require("../assets/img/logo/thegraph.png")}/>
                <TechLogo title={"React"} image={require("../assets/img/logo/react.png")}/>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/*<section className="pt-[100px] pb-[120px]">*/}
      {/*  <div className="container">*/}
      {/*    <div className="flex flex-wrap items-center mx-[-16px]">*/}
      {/*      <div className="w-full lg:w-1/2 px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          text-center*/}
      {/*          lg:text-left*/}
      {/*          mb-12*/}
      {/*          lg:mb-0*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*        "*/}
      {/*          data-wow-delay=".15s"*/}
      {/*        >*/}
      {/*          <img*/}
      {/*            src="images/about/about-image-2.svg"*/}
      {/*            alt="about image"*/}
      {/*            className="max-w-full mx-auto lg:ml-0"*/}
      {/*          />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="w-full lg:w-1/2 px-4">*/}
      {/*        <div className="max-w-[470px] wow fadeInUp" data-wow-delay=".2s">*/}
      {/*          <div className="mb-9">*/}
      {/*            <h3*/}
      {/*              className="*/}
      {/*              font-bold text-black*/}
      {/*              dark:text-white*/}
      {/*              text-xl*/}
      {/*              sm:text-2xl*/}
      {/*              lg:text-xl*/}
      {/*              xl:text-2xl*/}
      {/*              mb-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Bug free code*/}
      {/*            </h3>*/}
      {/*            <p*/}
      {/*              className="*/}
      {/*              text-body-color text-base*/}
      {/*              sm:text-lg*/}
      {/*              leading-relaxed*/}
      {/*              sm:leading-relaxed*/}
      {/*              font-medium*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed*/}
      {/*              do eiusmod tempor incididunt ut labore et dolore magna aliqua.*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*          <div className="mb-9">*/}
      {/*            <h3*/}
      {/*              className="*/}
      {/*              font-bold text-black*/}
      {/*              dark:text-white*/}
      {/*              text-xl*/}
      {/*              sm:text-2xl*/}
      {/*              lg:text-xl*/}
      {/*              xl:text-2xl*/}
      {/*              mb-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Premier support*/}
      {/*            </h3>*/}
      {/*            <p*/}
      {/*              className="*/}
      {/*              text-body-color text-base*/}
      {/*              sm:text-lg*/}
      {/*              leading-relaxed*/}
      {/*              sm:leading-relaxed*/}
      {/*              font-medium*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed*/}
      {/*              do eiusmod tempor incididunt.*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*          <div className="mb-1">*/}
      {/*            <h3*/}
      {/*              className="*/}
      {/*              font-bold text-black*/}
      {/*              dark:text-white*/}
      {/*              text-xl*/}
      {/*              sm:text-2xl*/}
      {/*              lg:text-xl*/}
      {/*              xl:text-2xl*/}
      {/*              mb-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Regular updates*/}
      {/*            </h3>*/}
      {/*            <p*/}
      {/*              className="*/}
      {/*              text-body-color text-base*/}
      {/*              sm:text-lg*/}
      {/*              leading-relaxed*/}
      {/*              sm:leading-relaxed*/}
      {/*              font-medium*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt*/}
      {/*              consectetur adipiscing elit setim.*/}
      {/*            </p>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section className="relative z-10 pt-[100px] pb-20">
        <div className="container" id="accounts">
          <SectionTitle title={"Account Levels"}
                        text={`You can use our service for free or increase your Account Level by your needs. 
                        You pay only once to get access to all our features forever.`}
          />

          <div className="flex flex-wrap mx-[-16px]">
            <PriceBlock plan={""} price={"Free"}
                        description={"Any NEAR Account can use our application, just don't send a spam! Perfect for individuals and small community."}>
              <PriceBlockItem text={"Create up to 5 groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 500 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"No Private messages encryption"} isOk={false}/>
              <PriceBlockItem text={"10 reports about spam in your messages lock account from sending messages"} isOk={false}/>
            </PriceBlock>
            <PriceBlock plan={"Bronze"} price={"7 NEAR"}
                        description={"Create more groups, join more group members, send encrypted private messages and avoid account lock."}>
              <PriceBlockItem text={"Create up to 50 groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 2000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 1 minute per each spam report (up to 1 hour)"} isOk={true}/>
            </PriceBlock>
            <PriceBlock plan={"Gold"} price={"14 NEAR"}
                        description={"Create unlimited groups, join more group members, send encrypted private messages and minimize account lock time."}>
              <PriceBlockItem text={"Create unlimited groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 5000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 15 sec. per each spam report (up to 15 minutes) **"} isOk={true}/>
            </PriceBlock>
          </div>

          <div className={"text-body-color text-base text-center"}>
            ** Gold account can be "Verified" to avoid any locks if you are part of NEAR ecosystem builders. <br/>
            Send us message from your official email / twitter / discord with your NEAR Address to verify your account!
          </div>
        </div>

        <div className="absolute left-0 bottom-0 z-[-1]">
          <svg
            width="239"
            height="601"
            viewBox="0 0 239 601"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-184.451"
              y="600.973"
              width="196"
              height="541.607"
              rx="2"
              transform="rotate(-128.7 -184.451 600.973)"
              fill="url(#paint0_linear_93:235)"
            />
            <rect
              opacity="0.3"
              x="-188.201"
              y="385.272"
              width="59.7544"
              height="541.607"
              rx="2"
              transform="rotate(-128.7 -188.201 385.272)"
              fill="url(#paint1_linear_93:235)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_93:235"
                x1="-90.1184"
                y1="420.414"
                x2="-90.1184"
                y2="1131.65"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint1_linear_93:235"
                x1="-159.441"
                y1="204.714"
                x2="-159.441"
                y2="915.952"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      <section className="bg-primary bg-opacity-5 pt-[100px] pb-20">
        <div className="container" id="documentation">
          <SectionTitle title={"Documentation"}
                        text={`Technical documentation for developers: integrate our service in your application. 
                        You can call our smart-contract directly, use NEAR-API-JS or install our widget with React components.`}
          />

          <div className="flex flex-wrap mx-[-16px] justify-center">
            <BlogArticle title={"General Overview"}
                         text={"Learn more about ChatMe functionality with technical details to get started application usage or integration."}
                         url={"..."}/>
            <BlogArticle title={"App Integration"}
                         text={"Integrate any part of ChatMe functionality in your application by call smart-contract or use NEAR-API-JS."}
                         url={"..."}/>
            <BlogArticle title={"Our Widgets"}
                         text={"We prepare few components for simple frontend integration: install npm package and use our React components in your application."}
                         url={"..."}/>
          </div>
        </div>
      </section>

      {/*<section id="contact" className="pt-[100px] pb-20">*/}
      {/*  <div className="container">*/}
      {/*    <div className="flex flex-wrap mx-[-16px]">*/}
      {/*      <div className="w-full lg:w-8/12 px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          bg-primary*/}
      {/*          bg-opacity-[3%]*/}
      {/*          dark:bg-opacity-10*/}
      {/*          rounded-md p-11 mb-12*/}
      {/*          lg:mb-5*/}
      {/*          sm:p-[55px]*/}
      {/*          lg:p-11*/}
      {/*          xl:p-[55px]*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*          h-full*/}
      {/*        "*/}
      {/*          data-wow-delay=".15s*/}
      {/*        "*/}
      {/*        >*/}
      {/*          <h2*/}
      {/*            className="*/}
      {/*            font-bold text-black*/}
      {/*            dark:text-white*/}
      {/*            text-2xl*/}
      {/*            sm:text-3xl*/}
      {/*            lg:text-2xl*/}
      {/*            xl:text-3xl*/}
      {/*            mb-3*/}
      {/*          "*/}
      {/*          >*/}
      {/*            Our Partners*/}
      {/*          </h2>*/}

      {/*          <div className="flex flex-wrap items-center justify-center" data-wow-delay=".1s">*/}
      {/*            <PartnerLogo title={"ZomLand"} image={require("../assets/img/logo/zomland.png")} url={"https://zomland.com"}/>*/}
      {/*          </div>*/}

      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="w-full lg:w-4/12 px-4">*/}
      {/*        <div className="relative z-10 rounded-md bg-primary bg-opacity-[3%] dark:bg-dark p-8 sm:p-11*/}
      {/*          lg:p-8 xl:p-11 wow fadeInUp" data-wow-delay=".2s">*/}
      {/*          <h3 className="text-black dark:text-white font-bold text-2xl leading-tight mb-4">*/}
      {/*            Have a question or proposal*/}
      {/*          </h3>*/}
      {/*          <p className="font-medium text-base text-body-color leading-relaxed pb-6">*/}
      {/*            Just send a message and our team will get back to you via email.*/}
      {/*          </p>*/}
      {/*          <form>*/}
      {/*            <input*/}
      {/*              type="email"*/}
      {/*              name="email"*/}
      {/*              placeholder="Your email"*/}
      {/*              className="*/}
      {/*              w-full*/}
      {/*              border*/}
      {/*              border-body-color*/}
      {/*              border-opacity-10*/}
      {/*              dark:border-white*/}
      {/*              dark:border-opacity-10*/}
      {/*              dark:bg-[#242B51]*/}
      {/*              rounded-md*/}
      {/*              py-3*/}
      {/*              px-6*/}
      {/*              font-medium*/}
      {/*              text-body-color*/}
      {/*              text-base*/}
      {/*              placeholder-body-color*/}
      {/*              outline-none*/}
      {/*              focus-visible:shadow-none*/}
      {/*              focus:border-primary focus:border-opacity-100*/}
      {/*              mb-4*/}
      {/*            "*/}
      {/*            />*/}
      {/*            <textarea*/}
      {/*              name=""*/}
      {/*              rows={4}*/}
      {/*              className="*/}
      {/*                w-full*/}
      {/*                border*/}
      {/*                border-body-color*/}
      {/*                border-opacity-10*/}
      {/*                dark:border-white*/}
      {/*                dark:border-opacity-10*/}
      {/*                dark:bg-[#242B51]*/}
      {/*                rounded-md*/}
      {/*                py-3*/}
      {/*                px-6*/}
      {/*                font-medium*/}
      {/*                text-body-color*/}
      {/*                text-base*/}
      {/*                placeholder-body-color*/}
      {/*                outline-none*/}
      {/*                focus-visible:shadow-none*/}
      {/*                focus:border-primary focus:border-opacity-100*/}
      {/*                mb-4*/}
      {/*              "*/}
      {/*              placeholder={"Message"}></textarea>*/}
      {/*            <input*/}
      {/*              type="submit"*/}
      {/*              value="Send"*/}
      {/*              className="*/}
      {/*              w-full*/}
      {/*              border*/}
      {/*              border-primary*/}
      {/*              bg-primary*/}
      {/*              rounded-md*/}
      {/*              py-3*/}
      {/*              px-6*/}
      {/*              font-medium*/}
      {/*              text-white*/}
      {/*              text-base*/}
      {/*              text-center*/}
      {/*              outline-none*/}
      {/*              cursor-pointer*/}
      {/*              focus-visible:shadow-none*/}
      {/*              hover:shadow-signUp hover:bg-opacity-80*/}
      {/*              transition duration-80 ease-in-out*/}
      {/*            "*/}
      {/*            />*/}
      {/*          </form>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

    </Layout>
  );
};
