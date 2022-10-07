import React from "react";
import { useNavigate } from 'react-router-dom';
import { MessagesHeader } from "../../components/MyMessages/MessagesHeader";

export const MyDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <MessagesHeader title={""} media={""}/>
      <div>
        MyDashboard
      </div>
    </>
  );
};
