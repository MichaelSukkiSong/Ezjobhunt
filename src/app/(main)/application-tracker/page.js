"use client";

import Link from "next/link";
import { Icon } from "@chakra-ui/react";
import { MdSettings } from "../icons";

const Page = () => {
  return (
    <div className="md:h-screen overflow-x-hidden w-full">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col">
            {/* <div className="p-4 md:hidden">
              <div className="w-fit">
                <Link href="/">
                  <div className="flex items-center space-x-1">
                    <Icon as={MdSettings} className="h-6 w-6" />
                    <span className="text-xl font-extrabold">Ezjobhunt</span>
                  </div>
                </Link>
              </div>
            </div> */}
            <div className="flex items-center space-x-2 lg:space-x-4 mx-4 pt-4 pb-2 overflow-x-auto scrollbar-hide bg-white">
              <button className="border text-sm lg:text-base px-2 py-1 lg:px-4 rounded border-black text-black font-bold">
                Saved
              </button>
              <button className="border text-sm lg:text-base px-2 py-1 lg:px-4 rounded hover:bg-gray-100 text-gray-500">
                Applied
              </button>
              <button className="border text-sm lg:text-base px-2 py-1 lg:px-4 rounded hover:bg-gray-100 text-gray-500">
                interviewing
              </button>
              <button className="border text-sm lg:text-base px-2 py-1 lg:px-4 rounded hover:bg-gray-100 text-gray-500">
                Rejected
              </button>
              <button className="border text-sm lg:text-base px-2 py-1 lg:px-4 rounded hover:bg-gray-100 text-gray-500">
                Hidden
              </button>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-4 mt-2 p-4">
              <span className="text-2xl font-bold">Your saved jobs (0)</span>
              <div>
                <button className="underline font-medium">
                  Add an external job
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto items-center p-8 my-8 border rounded-xl m-4">
            <span className="text-xl font-bold">No saved jobs</span>
            <span className="mt-2 font-light">
              Start &nbsp;
              <Link className="text-blue-600" href="/">
                adding jobs
              </Link>
              &nbsp; to your list.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
