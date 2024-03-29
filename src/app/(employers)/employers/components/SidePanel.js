"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Divider } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import {
  SearchIcon,
  ChatIcon,
  FiLock,
  MdSettings,
  MdLogout,
  MdArrowBackIosNew,
  BsBookmark,
  SiFoodpanda,
} from "../../../(main)/icons";
import fb from "@/app/services/firebase";
import { useAuth } from "@/app/hooks/useAuth";
import { saveUserToFirestore } from "@/app/utils/saveUserToFirestore";

const SidePanel = () => {
  const pathname = usePathname();
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      saveUserToFirestore(user);
    }
  }, [user]);

  const handleSignout = () => {
    const auth = fb.getAuth();
    auth
      .signOut()
      .then(() => {
        // Clear cookies and site data
        document.cookie.split(";").forEach((cookie) => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
        });
      })
      .catch((err) => {
        console.log("Error signing out", err);
      });

    router.replace("/");
    router.refresh();
  };

  return (
    <div className="flex flex-col overflow-y-auto scrollbar-hide md:w-52 ml-2">
      <div className="flex flex-col py-4 px-2">
        <div className="flex  font-bold text-xl mb-4 ">
          <div className="flex justify-center items-center mr-2">
            <Icon as={MdSettings} className="" />
          </div>
          <Link href="/">
            <span className="flex justify-center items-center">Ezjobhunt</span>
          </Link>
        </div>
        <div className="text-xs">Employers Portal</div>
      </div>
      <Divider />
      <Link href="/employers" className="py-4 text-sm text-orange-600">
        Post a Job
      </Link>
      <Divider />
      {/* <div className="flex flex-col py-4 ">
        <span className="text-xs font-bold text-gray-500">Profile</span>
        <div className="flex flex-col space-y-4">
          <Link
            href={user ? "/profile" : "/auth"}
            className={`flex items-center space-x-2 mt-4  font-medium text-sm ${
              pathname === "/profile" ? "bg-gray-200 py-1.5 px-2 rounded" : ""
            }`}
          >
            <Icon as={SiFoodpanda} />
            <span>Profile</span>
            {user ? null : <Icon as={FiLock} />}
          </Link>
          <Link
            href="/inbox"
            className={`flex items-center space-x-2 mt-4 mb-4 font-medium text-sm ${
              pathname === "/inbox" ? "bg-gray-200 py-1.5 px-2 rounded" : ""
            }`}
          >
            <ChatIcon />
            <span>Inbox</span>
          </Link>
        </div>
      </div>
      <Divider /> */}
      <div className="flex flex-col py-4 ">
        <span className="text-xs font-bold text-gray-500">
          Search Canidates
        </span>
        <div className="mt-4 flex flex-col space-y-4">
          <Link
            href="/employers"
            className={`flex items-center space-x-2 font-medium text-sm ${
              pathname === "/employers" ? "bg-gray-200 py-1.5 px-2 rounded" : ""
            }`}
          >
            <SearchIcon />
            <span>Search</span>
          </Link>
          {/* <Link
            href={user ? "/application-tracker" : "/auth"}
            className={`flex items-center space-x-2 font-medium text-sm ${
              pathname === "/application-tracker"
                ? "bg-gray-200 py-1.5 px-2 rounded"
                : ""
            }`}
          >
            <Icon as={BsBookmark} />
            <span>Track</span>
            {user ? null : <Icon as={FiLock} />}
          </Link> */}
          {/* <Link
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
            </Link> */}
        </div>
      </div>
      <Divider />
      <div className="flex flex-col py-4 px-2">
        <span className="text-xs font-bold text-gray-500">About Ezjobhunt</span>
        <div className="mt-4 flex flex-col space-y-4">
          {/* <Link href="/backlog">
            <span className="font-medium text-sm">Feature Requests</span>
          </Link> */}
          <span className="font-medium text-sm">How it Works</span>
        </div>
      </div>
      <div className="flex items-center justify-center bg-white py-4 border-t">
        <div className="flex font-bold text-l">
          <div className="flex justify-center items-center mr-2 text-orange-400">
            <Icon as={MdArrowBackIosNew} className="" />
          </div>
          <Link href="/jobs">
            <span className="flex justify-center items-center text-orange-400">
              Back to Jobs
            </span>
          </Link>
        </div>
        {/* {user ? (
          <div className="flex flex-col items-center space-y-2 mt-2 w-full">
            <span className="text-xs">{user.email}</span>
            <button
              onClick={handleSignout}
              className="flex items-center text-start space-x-2 text-red-600"
            >
              <Icon as={MdLogout} className="" />
              <span className="text-sm font-medium">Log Out</span>
            </button>
          </div>
        ) : (
          <Link
            href="/auth"
            className="w-full flex items-center text-center justify-center text-orange-800 text-sm font-medium bg-orange-200 py-2 rounded-full"
          >
            Log In / Sign Up
          </Link>
        )} */}
      </div>
    </div>
  );
};

export default SidePanel;
