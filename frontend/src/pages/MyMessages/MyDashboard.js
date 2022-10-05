import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";

export const MyDashboard = () => {
  const navigate = useNavigate();


  return (
    <>
      <MyMessagesHeader title={"xxx"} media={""}/>
      <div>
        MyDashboard
      </div>
    </>
  );
};
