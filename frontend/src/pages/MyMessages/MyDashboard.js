import React from "react";
import { useNavigate } from 'react-router-dom';
import { MyMessagesHeader } from "../../components/MyMessages/Header";

export const MyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyMessagesHeader title={""} media={""}/>
      <div>
        MyDashboard
      </div>
    </>
  );
};
