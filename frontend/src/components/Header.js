import React, { useContext } from "react";
import Button from "@mui/material/Button";
import { NearContext } from "../context/NearContext";
import { PrimaryButton } from "../assets/css/components";
import { Link } from "react-router-dom";
import { formatAddress } from "../utils/transform";

export const Header = () => {
  const near = useContext(NearContext);

  return (
    <header
      className="
        header
        bg-transparent
        absolute
        top-0
        left-0
        z-40
        w-full
        flex
        items-center
      "
    >
      <div className="container">
        <div
          className="
            flex mx-[-16px] items-center justify-between relative
          "
        >
          <div className="px-4 w-60 max-w-full">
            <Link to={"/"} className="w-full block py-8 header-logo">
              <img
                src={require("../assets/img/logo.png")}
                alt="logo"
                className="w-full hidden dark:block"
              />
            </Link>
          </div>
          <div
            className="flex px-4 ml-16 justify-between items-center w-full"
          >
            <div>
              <button
                id="navbarToggler" aria-label="Mobile Menu"
                className="
                  block
                  absolute
                  right-4
                  top-1/2
                  translate-y-[-50%]
                  lg:hidden
                  focus:ring-2
                  ring-primary px-3 py-[6px] rounded-lg
                "
              >
                <span
                  className="
                    relative
                    w-[30px]
                    h-[2px]
                    my-[6px]
                    block
                    bg-dark
                    dark:bg-white
                  "
                ></span>
                <span
                  className="
                    relative
                    w-[30px]
                    h-[2px]
                    my-[6px]
                    block
                    bg-dark
                    dark:bg-white
                  "
                ></span>
                <span
                  className="
                    relative
                    w-[30px]
                    h-[2px]
                    my-[6px]
                    block
                    bg-dark
                    dark:bg-white
                  "
                ></span>
              </button>
              <nav
                id="navbarCollapse"
                className="
                  absolute py-5
                  lg:py-0 lg:px-4
                  xl:px-6
                  bg-white
                  dark:bg-dark
                  lg:dark:bg-transparent lg:bg-transparent
                  shadow-lg rounded-lg max-w-[250px] w-full
                  lg:max-w-full lg:w-full
                  right-4 top-full hidden
                  lg:block lg:static lg:shadow-none
                "
              >
                <ul className="blcok lg:flex">
                  <li className="relative group">
                    <a
                      href="#home"
                      className="
                        menu-scroll
                        text-base
                        text-dark
                        dark:text-white
                        group-hover:opacity-70
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex mx-8
                        lg:mr-0
                      "
                    >
                      Home
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#about"
                      className="
                        menu-scroll
                        text-base
                        text-dark
                        dark:text-white
                        group-hover:opacity-70
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex mx-8
                        lg:mr-0 lg:ml-8
                        xl:ml-12
                      "
                    >
                      About
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#pricing"
                      className="
                        menu-scroll
                        text-base
                        text-dark
                        dark:text-white
                        group-hover:opacity-70
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex mx-8
                        lg:mr-0 lg:ml-8
                        xl:ml-12
                      "
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="relative group">
                    <a
                      href="#contact"
                      className="
                        menu-scroll
                        text-base
                        text-dark
                        dark:text-white
                        group-hover:opacity-70
                        py-2
                        lg:py-6 lg:inline-flex lg:px-0
                        flex mx-8
                        lg:mr-0 lg:ml-8
                        xl:ml-12
                      "
                    >
                      Support
                    </a>
                  </li>
                  {/*<li className="relative group submenu-item">*/}
                  {/*  <a*/}
                  {/*    className="*/}
                  {/*      text-base*/}
                  {/*      text-dark*/}
                  {/*      dark:text-white*/}
                  {/*      group-hover:opacity-70*/}
                  {/*      py-2*/}
                  {/*      lg:py-6 lg:inline-flex lg:pl-0 lg:pr-4*/}
                  {/*      flex mx-8*/}
                  {/*      lg:mr-0 lg:ml-8*/}
                  {/*      xl:ml-12*/}
                  {/*      relative*/}
                  {/*      after:absolute*/}
                  {/*      after:w-2*/}
                  {/*      after:h-2*/}
                  {/*      after:border-b-2*/}
                  {/*      after:border-r-2*/}
                  {/*      after:border-current*/}
                  {/*      after:rotate-45*/}
                  {/*      lg:after:right-0*/}
                  {/*      after:right-1*/}
                  {/*      after:top-1/2*/}
                  {/*      after:translate-y-[-50%]*/}
                  {/*      after:mt-[-2px]*/}
                  {/*    "*/}
                  {/*  >*/}
                  {/*    Pages*/}
                  {/*  </a>*/}
                  {/*  <div*/}
                  {/*    className="*/}
                  {/*      submenu*/}
                  {/*      hidden relative*/}
                  {/*      lg:absolute*/}
                  {/*      w-[250px] top-full*/}
                  {/*      lg:top-[110%]*/}
                  {/*      left-0 rounded-md*/}
                  {/*      lg:shadow-lg*/}
                  {/*      p-4*/}
                  {/*      lg:block lg:opacity-0 lg:invisible*/}
                  {/*      group-hover:opacity-100*/}
                  {/*      lg:group-hover:visible lg:group-hover:top-full*/}
                  {/*      bg-white*/}
                  {/*      dark:bg-dark*/}
                  {/*      transition-[top] duration-300*/}
                  {/*    "*/}
                  {/*  >*/}
                  {/*    <a*/}
                  {/*      href="about.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      About Page*/}
                  {/*    </a>*/}

                  {/*    <a*/}
                  {/*      href="contact.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Contact Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="blog-grids.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Blog Grid Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="blog-sidebar.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Blog Sidebar Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="blog-details.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Blog Details Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="signin.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Sign In Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="signup.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      Sign Up Page*/}
                  {/*    </a>*/}
                  {/*    <a*/}
                  {/*      href="404.html"*/}
                  {/*      className="*/}
                  {/*        block text-sm rounded py-[10px] px-4*/}
                  {/*        text-dark*/}
                  {/*        dark:text-white*/}
                  {/*        hover:opacity-70*/}
                  {/*      "*/}
                  {/*    >*/}
                  {/*      404 Page*/}
                  {/*    </a>*/}
                  {/*  </div>*/}
                  {/*</li>*/}
                </ul>
              </nav>
            </div>
            <div
              className="flex justify-end items-center pr-16 lg:pr-0"
            >
              {!near.isSigned ? (
                <PrimaryButton onClick={() => near.wallet.signIn()}>Connect Wallet</PrimaryButton>
              ) : (
                <div className={"flex flex-row"}>
                  <div className={"text-gray-200 text-right leading-5 pt-1"}>
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
