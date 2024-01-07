"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Icon } from "@chakra-ui/react";
import { MdSettings } from "../icons";
import { useAuth } from "@/app/hooks/useAuth";
import fb from "@/app/services/firebase";
import JDcard from "../components/panel/main/JDcard";

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [savedJobsId, setSavedJobsId] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      setCurrentUserUid(user?.uid);
      // console.log(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const getSavedJobsId = async () => {
      if (!currentUserUid) return;

      const db = fb.getFirestore();

      // Query the user by uid
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0].data();

        // get saved jobsId and set it to state
        setSavedJobsId(userDoc.saved || []);
      }
    };

    getSavedJobsId();
  }, [currentUserUid]);

  useEffect(() => {
    // get saved jobs object
    const getSavedJobs = async () => {
      if (!savedJobsId) return;

      const db = fb.getFirestore();

      const querySnapshot = await getDocs(collection(db, "jobs"));
      const savedJobsArray = [];
      querySnapshot.forEach((doc) => {
        if (savedJobsId.includes(doc.id)) {
          savedJobsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setSavedJobs(savedJobsArray);
    };

    getSavedJobs();
  }, [savedJobsId]);

  const handleSaveJobClick = () => {};
  const handleMarkAppliedClick = () => {};
  const handleHideJobClick = () => {};
  const handleReportJobClick = () => {};

  const renderJDcard = () => {
    return savedJobs.map((job) => {
      return (
        <JDcard
          key={job.id}
          job={job}
          handleSaveJobClick={handleSaveJobClick}
          handleMarkAppliedClick={handleMarkAppliedClick}
          handleHideJobClick={handleHideJobClick}
          handleReportJobClick={handleReportJobClick}
        />
      );
    });
  };

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
              <span className="text-2xl font-bold">
                Your saved jobs ({savedJobs.length})
              </span>
              <div>
                <button className="underline font-medium">
                  Add an external job
                </button>
              </div>
            </div>
          </div>
          <div className="infinite-scroll-component__outerdiv">
            <div className="infinite-scroll-component ">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {renderJDcard()}
              </div>
            </div>
          </div>
          {savedJobs ? null : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
