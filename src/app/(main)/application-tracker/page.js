"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth";
import fb from "@/app/services/firebase";
import JDcard from "../components/panel/main/JDcard";
import {
  BsBookmark,
  BsBookmarkCheck,
  GoPaperAirplane,
  GrDocumentExcel,
  BsTrash3,
} from "../icons";

const Page = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [savedJobsId, setSavedJobsId] = useState([]);
  const [appliedJobsId, setAppliedJobsId] = useState([]);
  const [hiddenJobsId, setHiddenJobsId] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [interviewingJobs, setInterviewingJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const user = useAuth();

  useEffect(() => {
    if (user) {
      setCurrentUserUid(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    const getSavedAppliedHiddenJobsId = async () => {
      if (!currentUserUid) return;

      const db = fb.getFirestore();

      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0].data();

        setSavedJobsId(userDoc.saved || []);
        setAppliedJobsId(userDoc.applied || []);
        setHiddenJobsId(userDoc.hidden || []);
      }
    };

    getSavedAppliedHiddenJobsId();
  }, [currentUserUid]);

  useEffect(() => {
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

  useEffect(() => {
    const getAppliedJobs = async () => {
      if (!appliedJobsId) return;

      const db = fb.getFirestore();

      const querySnapshot = await getDocs(collection(db, "jobs"));
      const appliedJobsArray = [];
      querySnapshot.forEach((doc) => {
        if (appliedJobsId.includes(doc.id)) {
          appliedJobsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setAppliedJobs(appliedJobsArray);
    };

    getAppliedJobs();
  }, [appliedJobsId]);

  useEffect(() => {
    const getHiddenJobs = async () => {
      if (!hiddenJobsId) return;

      const db = fb.getFirestore();

      const querySnapshot = await getDocs(collection(db, "jobs"));
      const hiddenJobsArray = [];
      querySnapshot.forEach((doc) => {
        if (hiddenJobsId.includes(doc.id)) {
          hiddenJobsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setHiddenJobs(hiddenJobsArray);
    };

    getHiddenJobs();
  }, [hiddenJobsId]);

  const handleMoveToAppliedClick = () => {};
  const handleMoveToInterviewingClick = () => {};
  const handleMoveToRejectedClick = () => {};
  const handleDeleteJobClick = () => {};

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return renderSavedJobs();
      case 1:
        return renderAppliedJobs();
      case 2:
        return renderInterviewingJobs();
      case 3:
        return renderRejectedJobs();
      case 4:
        return renderHiddenJobs();
      default:
        return null;
    }
  };

  const buttonsForSavedSection = [
    {
      label: "Move to Applied",
      icon: BsBookmarkCheck,
      fn: handleMoveToAppliedClick,
      color: "blue",
    },
    {
      label: "Move to interviewing",
      icon: GoPaperAirplane,
      fn: handleMoveToInterviewingClick,
      color: "blue",
    },
    {
      label: "Move to rejected",
      icon: GrDocumentExcel,
      fn: handleMoveToRejectedClick,
      color: "red",
    },
    {
      label: "Delete",
      icon: BsTrash3,
      fn: handleDeleteJobClick,
      color: "red",
    },
  ];

  const buttonsForAppliedSection = [
    {
      label: "Move to Saved",
      icon: BsBookmark,
      fn: handleMoveToAppliedClick,
      color: "blue",
    },
    {
      label: "Move to interviewing",
      icon: GoPaperAirplane,
      fn: handleMoveToInterviewingClick,
      color: "blue",
    },
    {
      label: "Move to rejected",
      icon: GrDocumentExcel,
      fn: handleMoveToRejectedClick,
      color: "red",
    },
    {
      label: "Delete",
      icon: BsTrash3,
      fn: handleDeleteJobClick,
      color: "red",
    },
  ];

  const buttonsForHiddenSection = [
    {
      label: "Move to Saved",
      icon: BsBookmark,
      fn: handleMoveToAppliedClick,
      color: "blue",
    },
    {
      label: "Move to Applied",
      icon: BsBookmarkCheck,
      fn: handleMoveToAppliedClick,
      color: "blue",
    },
    {
      label: "Move to interviewing",
      icon: GoPaperAirplane,
      fn: handleMoveToInterviewingClick,
      color: "blue",
    },
    {
      label: "Move to rejected",
      icon: GrDocumentExcel,
      fn: handleMoveToRejectedClick,
      color: "red",
    },
    {
      label: "Delete",
      icon: BsTrash3,
      fn: handleDeleteJobClick,
      color: "red",
    },
  ];

  const renderSavedJobs = () => {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {savedJobs.map((job) => (
            <JDcard key={job.id} job={job} buttons={buttonsForSavedSection} />
          ))}
        </div>
        {savedJobs.length === 0 && (
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
      </>
    );
  };

  const renderAppliedJobs = () => {
    // Implement rendering for Applied Jobs
    // ...
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {appliedJobs.map((job) => (
            <JDcard key={job.id} job={job} buttons={buttonsForAppliedSection} />
          ))}
        </div>
        {appliedJobs.length === 0 && (
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
      </>
    );
  };

  const renderInterviewingJobs = () => {
    // Implement rendering for Interviewing Jobs
    // ...
  };

  const renderRejectedJobs = () => {
    // Implement rendering for Rejected Jobs
    // ...
  };

  const renderHiddenJobs = () => {
    // Implement rendering for Hidden Jobs
    // ...
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {hiddenJobs.map((job) => (
            <JDcard key={job.id} job={job} buttons={buttonsForHiddenSection} />
          ))}
        </div>
        {hiddenJobs.length === 0 && (
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
      </>
    );
  };

  return (
    <div className="md:h-screen overflow-x-hidden w-full">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2 lg:space-x-4 mx-4 pt-4 pb-2 overflow-x-auto scrollbar-hide bg-white">
              <button
                onClick={() => setActiveIndex(0)}
                className={`border text-sm lg:text-base px-2 py-1 lg:px-4 rounded  ${
                  activeIndex === 0
                    ? "border-black text-black font-bold"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                Saved
              </button>
              <button
                onClick={() => setActiveIndex(1)}
                className={`border text-sm lg:text-base px-2 py-1 lg:px-4 rounded  ${
                  activeIndex === 1
                    ? "border-black text-black font-bold"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                Applied
              </button>
              <button
                onClick={() => setActiveIndex(2)}
                className={`border text-sm lg:text-base px-2 py-1 lg:px-4 rounded  ${
                  activeIndex === 2
                    ? "border-black text-black font-bold"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                Interviewing
              </button>
              <button
                onClick={() => setActiveIndex(3)}
                className={`border text-sm lg:text-base px-2 py-1 lg:px-4 rounded  ${
                  activeIndex === 3
                    ? "border-black text-black font-bold"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                Rejected
              </button>
              <button
                onClick={() => setActiveIndex(4)}
                className={`border text-sm lg:text-base px-2 py-1 lg:px-4 rounded  ${
                  activeIndex === 4
                    ? "border-black text-black font-bold"
                    : "hover:bg-gray-100 text-gray-500"
                }`}
              >
                Hidden
              </button>
            </div>
            <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:items-center md:space-x-4 mt-2 p-4">
              <span className="text-2xl font-bold">
                {activeIndex === 0
                  ? `Your saved jobs (${savedJobs.length})`
                  : activeIndex === 1
                  ? `Your applied jobs (${appliedJobs.length})`
                  : activeIndex === 2
                  ? `Your interviewing jobs (${interviewingJobs.length})`
                  : activeIndex === 3
                  ? `Your rejected jobs (${rejectedJobs.length})`
                  : `Your hidden jobs (${hiddenJobs.length})`}
              </span>
              <div>
                <button className="underline font-medium">
                  Add an external job
                </button>
              </div>
            </div>
          </div>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Page;
