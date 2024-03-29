import React from "react";
import { FaDiscord, FaTelegramPlane, FaTwitter } from "react-icons/all";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FooterScrollLink } from "../assets/css/components";
import Scroll from "react-scroll";

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const scroll = Scroll.animateScroll;

  const ExternalLink = ({ title, url }: {title: string, url: string}) => (
    <a target={"_blank"}
       href={url}
       className="footer-link">
      {title}
    </a>
  )

  const scrollProps = {
    smooth: true,
    duration: 400,
    exact: "true",
    offset: -100,
  };

  const navigateToHome = (anchor: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${anchor}`);
    }
  };

  return (
    <footer
      className="relative z-10 bg-primary bg-opacity-5 pt-[50px] md:pt-[100px] wow fadeInUp"
      data-wow-delay=".1s"
    >
      <div className="container">
        <div className="flex flex-wrap mx-[-16px]">
          <div className="w-full md:w-1/2 lg:w-4/12 xl:w-5/12 px-4">
            <div className="mb-16 max-w-[360px]">
              <Link to="/" className="inline-block mb-2 md:mb-8">
                <img src={require("../assets/img/logo.png")} className={"h-8"} alt="logo"/>
              </Link>
              <p className="text-body-color text-base font-medium leading-relaxed mb-4 md:mb-9">
                Chats & Messages service for NEAR Blockchain.
                Direct messages, channels, private and public chats.
              </p>
              <div className="flex items-center">
                <a
                  aria-label="social-link"
                  href={"https://twitter.com/chatme_near"}
                  target={"_blank"}
                  className="text-[#CED3F6] hover:text-primary mr-6"
                >
                  <FaTwitter size={22}/>
                </a>
                <a
                  aria-label="social-link"
                  href={"https://discord.gg/pcvvn4EJpa"}
                  target={"_blank"}
                  className="text-[#CED3F6] hover:text-primary mr-6"
                >
                  <FaDiscord size={24}/>
                </a>
                <a
                  aria-label="social-link"
                  href={"https://t.me/chatme_near"}
                  target={"_blank"}
                  className="text-[#CED3F6] hover:text-primary mr-6"
                >
                  <FaTelegramPlane size={23}/>
                </a>
              </div>
            </div>
          </div>

          <div className="w-1/2 lg:w-2/12 xl:w-2/12 pl-4">
            <div className="mb-16">
              <h2 className="font-bold text-black dark:text-white text-xl mb-10">
                Links
              </h2>
              <ul>
                <li>
                  <FooterScrollLink to="features" onClick={() => navigateToHome('features')} {...scrollProps}>
                    Features
                  </FooterScrollLink>
                </li>
                <li>
                  <FooterScrollLink to="chats" onClick={() => navigateToHome('chats')} {...scrollProps}>
                    Chats & Channels
                  </FooterScrollLink>
                </li>
                <li>
                  <FooterScrollLink to="accounts" onClick={() => navigateToHome('accounts')} {...scrollProps}>
                    Account Levels
                  </FooterScrollLink>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 lg:w-2/12 xl:w-2/12 px-4 lg:mr-6">
            <div className="mb-16">
              <h2 className="font-bold text-black dark:text-white text-xl mb-10">
                Documentation
              </h2>
              <ul>
                <li>
                  <ExternalLink title={"Overview"} url={"https://chatme.gitbook.io/chatme/"}/>
                </li>
                <li>
                  <ExternalLink title={"Get Started"} url={"https://chatme.gitbook.io/chatme/documentation/get-started"}/>
                </li>
                <li>
                  <ExternalLink title={"Widgets"} url={"https://chatme.gitbook.io/chatme/documentation/frontend-widgets"}/>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block lg:w-2/12 xl:w-2/12 px-4">
            <div className="mb-16">
              <h2 className="font-bold text-black dark:text-white text-xl mb-10">Support & Terms</h2>
              <ul>
                <li>
                  <Link to={"/faq"}
                        onClick={() => scroll.scrollToTop()}
                        className="footer-link">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to={"/privacy"}
                        onClick={() => scroll.scrollToTop()}
                        className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to={"/terms"}
                        onClick={() => scroll.scrollToTop()}
                        className="footer-link">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="py-8 bg-primary bg-opacity-10">
        <div className="container">
          <p className="text-gray-400 text-sm text-center">
            © Made by
            <a href="https://atomic-lab.io" className={"hover:underline ml-1 text-gray-100"} target={"_blank"}>
              ATOMIC-LAB.IO
            </a>
          </p>
        </div>
      </div>
      <div className="absolute right-0 top-14 opacity-30 z-[-1]">
        <img src={require("../assets/img/footer-img1.svg")} alt=""/>
      </div>
      <div className="absolute left-0 bottom-24 z-[-1]">
        <img src={require("../assets/img/footer-img2.svg")} alt=""/>
      </div>
    </footer>
  );
};

export default Footer;