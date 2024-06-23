"use client";
import { useState } from "react";
import Marquee from "react-fast-marquee";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MarQueComponent = ({ genres }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: "Tab 1", content: "This is the content of Tab 1." },
    { title: "Tab 2", content: "This is the content of Tab 2." },
    { title: "Tab 3", content: "This is the content of Tab 3." },
    { title: "Tab 4", content: "This is the content of Tab 4." },
    { title: "Tab 1", content: "This is the content of Tab 1." },
    { title: "Tab 2", content: "This is the content of Tab 2." },
    { title: "Tab 3", content: "This is the content of Tab 3." },
    { title: "Tab 4", content: "This is the content of Tab 4." },
  ];

  const handlePrev = () => {
    setActiveTab((prevTab) =>
      prevTab === 0 ? genres.length - 1 : prevTab - 1
    );
  };

  const handleNext = () => {
    setActiveTab((prevTab) =>
      prevTab === genres.length - 1 ? 0 : prevTab + 1
    );
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex justify-center flex-col cursor-pointer bg-purple-600 w-10 h-8 rounded-full text-white px-2 text-gray-600 hover:text-gray-800">
        <FaArrowLeft onClick={handlePrev} />
      </div>

      <div className="flex overflow-hidden">
        <Marquee>
          {genres.map((genre, index) => (
            <div
              key={index}
              className={`px-4 py-2 m-2 cursor-pointer rounded-full ${
                index === activeTab
                  ? "bg-purple-500 text-white"
                  : "bg-gray-400 text-gray-800"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {genre}
            </div>
          ))}
        </Marquee>
      </div>
      <div className="flex justify-center flex-col cursor-pointer bg-purple-600 w-10 h-8 rounded-full text-white px-2 text-gray-600 hover:text-gray-800">
      <FaArrowRight
        
        onClick={handleNext}
      />
      </div>
      
    </div>
  );
};

export default MarQueComponent;
