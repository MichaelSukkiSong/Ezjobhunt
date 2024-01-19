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
  BsBookmark,
  SiFoodpanda,
} from "../icons";
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
    auth.signOut();
    router.push("/");
  };

  return (
    <div className="hidden md:flex h-screen p-2 pt-8 border-r">
      <div className="flex flex-col ml-2 w-48 overflow-y-auto">
        <div className="flex flex-col py-4 px-2">
          <div className="flex  font-bold text-xl mb-4 ">
            <div className="flex justify-center items-center mr-2">
              <Icon as={MdSettings} className="" />
            </div>
            <Link href="/">
              <span className="flex justify-center items-center">
                Ezjobhunt
              </span>
            </Link>
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
        <div className="flex flex-col py-4 ">
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
        <Divider />
        <div className="flex flex-col py-4 ">
          <span className="text-xs font-bold text-gray-500">Job Search</span>
          <div className="mt-4 flex flex-col space-y-4">
            <Link
              href="/"
              className={`flex items-center space-x-2 font-medium text-sm ${
                pathname === "/" ? "bg-gray-200 py-1.5 px-2 rounded" : ""
              }`}
            >
              <SearchIcon />
              <span>Discover</span>
            </Link>
            <Link
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
            </Link>
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
          <span className="text-xs font-bold text-gray-500">
            About Ezjobhunt
          </span>
          <div className="mt-4 flex flex-col space-y-4">
            <Link href="/backlog">
              <span className="font-medium text-sm">Feature Requests</span>
            </Link>
            <span className="font-medium text-sm">How it Works</span>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white py-4 border-t">
          {user ? (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default SidePanel;
