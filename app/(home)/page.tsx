"use client";
import React from "react";
import HomePage from "../../components/home";
import { useMediaQuery } from "react-responsive";

const Home = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return (
    <>
      <h1>반응형 테스트</h1>
      {isDesktopOrLaptop && <p style={{ background: "red" }}>Desktop</p>}
      {isTablet && <p style={{ background: "blue" }}>Tablet</p>}
      {isMobile && <p style={{ background: "green" }}>Mobile</p>}

      <HomePage />
    </>
  );
};

export default Home;
