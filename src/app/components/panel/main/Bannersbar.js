'use client';

import { Icon } from '@chakra-ui/icons';
import { AiOutlineHeart, AiOutlineInsurance } from 'react-icons/ai';
import { BsMic, BsCart2 } from 'react-icons/bs';
import { CiDeliveryTruck } from 'react-icons/ci';
import { GiArtificialHive } from 'react-icons/gi';
import { GrInsecure } from 'react-icons/gr';
import { GoLaw } from 'react-icons/go';
import { LiaRobotSolid } from 'react-icons/lia';
import { LuGraduationCap } from 'react-icons/lu';
import {
  RiComputerLine,
  RiMoneyDollarCircleLine,
  RiGovernmentLine,
} from 'react-icons/ri';
import { SiHiveBlockchain } from 'react-icons/si';
import { PiDnaBold, PiTelegramLogo, PiBowlFoodBold } from 'react-icons/pi';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { TbBuildingEstate } from 'react-icons/tb';

const Bannersbar = () => {
  return (
    <div className="flex items-center my-2 mb-4 ml-2 space-x-4">
      <div className="flex items-center justify-center overflow-hidden">
        <div className="flex space-x-4 lg:space-x-4 overflow-x-scroll hide-scrollbar ">
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={RiComputerLine} />
            <span>Computer Software</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={AiOutlineHeart} />
            <span>Health & Wellness</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={RiMoneyDollarCircleLine} />
            <span>Financial Technology</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={LuGraduationCap} />
            <span>Education</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={CiDeliveryTruck} />
            <span>Transportation</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={BsMic} />
            <span>Media & Entertainment</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={BsCart2} />
            <span>E-Commerce</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={SiHiveBlockchain} />
            <span>Blockchain</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={GiArtificialHive} />
            <span>AI/ML</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={PiBowlFoodBold} />
            <span>Food</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={AiOutlineHeart} />
            <span>Non-Profit</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={RiGovernmentLine} />
            <span>Government</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={PiDnaBold} />
            <span>Biotechnology</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={GrInsecure} />
            <span>Cybersecurity</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={GoLaw} />
            <span>Legal</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={AiOutlineInsurance} />
            <span>Insurance</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={PiTelegramLogo} />
            <span>Telecommunications</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={TiWeatherPartlySunny} />
            <span>Climate Tech</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={TbBuildingEstate} />
            <span>Real Estate & Construction</span>
          </button>
          <button className="flex flex-none items-center space-x-2 p-2 rounded-full text-xs font-medium text-gray-600 bg-white border">
            <Icon as={LiaRobotSolid} />
            <span>Robotics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bannersbar;
