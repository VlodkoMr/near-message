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
  const near = useContext(NearContext);
  const [zoomTechDetails, setZoomTechDetails] = useState(false);
  const [publicGroups, setPublicGroups] = useState([]);

  const loadLastPublicChats = async () => {
    return await near.mainContract.getPublicGroups(6);
  }

  useEffect(() => {
    loadLastPublicChats().then(result => {
      setPublicGroups(result);
    });

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
            <div className="w-full px-4 flex flex-row gap-10">
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
                  to send private messages, create your own chats and channels.
                </p>
                <div>

                  <PrimaryButton to={"/my"}>
                    My Messages
                  </PrimaryButton>
                  <a href="https://chatme.gitbook.io/chatme/"
                     target={"_blank"}
                     className={`ml-4 py-3 px-7 text-base font-medium text-dark dark:text-white hover:opacity-70 rounded-full transition ease-in-up 
                     duration-300 cursor-pointer inline-block text-black bg-black bg-opacity-10 dark:text-white dark:bg-white dark:bg-opacity-10 
                     hover:bg-opacity-20 dark:hover:bg-opacity-20`}>
                    Documentation
                  </a>
                </div>
              </div>

              <div
                className="w-full wow fadeInUp text-right"
                data-wow-delay=".2s"
              >
                <img src={require("../assets/img/top-img.png")} alt="" className={"h-[350px] inline opacity-90"}/>
              </div>
            </div>
          </div>
        </div>


        <div className="absolute top-0 right-0 z-[-1] opacity-50">
          <img src={require("../assets/img/header-img.svg")} alt=""/>
        </div>
        <div className="absolute bottom-0 left-0 z-[-1] opacity-70">
          <img src={require("../assets/img/header-img2.svg")} alt=""/>
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
                        text={"Use ChatMe in your project to get all benefits in your application. Read documentation for more details about integration."}/>
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
                        text={`Review the list of all our public communities - chats and channels.`}/>

          <div className="flex flex-wrap mx-[-16px]">
            {publicGroups.map(group => (
              <OnePublicChat key={group.id} group={group}/>
            ))}
          </div>

          <div className={"text-center mb-8"}>
            <SecondaryButton onClick={() => alert("Coming soon...")}>
              <span className={"text-gray-400"}>All Public Communities</span>
            </SecondaryButton>
          </div>

          <div className={"text-gray-300/60 text-center mb-10"}>
            <b className={"mr-1.5"}>DISCLAIMER</b>
            The information presented herein has been provided by third parties and is made available solely for general
            information purposes. ChatMe does not warrant the accuracy of this information. The information should not be construed as
            professional or financial advice of any kind.
          </div>
        </div>
        <div className="absolute top-5 right-0 z-[-1]">
          <img src={require("../assets/img/public.svg")} alt=""/>
        </div>
        <div className="absolute left-0 bottom-5 z-[-1]">
          <img src={require("../assets/img/waves.svg")} alt=""/>
        </div>
      </section>

      <section id="about" className="py-[100px]">
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

      <section className="relative z-10 pt-[100px] pb-20 bg-primary bg-opacity-5">
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
              <PriceBlockItem text={"No sending NEAR tokens with message"} isOk={false}/>
              <PriceBlockItem text={"10 reports about spam in your messages lock account from sending messages"} isOk={false}/>
            </PriceBlock>
            <PriceBlock plan={"Bronze"} price={"7 NEAR"}
                        description={"Create more groups, join more group members, send encrypted private messages and avoid account lock."}>
              <PriceBlockItem text={"Create up to 50 groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 2000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"No sending NEAR tokens with message"} isOk={false}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 1 minute per each spam report (up to 1 hour)"} isOk={true}/>
            </PriceBlock>
            <PriceBlock plan={"Gold"} price={"14 NEAR"}
                        description={"Create unlimited groups, join more group members, send encrypted private messages and minimize account lock time."}>
              <PriceBlockItem text={"Create unlimited groups or channels"} isOk={true}/>
              <PriceBlockItem text={"Up to 5000 group members"} isOk={true}/>
              <PriceBlockItem text={"Unlimited members for your channels"} isOk={true}/>
              <PriceBlockItem text={"Private messages encryption"} isOk={true}/>
              <PriceBlockItem text={"Send NEAR tokens with message"} isOk={true}/>
              <PriceBlockItem text={"Temporary lock on spam detection: 15 sec. per each spam report (up to 15 minutes) **"} isOk={true}/>
            </PriceBlock>
          </div>

          <div className={"text-body-color text-base text-center"}>
            ** Gold account can be "Verified" to avoid any locks if you are part of NEAR ecosystem builders. <br/>
            Send us message from your official email / twitter / discord with your NEAR Address to verify your account!
          </div>
        </div>

        <div className="absolute left-0 bottom-0 z-[-1]">
          <img src={require("../assets/img/public2.svg")} alt=""/>
        </div>
      </section>

      <section className="pt-[100px] pb-20">
        <div className="container" id="documentation">
          <SectionTitle title={"Documentation"}
                        text={`Technical documentation for developers: integrate our service in your application. 
                        You can call our smart-contract directly, use NEAR-API-JS or install our widget with React components.`}
          />

          <div className="flex flex-wrap mx-[-16px] justify-center">
            <BlogArticle title={"ChatMe Introduction"}
                         text={"Learn more about ChatMe functionality with technical details to get started application usage or integration."}
                         url={"https://chatme.gitbook.io/chatme/"}/>
            <BlogArticle title={"App Integration"}
                         text={"Integrate any part of ChatMe functionality in your application by call smart-contract or use NEAR-API-JS."}
                         url={"https://chatme.gitbook.io/chatme/documentation/get-started"}/>
            <BlogArticle title={"Our Widgets"}
                         text={"We prepare few components for simple frontend integration: install npm package and use our React components in your application."}
                         url={"https://chatme.gitbook.io/chatme/documentation/frontend-widgets"}/>
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
