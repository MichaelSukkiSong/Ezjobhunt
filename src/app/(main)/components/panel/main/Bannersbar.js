"use client";

import { useState } from "react";
import {
  Icon,
  AiOutlineHeart,
  AiOutlineInsurance,
  BsMic,
  BsCart2,
  CiDeliveryTruck,
  GiArtificialHive,
  GrInsecure,
  GoLaw,
  LiaRobotSolid,
  LuGraduationCap,
  RiComputerLine,
  RiMoneyDollarCircleLine,
  RiGovernmentLine,
  SiHiveBlockchain,
  PiDnaBold,
  PiTelegramLogo,
  PiBowlFoodBold,
  TiWeatherPartlySunny,
  TbBuildingEstate,
} from "../../../icons";

const Bannersbar = ({ setFilteringOptions }) => {
  const [selectedIndustries, setSelectedIndustries] = useState([]);

  const handleIndustryClick = (industry) => {
    let newSelectedIndustries = [...selectedIndustries];
    const index = newSelectedIndustries.indexOf(industry);
    if (index !== -1) {
      newSelectedIndustries.splice(index, 1);
    } else {
      newSelectedIndustries.push(industry);
    }
    setSelectedIndustries(newSelectedIndustries);
    setFilteringOptions((prevOptions) => ({
      ...prevOptions,
      industry: newSelectedIndustries,
    }));
  };

  return (
    <div className="mt-4 flex-auto flex items-center justify-center overflow-hidden">
      <div className="flex space-x-4 overflow-x-scroll hide-scrollbar">
        <button
          onClick={() => handleIndustryClick("HR Software")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("HR Software")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={RiComputerLine} />
          <span>HR Software</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Accounting Software")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Accounting Software")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={RiComputerLine} />
          <span>Accounting Software</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Health & Wellness")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Health & Wellness")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={AiOutlineHeart} />
          <span>Health & Wellness</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Financial Technology")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Financial Technology")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={RiMoneyDollarCircleLine} />
          <span>Financial Technology</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Education")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Education")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={LuGraduationCap} />
          <span>Education</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Transportation")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Transportation")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={CiDeliveryTruck} />
          <span>Transportation</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Media & Entertainment")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Media & Entertainment")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={BsMic} />
          <span>Media & Entertainment</span>
        </button>
        <button
          onClick={() => handleIndustryClick("E-Commerce")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("E-Commerce")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={BsCart2} />
          <span>E-Commerce</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Blockchain")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Blockchain")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={SiHiveBlockchain} />
          <span>Blockchain</span>
        </button>
        <button
          onClick={() => handleIndustryClick("AI/ML")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("AI/ML")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={GiArtificialHive} />
          <span>AI/ML</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Food")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Food")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={PiBowlFoodBold} />
          <span>Food</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Non-Profit")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Non-Profit")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={AiOutlineHeart} />
          <span>Non-Profit</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Government")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Government")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={RiGovernmentLine} />
          <span>Government</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Biotechnology")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Biotechnology")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={PiDnaBold} />
          <span>Biotechnology</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Cybersecurity")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Cybersecurity")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={GrInsecure} />
          <span>Cybersecurity</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Legal")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Legal")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={GoLaw} />
          <span>Legal</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Insurance")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Insurance")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={AiOutlineInsurance} />
          <span>Insurance</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Telecommunications")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Telecommunications")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={PiTelegramLogo} />
          <span>Telecommunications</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Climate Tech")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Climate Tech")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={TiWeatherPartlySunny} />
          <span>Climate Tech</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Real Estate & Construction")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Real Estate & Construction")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={TbBuildingEstate} />
          <span>Real Estate & Construction</span>
        </button>
        <button
          onClick={() => handleIndustryClick("SaaS / B2B")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("SaaS / B2B")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={LiaRobotSolid} />
          <span>SaaS / B2B</span>
        </button>
        <button
          onClick={() => handleIndustryClick("Industrials")}
          className={`flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium   border ${
            selectedIndustries.includes("Industrials")
              ? "bg-black text-white"
              : "text-gray-600 bg-white"
          }`}
        >
          <Icon as={LiaRobotSolid} />
          <span>Industrials</span>
        </button>
      </div>
    </div>
  );
};

export default Bannersbar;
