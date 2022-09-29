import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from 'react-router-dom';
import { Layout } from "./Layout";

export const Error404 = () => {
  const navigate = useNavigate();


  return (
    <Layout>

      Error404

    </Layout>
  );
};
