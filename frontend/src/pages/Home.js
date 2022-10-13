import { useContext, useEffect } from "react";
import { Layout } from "./Layout";
import { NearContext } from "../context/NearContext";
import { PrimaryButton, SecondaryButton } from "../assets/css/components";
import { HiChat, HiUserGroup, ImFeed, MdChromeReaderMode, MdSecurity, SiLetsencrypt } from "react-icons/all";

export const Home = () => {
  const near = useContext(NearContext);

  useEffect(() => {
    console.log(`near`, near);
  }, [ near ])

  const OneFeature = ({ title, icon, text }) => (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="mb-[70px] wow fadeInUp text-center" data-wow-delay=".15s">
        <div
          className="w-[80px] h-[80px] flex items-center justify-center mx-auto rounded-full bg-primary
          bg-opacity-10 mb-6 text-primary"
        >
          {icon}
        </div>
        <h3 className="font-bold text-black dark:text-white text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-5">
          {title}
        </h3>
        <p className="text-body-color text-base leading-relaxed font-medium px-8">
          {text}
        </p>
      </div>
    </div>
  )

  const PriceBlockItem = ({ text, isOk }) => (
    <div className="flex items-center mb-3">
      <span className="bg-primary bg-opacity-10 text-primary max-w-[18px] w-full h-[18px] mr-3 flex items-center
        justify-center rounded-full">
        {isOk ? (
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            className="fill-current"
          >
            <path
              d="M2.90567 6.00024C2.68031 6.00024 2.48715 5.92812 2.294 5.74764L0.169254 3.43784C-0.0560926 3.18523 -0.0560926 2.78827 0.169254 2.53566C0.39461 2.28298 0.74873 2.28298 0.974086 2.53566L2.90567 4.66497L7.02642 0.189715C7.25175 -0.062913 7.60585 -0.062913 7.83118 0.189715C8.0566 0.442354 8.0566 0.839355 7.83118 1.09198L3.54957 5.78375C3.32415 5.92812 3.09882 6.00024 2.90567 6.00024Z"
            />
          </svg>
        ) : (
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            className="fill-current stroke-current"
          >
            <path
              d="M1.40102 0.95486C1.27421 0.828319 1.07219 0.828354 0.945421 0.954965C0.818519 1.08171 0.818519 1.28389 0.945421 1.41063L0.945612 1.41083L3.54915 4.00184L0.955169 6.60202C0.955106 6.60209 0.95504 6.60215 0.954978 6.60222C0.828263 6.72897 0.82833 6.93101 0.955169 7.05769C1.01288 7.11533 1.09989 7.15024 1.17815 7.15024C1.25641 7.15024 1.34342 7.11533 1.40113 7.05769L1.29513 6.95156L1.40113 7.05769L4.00493 4.45706L6.59917 7.0575L6.59936 7.05769C6.65707 7.11533 6.74408 7.15024 6.82234 7.15024C6.9006 7.15024 6.98761 7.11533 7.04532 7.05769C7.17215 6.93102 7.17222 6.729 7.04553 6.60224C7.04546 6.60217 7.04539 6.6021 7.04532 6.60202L4.46051 4.00165L7.05507 1.4009C7.05511 1.40085 7.05516 1.4008 7.05521 1.40076L7.05526 1.40071L6.94907 1.29477L1.40102 0.95486ZM1.40102 0.95486C1.40106 0.954895 1.40109 0.95493 1.40113 0.954965L1.40102 0.95486Z"
              strokeWidth="0.3"
            />
          </svg>
        )}
      </span>
      <p className="text-base font-medium text-body-color m-0">
        {text}
      </p>
    </div>
  )

  const PriceBlock = ({ price, plan, description, children }) => (
    <div className="w-full md:w-1/2 lg:w-1/3 px-4">
      <div className="relative z-10 bg-white dark:bg-[#1D2144] shadow-signUp px-8 py-10 rounded-md mb-10 wow fadeInUp"
           data-wow-delay=".1s">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-black dark:text-white text-3xl mb-2 price">
            <span className="amount">{price}</span>
          </h3>
          <h4 className="text-white font-bold text-xl mb-2 text-white/70">{plan}</h4>
        </div>
        <p className="text-base text-body-color mb-7">
          {description}
        </p>
        <div className="border-b border-body-color dark:border-white border-opacity-10 dark:border-opacity-10 pb-8 mb-8">
          <a className="font-semibold text-base text-white bg-primary w-full flex items-center justify-center rounded-md p-3
                    hover:shadow-signUp hover:bg-opacity-80 transition duration-300 ease-in-out">
            Start Free Trial
          </a>
        </div>
        <div>
          {children}
        </div>
        <div className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="179"
            height="158"
            viewBox="0 0 179 158"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M75.0002 63.256C115.229 82.3657 136.011 137.496 141.374 162.673C150.063 203.47 207.217 197.755 202.419 167.738C195.393 123.781 137.273 90.3579 75.0002 63.256Z"
              fill="url(#paint0_linear_70:153)"
            />
            <path
              opacity="0.3"
              d="M178.255 0.150879C129.388 56.5969 134.648 155.224 143.387 197.482C157.547 265.958 65.9705 295.709 53.1024 246.401C34.2588 174.197 100.939 83.7223 178.255 0.150879Z"
              fill="url(#paint1_linear_70:153)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_70:153"
                x1="69.6694"
                y1="29.9033"
                x2="196.108"
                y2="83.2919"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
              <linearGradient
                id="paint1_linear_70:153"
                x1="165.348"
                y1="-75.4466"
                x2="-3.75136"
                y2="103.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62"/>
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )

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
                  All-in-One solution: private messages, channels, public and private chats. <br/>
                  Our application collect all conversation in one place, integrate your NEAR project
                  by follow simple instructions with pre-build components or call our smart-contract directly
                  to send messages or create your chats.
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

      <section
        id="features"
        className="bg-primary bg-opacity-[3%] pt-[120px] pb-[50px]"
      >
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                mx-auto max-w-[570px] text-center mb-[100px]
                wow
                fadeInUp
              "
                data-wow-delay=".1s"
              >
                <h2
                  className="
                  text-black
                  dark:text-white
                  font-bold text-3xl
                  sm:text-4xl
                  md:text-[45px]
                  mb-4
                "
                >
                  Main Features
                </h2>
                <p
                  className="
                  text-body-color text-base
                  md:text-lg
                  leading-relaxed
                  md:leading-relaxed
                "
                >
                  Best features implemented in our service for NEAR blockchain - fast, secure and cheap solution that allow easy integration
                  and cross-platform communication.
                </p>
              </div>
            </div>
          </div>

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

      <section className="relative z-10 py-[120px]">
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                mx-auto max-w-[570px] text-center mb-20
                wow
                fadeInUp
              "
                data-wow-delay=".1s"
              >
                <h2
                  className="
                  text-black
                  dark:text-white
                  font-bold text-3xl
                  sm:text-4xl
                  md:text-[45px]
                  mb-4
                "
                >
                  We are ready to help
                </h2>
                <p
                  className="
                  text-body-color text-base
                  md:text-lg
                  leading-relaxed
                  md:leading-relaxed
                "
                >
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                mx-auto max-w-[770px] rounded-md overflow-hidden
                wow
                fadeInUp
              "
                data-wow-delay=".15s"
              >
                <div className="relative items-center justify-center">
                  <img
                    src="images/video/video.jpg"
                    alt="video image"
                    className="w-full h-full object-cover object-center"
                  />
                  <div
                    className="
                    absolute
                    w-full
                    h-full
                    top-0
                    right-0
                    flex
                    items-center
                    justify-center
                  "
                  >
                    <a
                      className="
                      glightbox
                      w-[70px]
                      h-[70px]
                      rounded-full
                      flex
                      items-center
                      justify-center
                      bg-white
                      bg-opacity-75
                      text-primary
                      hover:bg-opacity-100
                      transition
                    "
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path
                          d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-[-1]">
          <img src="images/video/shape.svg" alt="shape" className="w-full"/>
        </div>
      </section>

      <section className="pt-16">
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                bg-dark
                dark:bg-primary dark:bg-opacity-5
                rounded-md
                flex
                flex-wrap
                items-center
                justify-center
                py-8
                px-8
                sm:px-10
                md:py-[40px] md:px-[50px]
                xl:p-[50px]
                2xl:py-[60px] 2xl:px-[70px]
                wow
                fadeInUp
              "
                data-wow-delay=".1s
              "
              >
                <a
                  href="https://uideck.com"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="
                  flex items-center justify-center
                  lg:max-w-[130px]
                  xl:max-w-[150px]
                  2xl:max-w-[160px]
                  mx-3
                  sm:mx-4
                  xl:mx-6
                  2xl:mx-8
                  py-[15px] grayscale
                  hover:grayscale-0
                  opacity-70
                  hover:opacity-100
                  dark:opacity-60 dark:hover:opacity-100
                  transition
                "
                >
                  <img src="images/brands/uideck.svg" alt="uideck"/>
                </a>
                <a
                  href="https://tailgrids.com"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="
                  flex items-center justify-center
                  lg:max-w-[130px]
                  xl:max-w-[150px]
                  2xl:max-w-[160px]
                  mx-3
                  sm:mx-4
                  xl:mx-6
                  2xl:mx-8
                  py-[15px] grayscale
                  hover:grayscale-0
                  opacity-70
                  hover:opacity-100
                  dark:opacity-60 dark:hover:opacity-100
                  transition
                "
                >
                  <img src="images/brands/tailgrids.svg" alt="tailgrids"/>
                </a>
                <a
                  href="https://lineicons.com"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="
                  flex items-center justify-center
                  lg:max-w-[130px]
                  xl:max-w-[150px]
                  2xl:max-w-[160px]
                  mx-3
                  sm:mx-4
                  xl:mx-6
                  2xl:mx-8
                  py-[15px] grayscale
                  hover:grayscale-0
                  opacity-70
                  hover:opacity-100
                  dark:opacity-60 dark:hover:opacity-100
                  transition
                "
                >
                  <img src="images/brands/lineicons.svg" alt="lineicons"/>
                </a>
                <a
                  href="https://ayroui.com"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="
                  flex items-center justify-center
                  lg:max-w-[130px]
                  xl:max-w-[150px]
                  2xl:max-w-[160px]
                  mx-3
                  sm:mx-4
                  xl:mx-6
                  2xl:mx-8
                  py-[15px] grayscale
                  hover:grayscale-0
                  opacity-70
                  hover:opacity-100
                  dark:opacity-60 dark:hover:opacity-100
                  transition
                "
                >
                  <img src="images/brands/ayroui.svg" alt="ayroui"/>
                </a>
                <a
                  href="https://plainadmin.com"
                  target="_blank"
                  rel="nofollow noreferrer"
                  className="
                  flex items-center justify-center
                  lg:max-w-[130px]
                  xl:max-w-[150px]
                  2xl:max-w-[160px]
                  mx-3
                  sm:mx-4
                  xl:mx-6
                  2xl:mx-8
                  py-[15px] grayscale
                  hover:grayscale-0
                  opacity-70
                  hover:opacity-100
                  dark:opacity-60 dark:hover:opacity-100
                  transition
                "
                >
                  <img src="images/brands/plainadmin.svg" alt="plainadmin"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section id="about" className="pt-[120px]">*/}
      {/*  <div className="container">*/}
      {/*    <div*/}
      {/*      className="*/}
      {/*      pb-[100px] border-b border-white border-opacity-[.15]*/}
      {/*    "*/}
      {/*    >*/}
      {/*      <div className="flex flex-wrap items-center mx-[-16px]">*/}
      {/*        <div className="w-full lg:w-1/2 px-4">*/}
      {/*          <div*/}
      {/*            className="mb-12 lg:mb-0 max-w-[570px] wow fadeInUp"*/}
      {/*            data-wow-delay=".15s"*/}
      {/*          >*/}
      {/*            <h2*/}
      {/*              className="*/}
      {/*              text-black*/}
      {/*              dark:text-white*/}
      {/*              font-bold text-3xl*/}
      {/*              sm:text-4xl*/}
      {/*              md:text-[45px]*/}
      {/*              lg:text-4xl*/}
      {/*              xl:text-[45px]*/}
      {/*              leading-tight*/}
      {/*              sm:leading-tight*/}
      {/*              md:leading-tight*/}
      {/*              lg:leading-tight*/}
      {/*              xl:leading-tight*/}
      {/*              mb-6*/}
      {/*            "*/}
      {/*            >*/}
      {/*              Crafted for Startup, SaaS and Business Sites.*/}
      {/*            </h2>*/}
      {/*            <p*/}
      {/*              className="*/}
      {/*              font-medium text-body-color text-base*/}
      {/*              sm:text-lg*/}
      {/*              leading-relaxed*/}
      {/*              sm:leading-relaxed*/}
      {/*              mb-11*/}
      {/*            "*/}
      {/*            >*/}
      {/*              The main ‘thrust’ is to focus on educating attendees on how to*/}
      {/*              best protect highly vulnerable business applications with*/}
      {/*              interactive panel discussions and roundtables.*/}
      {/*            </p>*/}
      {/*            <div className="flex flex-wrap mx-[-12px]">*/}
      {/*              <div*/}
      {/*                className="*/}
      {/*                w-full*/}
      {/*                sm:w-1/2*/}
      {/*                lg:w-full*/}
      {/*                xl:w-1/2*/}
      {/*                px-3*/}
      {/*              "*/}
      {/*              >*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  Premium quality*/}
      {/*                </p>*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  No code required*/}
      {/*                </p>*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  Use for lifetime*/}
      {/*                </p>*/}
      {/*              </div>*/}
      {/*              <div*/}
      {/*                className="*/}
      {/*                w-full*/}
      {/*                sm:w-1/2*/}
      {/*                lg:w-full*/}
      {/*                xl:w-1/2*/}
      {/*                px-3*/}
      {/*              "*/}
      {/*              >*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  Regular updates*/}
      {/*                </p>*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  Rich documentation*/}
      {/*                </p>*/}
      {/*                <p*/}
      {/*                  className="*/}
      {/*                  flex*/}
      {/*                  items-center*/}
      {/*                  text-body-color*/}
      {/*                  text-lg*/}
      {/*                  font-medium*/}
      {/*                  mb-5*/}
      {/*                "*/}
      {/*                >*/}
      {/*                <span*/}
      {/*                  className="*/}
      {/*                    w-[30px]*/}
      {/*                    h-[30px]*/}
      {/*                    flex*/}
      {/*                    items-center*/}
      {/*                    justify-center*/}
      {/*                    rounded-md*/}
      {/*                    bg-primary*/}
      {/*                    bg-opacity-10*/}
      {/*                    text-primary*/}
      {/*                    mr-4*/}
      {/*                  "*/}
      {/*                >*/}
      {/*                  <svg*/}
      {/*                    width="16"*/}
      {/*                    height="13"*/}
      {/*                    viewBox="0 0 16 13"*/}
      {/*                    className="fill-current"*/}
      {/*                  >*/}
      {/*                    <path*/}
      {/*                      d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z"*/}
      {/*                    />*/}
      {/*                  </svg>*/}
      {/*                </span>*/}
      {/*                  Developer friendly*/}
      {/*                </p>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className="w-full lg:w-1/2 px-4">*/}
      {/*          <div*/}
      {/*            className="text-center lg:text-right wow fadeInUp"*/}
      {/*            data-wow-delay=".2s"*/}
      {/*          >*/}
      {/*            <img*/}
      {/*              src="images/about/about-image.svg"*/}
      {/*              alt="about-image"*/}
      {/*              className="max-w-full mx-auto lg:mr-0"*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
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

      {/*<section*/}
      {/*  className="*/}
      {/*  relative*/}
      {/*  z-10*/}
      {/*  pt-[120px]*/}
      {/*  pb-20*/}
      {/*  bg-primary*/}
      {/*  bg-opacity-[3%]*/}
      {/*"*/}
      {/*>*/}
      {/*  <div className="container">*/}
      {/*    <div className="flex flex-wrap mx-[-16px]">*/}
      {/*      <div className="w-full px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          mx-auto max-w-[570px] text-center mb-[100px]*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*        "*/}
      {/*          data-wow-delay=".1s"*/}
      {/*        >*/}
      {/*          <h2*/}
      {/*            className="*/}
      {/*            text-black*/}
      {/*            dark:text-white*/}
      {/*            font-bold text-3xl*/}
      {/*            sm:text-4xl*/}
      {/*            md:text-[45px]*/}
      {/*            mb-4*/}
      {/*          "*/}
      {/*          >*/}
      {/*            What Our Users Says*/}
      {/*          </h2>*/}
      {/*          <p*/}
      {/*            className="*/}
      {/*            text-body-color text-base*/}
      {/*            md:text-lg*/}
      {/*            leading-relaxed*/}
      {/*            md:leading-relaxed*/}
      {/*          "*/}
      {/*          >*/}
      {/*            There are many variations of passages of Lorem Ipsum available*/}
      {/*            but the majority have suffered alteration in some form.*/}
      {/*          </p>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-wrap mx-[-16px]">*/}
      {/*      <div className="w-full md:w-1/2 lg:w-1/3 px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          shadow-one bg-white*/}
      {/*          dark:bg-[#1D2144]*/}
      {/*          rounded-md p-8*/}
      {/*          lg:px-5*/}
      {/*          xl:px-8*/}
      {/*          mb-10*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*        "*/}
      {/*          data-wow-delay=".1s"*/}
      {/*        >*/}
      {/*          <div className="flex items-center mb-5">*/}
      {/*          <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*          </div>*/}
      {/*          <p*/}
      {/*            className="*/}
      {/*            text-base text-body-color*/}
      {/*            dark:text-white*/}
      {/*            leading-relaxed pb-8 border-b border-body-color*/}
      {/*            dark:border-white*/}
      {/*            border-opacity-10*/}
      {/*            dark:border-opacity-10*/}
      {/*            mb-8*/}
      {/*          "*/}
      {/*          >*/}
      {/*            “Our members are so impressed. It's intuitive. It's clean. It's*/}
      {/*            distraction free. If you're building a community.*/}
      {/*          </p>*/}
      {/*          <div className="flex items-center">*/}
      {/*            <div*/}
      {/*              className="*/}
      {/*              rounded-full*/}
      {/*              overflow-hidden*/}
      {/*              max-w-[50px]*/}
      {/*              w-full*/}
      {/*              h-[50px]*/}
      {/*              mr-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              <img src="images/testimonials/author-01.png" alt="image"/>*/}
      {/*            </div>*/}
      {/*            <div className="w-full">*/}
      {/*              <h5*/}
      {/*                className="*/}
      {/*                text-lg*/}
      {/*                lg:text-base*/}
      {/*                xl:text-lg*/}
      {/*                text-dark*/}
      {/*                dark:text-white*/}
      {/*                font-semibold mb-1*/}
      {/*              "*/}
      {/*              >*/}
      {/*                Musharof Chy*/}
      {/*              </h5>*/}
      {/*              <p className="text-sm text-body-color">*/}
      {/*                Founder @TailGrids*/}
      {/*              </p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="w-full md:w-1/2 lg:w-1/3 px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          shadow-one bg-white*/}
      {/*          dark:bg-[#1D2144]*/}
      {/*          rounded-md p-8*/}
      {/*          lg:px-5*/}
      {/*          xl:px-8*/}
      {/*          mb-10*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*        "*/}
      {/*          data-wow-delay=".15s"*/}
      {/*        >*/}
      {/*          <div className="flex items-center mb-5">*/}
      {/*          <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*          </div>*/}
      {/*          <p*/}
      {/*            className="*/}
      {/*            text-base text-body-color*/}
      {/*            dark:text-white*/}
      {/*            leading-relaxed pb-8 border-b border-body-color*/}
      {/*            dark:border-white*/}
      {/*            border-opacity-10*/}
      {/*            dark:border-opacity-10*/}
      {/*            mb-8*/}
      {/*          "*/}
      {/*          >*/}
      {/*            “Our members are so impressed. It's intuitive. It's clean. It's*/}
      {/*            distraction free. If you're building a community.*/}
      {/*          </p>*/}
      {/*          <div className="flex items-center">*/}
      {/*            <div*/}
      {/*              className="*/}
      {/*              rounded-full*/}
      {/*              overflow-hidden*/}
      {/*              max-w-[50px]*/}
      {/*              w-full*/}
      {/*              h-[50px]*/}
      {/*              mr-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              <img src="images/testimonials/author-02.png" alt="image"/>*/}
      {/*            </div>*/}
      {/*            <div className="w-full">*/}
      {/*              <h5*/}
      {/*                className="*/}
      {/*                text-lg*/}
      {/*                lg:text-base*/}
      {/*                xl:text-lg*/}
      {/*                text-dark*/}
      {/*                dark:text-white*/}
      {/*                font-semibold mb-1*/}
      {/*              "*/}
      {/*              >*/}
      {/*                Devid Weilium*/}
      {/*              </h5>*/}
      {/*              <p className="text-sm text-body-color">Founder @UIdeck</p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      <div className="w-full md:w-1/2 lg:w-1/3 px-4">*/}
      {/*        <div*/}
      {/*          className="*/}
      {/*          shadow-one bg-white*/}
      {/*          dark:bg-[#1D2144]*/}
      {/*          rounded-md p-8*/}
      {/*          lg:px-5*/}
      {/*          xl:px-8*/}
      {/*          mb-10*/}
      {/*          wow*/}
      {/*          fadeInUp*/}
      {/*        "*/}
      {/*          data-wow-delay=".2s"*/}
      {/*        >*/}
      {/*          <div className="flex items-center mb-5">*/}
      {/*          <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*            <span className="text-yellow mr-1 block">*/}
      {/*            <svg*/}
      {/*              width="18"*/}
      {/*              height="16"*/}
      {/*              viewBox="0 0 18 16"*/}
      {/*              className="fill-current"*/}
      {/*            >*/}
      {/*              <path*/}
      {/*                d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z"*/}
      {/*              />*/}
      {/*            </svg>*/}
      {/*          </span>*/}
      {/*          </div>*/}
      {/*          <p*/}
      {/*            className="*/}
      {/*            text-base text-body-color*/}
      {/*            dark:text-white*/}
      {/*            leading-relaxed pb-8 border-b border-body-color*/}
      {/*            dark:border-white*/}
      {/*            border-opacity-10*/}
      {/*            dark:border-opacity-10*/}
      {/*            mb-8*/}
      {/*          "*/}
      {/*          >*/}
      {/*            “Our members are so impressed. It's intuitive. It's clean. It's*/}
      {/*            distraction free. If you're building a community.*/}
      {/*          </p>*/}
      {/*          <div className="flex items-center">*/}
      {/*            <div*/}
      {/*              className="*/}
      {/*              rounded-full*/}
      {/*              overflow-hidden*/}
      {/*              max-w-[50px]*/}
      {/*              w-full*/}
      {/*              h-[50px]*/}
      {/*              mr-4*/}
      {/*            "*/}
      {/*            >*/}
      {/*              <img src="images/testimonials/author-03.png" alt="image"/>*/}
      {/*            </div>*/}
      {/*            <div className="w-full">*/}
      {/*              <h5*/}
      {/*                className="*/}
      {/*                text-lg*/}
      {/*                lg:text-base*/}
      {/*                xl:text-lg*/}
      {/*                text-dark*/}
      {/*                dark:text-white*/}
      {/*                font-semibold mb-1*/}
      {/*              "*/}
      {/*              >*/}
      {/*                Lethium Frenci*/}
      {/*              </h5>*/}
      {/*              <p className="text-sm text-body-color">*/}
      {/*                Founder @Lineicons*/}
      {/*              </p>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className="absolute top-5 right-0 z-[-1]">*/}
      {/*    <svg*/}
      {/*      width="238"*/}
      {/*      height="531"*/}
      {/*      viewBox="0 0 238 531"*/}
      {/*      fill="none"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*    >*/}
      {/*      <rect*/}
      {/*        opacity="0.3"*/}
      {/*        x="422.819"*/}
      {/*        y="-70.8145"*/}
      {/*        width="196"*/}
      {/*        height="541.607"*/}
      {/*        rx="2"*/}
      {/*        transform="rotate(51.2997 422.819 -70.8145)"*/}
      {/*        fill="url(#paint0_linear_83:2)"*/}
      {/*      />*/}
      {/*      <rect*/}
      {/*        opacity="0.3"*/}
      {/*        x="426.568"*/}
      {/*        y="144.886"*/}
      {/*        width="59.7544"*/}
      {/*        height="541.607"*/}
      {/*        rx="2"*/}
      {/*        transform="rotate(51.2997 426.568 144.886)"*/}
      {/*        fill="url(#paint1_linear_83:2)"*/}
      {/*      />*/}
      {/*      <defs>*/}
      {/*        <linearGradient*/}
      {/*          id="paint0_linear_83:2"*/}
      {/*          x1="517.152"*/}
      {/*          y1="-251.373"*/}
      {/*          x2="517.152"*/}
      {/*          y2="459.865"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*        </linearGradient>*/}
      {/*        <linearGradient*/}
      {/*          id="paint1_linear_83:2"*/}
      {/*          x1="455.327"*/}
      {/*          y1="-35.673"*/}
      {/*          x2="455.327"*/}
      {/*          y2="675.565"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*        </linearGradient>*/}
      {/*      </defs>*/}
      {/*    </svg>*/}
      {/*  </div>*/}
      {/*  <div className="absolute left-0 bottom-5 z-[-1]">*/}
      {/*    <svg*/}
      {/*      width="279"*/}
      {/*      height="106"*/}
      {/*      viewBox="0 0 279 106"*/}
      {/*      fill="none"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*    >*/}
      {/*      <g opacity="0.5">*/}
      {/*        <path*/}
      {/*          d="M-57 12L50.0728 74.8548C55.5501 79.0219 70.8513 85.7589 88.2373 79.3692C109.97 71.3821 116.861 60.9642 156.615 63.7423C178.778 65.291 195.31 69.2985 205.911 62.3533C216.513 55.408 224.994 47.7682 243.016 49.1572C255.835 50.1453 265.278 50.8936 278 45.3373"*/}
      {/*          stroke="url(#paint0_linear_72:302)"*/}
      {/*        />*/}
      {/*        <path*/}
      {/*          d="M-57 1L50.0728 63.8548C55.5501 68.0219 70.8513 74.7589 88.2373 68.3692C109.97 60.3821 116.861 49.9642 156.615 52.7423C178.778 54.291 195.31 58.2985 205.911 51.3533C216.513 44.408 224.994 36.7682 243.016 38.1572C255.835 39.1453 265.278 39.8936 278 34.3373"*/}
      {/*          stroke="url(#paint1_linear_72:302)"*/}
      {/*        />*/}
      {/*        <path*/}
      {/*          d="M-57 23L50.0728 85.8548C55.5501 90.0219 70.8513 96.7589 88.2373 90.3692C109.97 82.3821 116.861 71.9642 156.615 74.7423C178.778 76.291 195.31 80.2985 205.911 73.3533C216.513 66.408 224.994 58.7682 243.016 60.1572C255.835 61.1453 265.278 61.8936 278 56.3373"*/}
      {/*          stroke="url(#paint2_linear_72:302)"*/}
      {/*        />*/}
      {/*        <path*/}
      {/*          d="M-57 35L50.0728 97.8548C55.5501 102.022 70.8513 108.759 88.2373 102.369C109.97 94.3821 116.861 83.9642 156.615 86.7423C178.778 88.291 195.31 92.2985 205.911 85.3533C216.513 78.408 224.994 70.7682 243.016 72.1572C255.835 73.1453 265.278 73.8936 278 68.3373"*/}
      {/*          stroke="url(#paint3_linear_72:302)"*/}
      {/*        />*/}
      {/*      </g>*/}
      {/*      <defs>*/}
      {/*        <linearGradient*/}
      {/*          id="paint0_linear_72:302"*/}
      {/*          x1="256.267"*/}
      {/*          y1="53.6717"*/}
      {/*          x2="-40.8688"*/}
      {/*          y2="8.15715"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7"/>*/}
      {/*        </linearGradient>*/}
      {/*        <linearGradient*/}
      {/*          id="paint1_linear_72:302"*/}
      {/*          x1="256.267"*/}
      {/*          y1="42.6717"*/}
      {/*          x2="-40.8688"*/}
      {/*          y2="-2.84285"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7"/>*/}
      {/*        </linearGradient>*/}
      {/*        <linearGradient*/}
      {/*          id="paint2_linear_72:302"*/}
      {/*          x1="256.267"*/}
      {/*          y1="64.6717"*/}
      {/*          x2="-40.8688"*/}
      {/*          y2="19.1572"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7"/>*/}
      {/*        </linearGradient>*/}
      {/*        <linearGradient*/}
      {/*          id="paint3_linear_72:302"*/}
      {/*          x1="256.267"*/}
      {/*          y1="76.6717"*/}
      {/*          x2="-40.8688"*/}
      {/*          y2="31.1572"*/}
      {/*          gradientUnits="userSpaceOnUse"*/}
      {/*        >*/}
      {/*          <stop stopColor="#4A6CF7" stopOpacity="0"/>*/}
      {/*          <stop offset="1" stopColor="#4A6CF7"/>*/}
      {/*        </linearGradient>*/}
      {/*      </defs>*/}
      {/*    </svg>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <section id="pricing" className="relative z-10 pt-[120px] pb-20">
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                mx-auto max-w-[655px] text-center mb-[100px]
                wow
                fadeInUp
              "
                data-wow-delay=".1s"
              >
                <h2
                  className="
                  text-black
                  dark:text-white
                  font-bold text-3xl
                  sm:text-4xl
                  md:text-[45px]
                  mb-4
                "
                >
                  Account Levels
                </h2>
                <p
                  className="
                  text-body-color text-base
                  md:text-lg
                  leading-relaxed
                  md:leading-relaxed
                  max-w-[570px] mx-auto
                "
                >
                  You can use our service for free or increase your Account Level by your needs.
                  You pay only once to get access to all our features!
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mx-[-16px]">
            <PriceBlock plan={""}
                        price={"Free"}
                        description={"..."}>
              <PriceBlockItem text={"Create up to 10 groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 500 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"No Private messages encryption"} isOk={false}/>
              <PriceBlockItem text={"10 reports about spam in your messages lock account from sending messages"} isOk={false}/>
            </PriceBlock>
            <PriceBlock plan={"Bronze"}
                        price={"5 NEAR"}
                        description={"..."}>
              <PriceBlockItem text={"Create up to 100 groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 2000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 1 minute per each spam report (up to 1 hour) *"} isOk={true}/>
            </PriceBlock>
            <PriceBlock plan={"Gold"}
                        price={"10 NEAR"}
                        description={"..."}>
              <PriceBlockItem text={"Create unlimited groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 5000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 10 sec. per each spam report (up to 10 minutes) *"} isOk={true}/>
            </PriceBlock>
          </div>

          <div className={"text-body-color text-base text-center"}>
            * Bronze and Gold accounts can be Verified to avoid any locks. <br/>
            Send us message from your official channel with your NEAR Address to verify your account!
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

      <section
        id="blog"
        className="bg-primary bg-opacity-5 pt-[120px] pb-20"
      >
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full px-4">
              <div
                className="
                mx-auto max-w-[570px] text-center mb-[100px]
                wow
                fadeInUp
              "
                data-wow-delay=".1s"
              >
                <h2
                  className="
                  text-black
                  dark:text-white
                  font-bold text-3xl
                  sm:text-4xl
                  md:text-[45px]
                  mb-4
                "
                >
                  Our Latest Blogs
                </h2>
                <p
                  className="
                  text-body-color text-base
                  md:text-lg
                  leading-relaxed
                  md:leading-relaxed
                "
                >
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap mx-[-16px] justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4">
              <div
                className="
                relative bg-white
                dark:bg-dark
                shadow-one rounded-md overflow-hidden mb-10
                wow
                fadeInUp
              "
                data-wow-delay=".1s"
              >
                <a
                  className="w-full block relative"
                >
                <span
                  className="
                    absolute
                    top-6
                    right-6
                    bg-primary
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    py-2
                    px-4
                    font-semibold
                    text-sm
                    text-white
                  "
                >
                  Computer
                </span>
                  <img
                    src="images/blog/blog-01.jpg"
                    alt="image"
                    className="w-full"
                  />
                </a>
                <div
                  className="
                  p-6
                  sm:p-8
                  md:py-8 md:px-6
                  lg:p-8
                  xl:py-8 xl:px-5
                  2xl:p-8
                "
                >
                  <h3>
                    <a
                      className="
                      font-bold text-black
                      dark:text-white
                      text-xl
                      sm:text-2xl
                      block mb-4
                      hover:text-primary
                      dark:hover:text-primary
                    "
                    >
                      Best UI components for modern websites
                    </a>
                  </h3>
                  <p
                    className="
                    text-base
                    text-body-color
                    font-medium
                    pb-6
                    mb-6
                    border-b
                    border-body-color
                    border-opacity-10
                    dark:border-white dark:border-opacity-10
                  "
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                    sit amet dictum neque, laoreet dolor.
                  </p>
                  <div className="flex items-center">
                    <div
                      className="
                      flex items-center pr-5 mr-5
                      xl:pr-3
                      2xl:pr-5
                      xl:mr-3
                      2xl:mr-5
                      border-r border-body-color border-opacity-10
                      dark:border-white dark:border-opacity-10
                    "
                    >
                      <div
                        className="
                        max-w-[40px]
                        w-full
                        h-[40px]
                        rounded-full
                        overflow-hidden
                        mr-4
                      "
                      >
                        <img
                          src="images/blog/author-01.png"
                          alt="author"
                          className="w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h4
                          className="
                          text-sm font-medium text-dark
                          dark:text-white
                          mb-1
                        "
                        >
                          By
                          <a
                            className="
                            text-dark
                            dark:text-white
                            hover:text-primary
                            dark:hover:text-primary
                          "
                          >
                            Samuyl Joshi
                          </a>
                        </h4>
                        <p className="text-xs text-body-color">
                          Graphic Designer
                        </p>
                      </div>
                    </div>
                    <div className="inline-block">
                      <h4
                        className="
                        text-sm font-medium text-dark
                        dark:text-white
                        mb-1
                      "
                      >
                        Date
                      </h4>
                      <p className="text-xs text-body-color">15 Dec, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4">
              <div
                className="
                relative bg-white
                dark:bg-dark
                shadow-one rounded-md overflow-hidden mb-10
                wow
                fadeInUp
              "
                data-wow-delay=".15s"
              >
                <a
                  className="w-full block relative"
                >
                <span
                  className="
                    absolute
                    top-6
                    right-6
                    bg-primary
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    py-2
                    px-4
                    font-semibold
                    text-sm
                    text-white
                  "
                >
                  Design
                </span>
                  <img
                    src="images/blog/blog-02.jpg"
                    alt="image"
                    className="w-full"
                  />
                </a>
                <div
                  className="
                  p-6
                  sm:p-8
                  md:py-8 md:px-6
                  lg:p-8
                  xl:py-8 xl:px-5
                  2xl:p-8
                "
                >
                  <h3>
                    <a
                      className="
                      font-bold text-black
                      dark:text-white
                      text-xl
                      sm:text-2xl
                      block mb-4
                      hover:text-primary
                      dark:hover:text-primary
                    "
                    >
                      9 simple ways to improve your design skills
                    </a>
                  </h3>
                  <p
                    className="
                    text-base
                    text-body-color
                    font-medium
                    pb-6
                    mb-6
                    border-b
                    border-body-color
                    border-opacity-10
                    dark:border-white dark:border-opacity-10
                  "
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                    sit amet dictum neque, laoreet dolor.
                  </p>
                  <div className="flex items-center">
                    <div
                      className="
                      flex items-center pr-5 mr-5
                      xl:pr-3
                      2xl:pr-5
                      xl:mr-3
                      2xl:mr-5
                      border-r border-body-color border-opacity-10
                      dark:border-white dark:border-opacity-10
                    "
                    >
                      <div
                        className="
                        max-w-[40px]
                        w-full
                        h-[40px]
                        rounded-full
                        overflow-hidden
                        mr-4
                      "
                      >
                        <img
                          src="images/blog/author-02.png"
                          alt="author"
                          className="w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h4
                          className="
                          text-sm font-medium text-dark
                          dark:text-white
                          mb-1
                        "
                        >
                          By
                          <a
                            className="
                            text-dark
                            dark:text-white
                            hover:text-primary
                            dark:hover:text-primary
                          "
                          >
                            Musharof Chy
                          </a>
                        </h4>
                        <p className="text-xs text-body-color">
                          Content Writer
                        </p>
                      </div>
                    </div>
                    <div className="inline-block">
                      <h4
                        className="
                        text-sm font-medium text-dark
                        dark:text-white
                        mb-1
                      "
                      >
                        Date
                      </h4>
                      <p className="text-xs text-body-color">15 Dec, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 px-4">
              <div
                className="
                relative bg-white
                dark:bg-dark
                shadow-one rounded-md overflow-hidden mb-10
                wow
                fadeInUp
              "
                data-wow-delay=".2s"
              >
                <a
                  className="w-full block relative"
                >
                <span
                  className="
                    absolute
                    top-6
                    right-6
                    bg-primary
                    rounded-full
                    inline-flex
                    items-center
                    justify-center
                    py-2
                    px-4
                    font-semibold
                    text-sm
                    text-white
                  "
                >
                  Computer
                </span>
                  <img
                    src="images/blog/blog-03.jpg"
                    alt="image"
                    className="w-full"
                  />
                </a>
                <div
                  className="
                  p-6
                  sm:p-8
                  md:py-8 md:px-6
                  lg:p-8
                  xl:py-8 xl:px-5
                  2xl:p-8
                "
                >
                  <h3>
                    <a
                      className="
                      font-bold text-black
                      dark:text-white
                      text-xl
                      sm:text-2xl
                      block mb-4
                      hover:text-primary
                      dark:hover:text-primary
                    "
                    >
                      Tips to quickly improve your coding speed.
                    </a>
                  </h3>
                  <p
                    className="
                    text-base
                    text-body-color
                    font-medium
                    pb-6
                    mb-6
                    border-b
                    border-body-color
                    border-opacity-10
                    dark:border-white dark:border-opacity-10
                  "
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                    sit amet dictum neque, laoreet dolor.
                  </p>
                  <div className="flex items-center">
                    <div
                      className="
                      flex items-center pr-5 mr-5
                      xl:pr-3
                      2xl:pr-5
                      xl:mr-3
                      2xl:mr-5
                      border-r border-body-color border-opacity-10
                      dark:border-white dark:border-opacity-10
                    "
                    >
                      <div
                        className="
                        max-w-[40px]
                        w-full
                        h-[40px]
                        rounded-full
                        overflow-hidden
                        mr-4
                      "
                      >
                        <img
                          src="images/blog/author-03.png"
                          alt="author"
                          className="w-full"
                        />
                      </div>
                      <div className="w-full">
                        <h4
                          className="
                          text-sm font-medium text-dark
                          dark:text-white
                          mb-1
                        "
                        >
                          By
                          <a
                            className="
                            text-dark
                            dark:text-white
                            hover:text-primary
                            dark:hover:text-primary
                          "
                          >
                            Lethium Deo
                          </a>
                        </h4>
                        <p className="text-xs text-body-color">
                          Graphic Designer
                        </p>
                      </div>
                    </div>
                    <div className="inline-block">
                      <h4
                        className="
                        text-sm font-medium text-dark
                        dark:text-white
                        mb-1
                      "
                      >
                        Date
                      </h4>
                      <p className="text-xs text-body-color">15 Dec, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="pt-[120px] pb-20">
        <div className="container">
          <div className="flex flex-wrap mx-[-16px]">
            <div className="w-full lg:w-8/12 px-4">
              <div
                className="
                bg-primary bg-opacity-[3%]
                dark:bg-dark
                rounded-md p-11 mb-12
                lg:mb-5
                sm:p-[55px]
                lg:p-11
                xl:p-[55px]
                wow
                fadeInUp
              "
                data-wow-delay=".15s
              "
              >
                <h2
                  className="
                  font-bold text-black
                  dark:text-white
                  text-2xl
                  sm:text-3xl
                  lg:text-2xl
                  xl:text-3xl
                  mb-3
                "
                >
                  Need Help? Open a Ticket
                </h2>
                <p
                  className="text-body-color text-base font-medium mb-12"
                >
                  Our support team will get back to you ASAP via email.
                </p>
                <form>
                  <div className="flex flex-wrap mx-[-16px]">
                    <div className="w-full md:w-1/2 px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="name"
                          className="
                          block text-sm font-medium text-dark
                          dark:text-white
                          mb-3
                        "
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="
                          w-full border border-transparent
                          dark:bg-[#242B51]
                          rounded-md shadow-one
                          dark:shadow-signUp
                          py-3
                          px-6
                          text-body-color
                          text-base
                          placeholder-body-color
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                        "
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="
                          block text-sm font-medium text-dark
                          dark:text-white
                          mb-3
                        "
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="
                          w-full border border-transparent
                          dark:bg-[#242B51]
                          rounded-md shadow-one
                          dark:shadow-signUp
                          py-3
                          px-6
                          text-body-color
                          text-base
                          placeholder-body-color
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                        "
                        />
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <div className="mb-8">
                        <label
                          htmlFor="message"
                          className="
                          block text-sm font-medium text-dark
                          dark:text-white
                          mb-3
                        "
                        >
                          Your Message
                        </label>
                        <textarea
                          name="message"
                          rows="5"
                          placeholder="Enter your Message"
                          className="
                          w-full border border-transparent
                          dark:bg-[#242B51]
                          rounded-md shadow-one
                          dark:shadow-signUp
                          py-3
                          px-6
                          text-body-color
                          text-base
                          placeholder-body-color
                          outline-none
                          focus-visible:shadow-none
                          focus:border-primary
                          resize-none
                        "
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-full px-4">
                      <a
                        className="
                        text-base
                        font-medium
                        text-white
                        bg-primary
                        py-4
                        px-9
                        hover:bg-opacity-80 hover:shadow-signUp
                        rounded-md
                        transition
                        duration-300
                        ease-in-out
                      "
                      >
                        Submit Ticket
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="w-full lg:w-4/12 px-4">
              <div
                className="
                relative
                z-10
                rounded-md
                bg-primary
                bg-opacity-[3%]
                dark:bg-opacity-10
                p-8
                sm:p-11
                lg:p-8
                xl:p-11
                mb-5
                wow
                fadeInUp
              "
                data-wow-delay=".2s
              "
              >
                <h3
                  className="
                  text-black
                  dark:text-white
                  font-bold text-2xl leading-tight mb-4
                "
                >
                  Subscribe to receive future updates
                </h3>
                <p
                  className="
                  font-medium
                  text-base
                  text-body-color
                  leading-relaxed
                  pb-11
                  mb-11
                  border-b
                  border-body-color
                  border-opacity-25
                  dark:border-white dark:border-opacity-25
                "
                >
                  Lorem ipsum dolor sited Sed ullam corper consectur adipiscing
                  Mae ornare massa quis lectus.
                </p>
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className="
                    w-full
                    border
                    border-body-color
                    border-opacity-10
                    dark:border-white
                    dark:border-opacity-10
                    dark:bg-[#242B51]
                    rounded-md
                    py-3
                    px-6
                    font-medium
                    text-body-color
                    text-base
                    placeholder-body-color
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary focus:border-opacity-100
                    mb-4
                  "
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="
                    w-full
                    border
                    border-body-color
                    border-opacity-10
                    dark:border-white
                    dark:border-opacity-10
                    dark:bg-[#242B51]
                    rounded-md
                    py-3
                    px-6
                    font-medium
                    text-body-color
                    text-base
                    placeholder-body-color
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary focus:border-opacity-100
                    mb-4
                  "
                  />
                  <input
                    type="submit"
                    value="Subscribe"
                    className="
                    w-full
                    border
                    border-primary
                    bg-primary
                    rounded-md
                    py-3
                    px-6
                    font-medium
                    text-white
                    text-base
                    text-center
                    outline-none
                    cursor-pointer
                    focus-visible:shadow-none
                    hover:shadow-signUp hover:bg-opacity-80
                    transition duration-80 ease-in-out mb-4
                  "
                  />
                  <p
                    className="
                    text-base
                    text-body-color
                    text-center
                    font-medium
                    leading-relaxed
                  "
                  >
                    No spam guaranteed, So please don’t send any spam mail.
                  </p>
                </form>
                <div className="absolute top-0 left-0 z-[-1]">
                  {/*<svg*/}
                  {/*  width="370"*/}
                  {/*  height="596"*/}
                  {/*  viewBox="0 0 370 596"*/}
                  {/*  fill="none"*/}
                  {/*  xmlns="http://www.w3.org/2000/svg"*/}
                  {/*>*/}
                  {/*  <mask*/}
                  {/*    id="mask0_88:141"*/}
                  {/*    style="mask-type: alpha"*/}
                  {/*    maskUnits="userSpaceOnUse"*/}
                  {/*    x="0"*/}
                  {/*    y="0"*/}
                  {/*    width="370"*/}
                  {/*    height="596"*/}
                  {/*  >*/}
                  {/*    <rect width="370" height="596" rx="2" fill="#1D2144"/>*/}
                  {/*  </mask>*/}
                  {/*  <g mask="url(#mask0_88:141)">*/}
                  {/*    <path*/}
                  {/*      opacity="0.15"*/}
                  {/*      d="M15.4076 50.9571L54.1541 99.0711L71.4489 35.1605L15.4076 50.9571Z"*/}
                  {/*      fill="url(#paint0_linear_88:141)"*/}
                  {/*    />*/}
                  {/*    <path*/}
                  {/*      opacity="0.15"*/}
                  {/*      d="M20.7137 501.422L44.6431 474.241L6 470.624L20.7137 501.422Z"*/}
                  {/*      fill="url(#paint1_linear_88:141)"*/}
                  {/*    />*/}
                  {/*    <path*/}
                  {/*      opacity="0.1"*/}
                  {/*      d="M331.676 198.309C344.398 204.636 359.168 194.704 358.107 180.536C357.12 167.363 342.941 159.531 331.265 165.71C318.077 172.69 318.317 191.664 331.676 198.309Z"*/}
                  {/*      fill="url(#paint2_linear_88:141)"*/}
                  {/*    />*/}
                  {/*    <g opacity="0.3">*/}
                  {/*      <path*/}
                  {/*        d="M209 89.9999C216 77.3332 235.7 50.7999 258.5 45.9999C287 39.9999 303 41.9999 314 30.4999C325 18.9999 334 -3.50014 357 -3.50014C380 -3.50014 395 4.99986 408.5 -8.50014C422 -22.0001 418.5 -46.0001 452 -37.5001C478.8 -30.7001 515.167 -45 530 -53"*/}
                  {/*        stroke="url(#paint3_linear_88:141)"*/}
                  {/*      />*/}
                  {/*      <path*/}
                  {/*        d="M251 64.9999C258 52.3332 277.7 25.7999 300.5 20.9999C329 14.9999 345 16.9999 356 5.49986C367 -6.00014 376 -28.5001 399 -28.5001C422 -28.5001 437 -20.0001 450.5 -33.5001C464 -47.0001 460.5 -71.0001 494 -62.5001C520.8 -55.7001 557.167 -70 572 -78"*/}
                  {/*        stroke="url(#paint4_linear_88:141)"*/}
                  {/*      />*/}
                  {/*      <path*/}
                  {/*        d="M212 73.9999C219 61.3332 238.7 34.7999 261.5 29.9999C290 23.9999 306 25.9999 317 14.4999C328 2.99986 337 -19.5001 360 -19.5001C383 -19.5001 398 -11.0001 411.5 -24.5001C425 -38.0001 421.5 -62.0001 455 -53.5001C481.8 -46.7001 518.167 -61 533 -69"*/}
                  {/*        stroke="url(#paint5_linear_88:141)"*/}
                  {/*      />*/}
                  {/*      <path*/}
                  {/*        d="M249 40.9999C256 28.3332 275.7 1.79986 298.5 -3.00014C327 -9.00014 343 -7.00014 354 -18.5001C365 -30.0001 374 -52.5001 397 -52.5001C420 -52.5001 435 -44.0001 448.5 -57.5001C462 -71.0001 458.5 -95.0001 492 -86.5001C518.8 -79.7001 555.167 -94 570 -102"*/}
                  {/*        stroke="url(#paint6_linear_88:141)"*/}
                  {/*      />*/}
                  {/*    </g>*/}
                  {/*  </g>*/}
                  {/*  <defs>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint0_linear_88:141"*/}
                  {/*      x1="13.4497"*/}
                  {/*      y1="63.5059"*/}
                  {/*      x2="81.144"*/}
                  {/*      y2="41.5072"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint1_linear_88:141"*/}
                  {/*      x1="28.1579"*/}
                  {/*      y1="501.301"*/}
                  {/*      x2="8.69936"*/}
                  {/*      y2="464.391"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint2_linear_88:141"*/}
                  {/*      x1="338"*/}
                  {/*      y1="167"*/}
                  {/*      x2="349.488"*/}
                  {/*      y2="200.004"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint3_linear_88:141"*/}
                  {/*      x1="369.5"*/}
                  {/*      y1="-53"*/}
                  {/*      x2="369.5"*/}
                  {/*      y2="89.9999"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint4_linear_88:141"*/}
                  {/*      x1="411.5"*/}
                  {/*      y1="-78"*/}
                  {/*      x2="411.5"*/}
                  {/*      y2="64.9999"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint5_linear_88:141"*/}
                  {/*      x1="372.5"*/}
                  {/*      y1="-69"*/}
                  {/*      x2="372.5"*/}
                  {/*      y2="73.9999"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*    <linearGradient*/}
                  {/*      id="paint6_linear_88:141"*/}
                  {/*      x1="409.5"*/}
                  {/*      y1="-102"*/}
                  {/*      x2="409.5"*/}
                  {/*      y2="40.9999"*/}
                  {/*      gradientUnits="userSpaceOnUse"*/}
                  {/*    >*/}
                  {/*      <stop stopColor="white"/>*/}
                  {/*      <stop offset="1" stopColor="white" stopOpacity="0"/>*/}
                  {/*    </linearGradient>*/}
                  {/*  </defs>*/}
                  {/*</svg>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </Layout>
  );
};
