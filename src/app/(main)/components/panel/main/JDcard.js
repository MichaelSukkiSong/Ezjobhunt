"use client";

import { Tooltip } from "@chakra-ui/react";
import { Icon, CiSettings, FaRegFileLines, LuCoffee } from "../../../icons";

const JDcard = ({ job, buttons }) => {
  const renderButtons = () => {
    return buttons.map(({ label, icon, fn, color }, index) => {
      return (
        <div key={index}>
          <Tooltip label={label}>
            <button
              onClick={() => fn(job)}
              className={`h-4 w-4 flex-none text-${color}-600`}
            >
              <Icon as={icon} />
            </button>
          </Tooltip>
        </div>
      );
    });
  };

  return (
    <div className="relative flex flex-col lg:max-w-sm items-start justify-start text-start">
      <div className="flex flex-col items-start w-full rounded-3xl pt-2 overflow-auto hide-scrollbar border hover:border-yellow-600">
        <div className="flex flex-col text-start items-start px-4">
          <span className="font-bold text-start">{job.job_title}</span>
          <button className="flex items-center space-x-1 text-start font-light text-sm">
            <span>@ {job.job_company}</span>
            <CiSettings className="h-4 w-4 flex-none text-yellow-600" />
          </button>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col mt-2 px-4 space-y-2 text-sm">
            <div>
              📍
              <button className="text-start text-sm underline font-medium">
                {job.job_location}
              </button>
            </div>
            <div>
              💰
              <button className="text-start text-sm underline font-medium">
                {job.salary_range}
              </button>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-xs text-gray-500">🏢 About</span>
              <span className="font-light">{job.about_company}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-xs text-gray-500">
                🎯 Requirements
              </span>
              <span className="font-light">{job.requirements}</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-xs text-gray-500">💻 Tech</span>
              <span className="font-light">{job.tech_stack}</span>
            </div>
          </div>
          <div>
            <a href={job.job_url} target="_blank">
              <button className="flex items-center space-x-1.5 mx-4 mt-4 text-sm">
                <FaRegFileLines />
                <span className="font-medium">Full Job Description</span>
              </button>
            </a>
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
                {renderButtons()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JDcard;
