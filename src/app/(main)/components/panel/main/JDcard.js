'use client';

import {
  Icon,
  BsBookmark,
  BsBookmarkCheck,
  BsEyeSlash,
  BsFlag,
  CiSettings,
  FaRegFileLines,
  LuCoffee,
} from '../../../icons';

const JDcard = () => {
  return (
    <div className="relative flex flex-col lg:max-w-sm items-start justify-start text-start">
      <div className="flex flex-col items-start w-full rounded-3xl pt-2 overflow-auto hide-scrollbar border hover:border-yellow-600">
        <div className="flex flex-col text-start items-start px-4">
          <span className="font-bold text-start">
            HT Manager - My Auto Store
          </span>
          <button className="flex items-center space-x-1 text-start font-light text-sm">
            <span>@ EMR USA Metal Recycling</span>
            <CiSettings className="h-4 w-4 flex-none text-yellow-600" />
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col mt-2 px-4 space-y-2 text-sm">
            <div>
              📍
              <button className="text-start text-sm underline font-medium">
                Multiple Locations Available
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-xs text-gray-500">🏢 About</span>
              <span className="font-light">
                EMR is one of the world\u2019s leading metal recycling companies
                with a history spanning decades. Our mission is to provide our
                customers with efficient and reliable metal recycling services
                while minimizing the environmental impact of our ...
              </span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-xs text-gray-500">
                🎯 Requirements
              </span>
              <span className="font-light">
                Bachelor\u2019s Degree, 7 years of HR experience, 5 years of
                supervisory experience, advanced knowledge of MS Word, Excel,
                Outlook, PowerPoint, payroll software systems, SHRM
                certification, experience working in manufacturing,
                distribution,...
              </span>
            </div>
          </div>
          <div>
            <button className="flex items-center space-x-1.5 mx-4 mt-4 text-sm">
              <FaRegFileLines />
              <span className="font-medium">Full Job Description</span>
            </button>
          </div>
          <div className="flex text-sm items-center space-x-4 px-4 pb-4 mt-4">
            <button className="px-4 py-2 rounded font-medium bg-gray-200 ">
              Apply Now
            </button>
            <div className="flex items-center space-x-4">
              <button>
                <LuCoffee />
              </button>
              <div className="flex items-center space-x-4">
                <button className="h-4 w-4 flex-none text-green-600">
                  <Icon as={BsBookmark} />
                </button>
                <button className="h-4 w-4 flex-none text-green-600">
                  <Icon as={BsBookmarkCheck} />
                </button>
                <button className="h-4 w-4 flex-none text-red-600">
                  <Icon as={BsEyeSlash} />
                </button>
                <button className="h-4 w-4 flex-none text-red-600">
                  <Icon as={BsFlag} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDcard;
