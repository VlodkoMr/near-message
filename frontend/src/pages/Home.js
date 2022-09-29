import { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Layout } from "./Layout";
import { NearContext } from "../context/NearContext";

export const Home = () => {
  const navigate = useNavigate();
  const near = useContext(NearContext);

  useEffect(() => {
    console.log(`near`, near);
  }, [ near ])

  return (
    <Layout>

      <div>HOME</div>
      <Link to={"/my"}>My Messages</Link>

    </Layout>
  );
};
