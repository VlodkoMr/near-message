import React from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useNavigate } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";

export const MyPrivateChat = () => {
  const navigate = useNavigate();


  return (
    <>
      <MyMessagesHeader/>
      <div>
        MyPrivateChat
      </div>
    </>
  );
};
