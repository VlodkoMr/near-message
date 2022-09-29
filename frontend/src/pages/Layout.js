import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from 'react-router-dom';

export const Layout = ({ children }) => {
  const navigate = useNavigate();

  return (
    <>
      <Header/>

      {children}

      <Footer/>
    </>
  );
};
