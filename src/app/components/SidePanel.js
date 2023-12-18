'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Divider } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import {
  SearchIcon,
  ChatIcon,
  MdSettings,
  BsBookmark,
  BsBookmarkCheck,
  BsBookmarkX,
  BsEyeSlash,
  HiOutlinePaperAirplane,
  SiFoodpanda,
} from '../icons';

const SidePanel = () => {
  const pathname = usePathname();

  if (pathname === '/auth') {
    return null;
  }

  return (
    <div className="flex h-screen p-2 pt-8 border-r">
      <div className="flex flex-col ml-2 w-48 overflow-y-auto">
        <div className="flex flex-col py-4 px-2">
          <div className="flex  font-bold text-xl mb-4 ">
            <div className="flex justify-center items-center mr-2">
              <Icon as={MdSettings} className="" />
            </div>
            <span className="flex justify-center items-center">Ezjobhunt</span>
          </div>
          <div className="text-xs">
            Discover exciting jobs and track applications in one place.
          </div>
        </div>
        <Divider />
        <Link href="/employers" className="py-4 text-sm text-orange-600">
          Employers / Post a Job
        </Link>
        <Divider />
        <div className="flex flex-col py-4 px-2">
          <div className="flex items-center">
            <span className="text-xs font-bold text-gray-500">Job Search</span>
          </div>
          <div className="mt-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm bg-gray-200 py-1.5 px-2 rounded"
            >
              <SearchIcon />
              <span>Discover</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 mt-4 mb-4 font-medium text-sm "
            >
              <Icon as={SiFoodpanda} />
              <span>Mochi</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 mt-4 mb-4 font-medium text-sm "
            >
              <ChatIcon />
              <span>Inbox</span>
            </Link>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col py-4 px-2">
          <span className="text-xs font-bold text-gray-500">
            Application Tracker
          </span>
          <div className="mt-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm"
            >
              <Icon as={BsBookmark} />
              <span>Saved</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm"
            >
              <Icon as={BsBookmarkCheck} />
              <span>Applied</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm"
            >
              <Icon as={HiOutlinePaperAirplane} />
              <span>Interviewing</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm"
            >
              <Icon as={BsBookmarkX} />
              <span>Rejected</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 font-medium text-sm"
            >
              <Icon as={BsEyeSlash} />
              <span>Hidden</span>
            </Link>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col py-4 px-2">
          <span className="text-xs font-bold text-gray-500">
            About Ezjobhunt
          </span>
          <div className="mt-4 flex flex-col space-y-4">
            <span className="font-medium text-sm">Feature Requests</span>
            <span className="font-medium text-sm">How it Works</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white py-4 border-t">
          <Link
            href="/auth"
            className="w-full flex items-center text-center justify-center text-orange-800 text-sm font-medium bg-orange-200 py-2 rounded-full"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
