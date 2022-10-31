import React, { useContext, useEffect, useState } from "react";
import { NearContext } from "../context/NearContext";
import { NavScrollLink, PrimaryButton } from "../assets/css/components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { formatAddress } from "../utils/transform";
import { animateScroll } from "react-scroll";

export const Header = () => {
  const near = useContext(NearContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);

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

  const navigateToHome = (anchor) => {
    if (location.pathname !== "/") {
      navigate(`/#${anchor}`);
    }
  };

  const toggleHome = () => animateScroll.scrollToTop();

  return (
    <header
      className={`header bg-transparent absolute top-0 left-0 z-40 w-full flex items-center ${scroll ? "sticky" : ""}`}>
      <div className="container">
        <div className="flex mx-[-16px] items-center justify-between relative">
          <div className="px-4 w-60 max-w-full">
            <Link to={"/"} className="w-full block py-8 header-logo" onClick={toggleHome}>
              <img
                src={require("../assets/img/logo.png")}
                alt="logo"
                className="w-full hidden dark:block"
              />
            </Link>
          </div>
          <div className="flex px-4 ml-16 justify-between items-center w-full">
            <div>
              <button id="navbarToggler" aria-label="Mobile Menu"
                      className="block absolute right-4 top-1/2 translate-y-[-50%] lg:hidden focus:ring-2 ring-primary px-3 py-[6px] rounded-lg">
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
                <span className="relative w-[30px] h-[2px] my-[6px] block bg-dark dark:bg-white"></span>
              </button>

              <nav id="navbarCollapse" className="absolute py-5 lg:py-0 lg:px-4 xl:px-6 bg-white
                  dark:bg-dark lg:dark:bg-transparent lg:bg-transparent shadow-lg rounded-lg max-w-[250px] w-full
                  lg:max-w-full lg:w-full right-4 top-full hidden lg:block lg:static lg:shadow-none">
                <ul className="blcok lg:flex">
                  <li className="relative group">
                    <NavScrollLink to="home" {...scrollProps}>
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
                      Chats & Channels
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="accounts" onClick={() => navigateToHome('accounts')} {...scrollProps}>
                      Accounts
                    </NavScrollLink>
                  </li>
                  <li className="relative group">
                    <NavScrollLink to="documentation" onClick={() => navigateToHome('documentation')} {...scrollProps}>
                      Documentation
                    </NavScrollLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div
              className="hidden md:flex justify-end items-center pr-16 lg:pr-0"
            >
              {!near.isSigned ? (
                <PrimaryButton onClick={() => near.wallet.signIn()}>Connect Wallet</PrimaryButton>
              ) : (
                <div className={"flex flex-row"}>
                  <div className={"text-gray-100 text-right leading-5 pt-1"}>
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
