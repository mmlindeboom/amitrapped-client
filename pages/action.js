import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import dynamic from "next/dynamic";
import AppLayout from "../components/AppLayout";
import { GET_SERVICES } from "../data/quiz";
import Loader from "../components/utils/Loader";

const ServicesBlock = dynamic(
  () => import("../components/blocks/ServicesBlock"),
  { ssr: false }
);

const Home = ({ client }) => {
  return (
    <AppLayout client={client} page="Take Action">
      <div
        style={{
          position: "fixed",
          top: 48,
          left: 0,
          bottom: 0,
          right: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <iframe
          src="http://digitalbehaviorist.com/tools-for-you"
          width="100%"
          height="100%"
          frameBorder="0"
        ></iframe>
      </div>
    </AppLayout>
  );
};

export default Home;
