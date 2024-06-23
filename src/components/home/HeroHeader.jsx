"use client";
import { ReactTyped } from "react-typed";

const HeroHeader = () => {
  return (
    <h1 className="font-bold text-3xl lg:text-5xl my-4 text-center lg:w-8/12 mx-auto">
      Search your desire bangla subtitle of <br />
      <ReactTyped
        strings={["Movie", "TV Series", "Documentary", "Celebraty Interview"]}
        typeSpeed={100}
        backSpeed={80}
        loop
      ></ReactTyped>
    </h1>
  );
};

export default HeroHeader;
