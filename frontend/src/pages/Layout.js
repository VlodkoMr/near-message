import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import "../assets/css/homepage.css"

export const Layout = ({ children }) => {
  return (
    <div className="flex flex-col relative h-screen justify-between">
      <Header/>

      <main className={"mb-auto"}>
        {children}
      </main>

      <Footer/>
    </div>
  );
};
