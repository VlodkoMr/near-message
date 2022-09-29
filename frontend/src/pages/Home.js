import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Layout } from "./Layout";
import { NearContext } from "../context/NearContext";
import Button from "@mui/material/Button";

export const Home = () => {
  const navigate = useNavigate();
  const near = useContext(NearContext);

  useEffect(() => {
    console.log(`near`, near);
  }, [ near ])

  return (
    <Layout>

      home

    </Layout>
  );
};
