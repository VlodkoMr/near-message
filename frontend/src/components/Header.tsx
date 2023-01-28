import React, { useContext, useEffect, useRef, useState } from "react";
import { NearContext } from "../context/NearContext";
import { NavScrollLink, PrimaryButton } from "../assets/css/components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/transform";
import { animateScroll } from "react-scroll";

const Header: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const near = useContext(NearContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [ scroll, setScroll ] = useState(false);
  const [ mobileMenuVisible, setMobileMenuVisible ] = useState(false);

  const scrollProps = {
    activeClass: "opacity-50",
    smooth: true,
    duration: 400,
    spy: true,
    exact: "true",
    offset: -100,
  };

  useEffect(() => {
    // Change header bg on scroll
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 16);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setMobileMenuVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const navigateToHome = (anchor: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${anchor}`);
    }
    setMobileMenuVisible(false);
  };

  const toggleScrollTop = () => animateScroll.scrollToTop();

  return (
    <header
      className={`header bg-transparent absolute top-0 left-0 z-40 w-full flex items-center ${scroll ? "sticky" : ""}`}>
      <div className="container">
        <div className="flex mx-[-16px] items-center justify-between relative">
          <div className="pl-4 md:w-64">
            <Link to={"/"} className="block py-8 w-10 xl:w-full lg:h-auto header-logo" onClick={toggleScrollTop}>
              <img
                src={require("../assets/img/logo.png")}
                alt="logo"
                className="w-10 h-10 xl:w-full block object-cover xl:object-contain object-left"
              />
            </Link>
          </div>
          <div className="flex pr-4 lg:ml-4 2xl:ml-16 justify-between items-center flex-1">
            <div>
              <button id="navbarToggler"
                      aria-label="Mobile Menu"
                      onClick={() => setMobileMenuVisible(prev => !prev)}
                      className="block absolute right-4 top-1/2 translate-y-[-50%] lg:hidden focus:ring-2 ring-primary px-3 py-[6px] rounded-lg">
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
              </button>

              <nav id="navbarCollapse" className={`absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-white
                  dark:bg-dark lg:dark:bg-transparent lg:bg-transparent shadow-lg rounded-lg max-w-[250px] w-full
                  lg:max-w-full lg:w-full right-4 top-full lg:block lg:static lg:shadow-none
                  ${mobileMenuVisible ? "" : "hidden"}`} ref={ref}>
                <ul className="block lg:flex">
                  <li className="relative group">
                    <NavScrollLink to="home" onClick={() => navigateToHome('home')} {...scrollProps}>
                      Home
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="features" onClick={() => navigateToHome('features')} {...scrollProps}>
                      Features
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="chats" onClick={() => navigateToHome('chats')} {...scrollProps}>
                      Communities
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="accounts" onClick={() => navigateToHome('accounts')} {...scrollProps}>
                      Accounts
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="documentation" onClick={() => navigateToHome('documentation')} {...scrollProps}>
                      Docs
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <Link
                      className={`menu-scroll text-base text-dark dark:text-white group-hover:opacity-70 py-2 lg:py-6 lg:inline-flex 
                      lg:px-0 flex mx-5 cursor-pointer outline-none`}
                      to={"/faq"} onClick={() => {
                      toggleScrollTop()
                    }}>
                      FAQ
                    </Link>
                  </li>
                  {near.isSigned && (
                    <li className={"md:hidden"}>
                      <NavScrollLink to="documentation" onClick={() => {
                        near.wallet.signOut();
                        setMobileMenuVisible(false)
                      }}>
                        Sign Out
                      </NavScrollLink>
                    </li>
                  )}

                </ul>
              </nav>
            </div>
            <div
              className="justify-end items-center pr-16 lg:pr-0"
            >
              {!near.isSigned ? (
                <PrimaryButton onClick={() => near.wallet.signIn()}>Connect Wallet</PrimaryButton>
              ) : (
                <div className={"flex flex-row"}>
                  <div className={"hidden md:block text-gray-100 text-right leading-5 pt-1"}>
                    <div>{formatAddress(near.wallet.accountId)}</div>
                    <small className={"text-red-400 cursor-pointer hover:underline"} onClick={() => near.wallet.signOut()}>
                      Sign Out
                    </small>
                  </div>
                  <PrimaryButton to={"/my"} className={"ml-5"}>
                    Launch App
                  </PrimaryButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;