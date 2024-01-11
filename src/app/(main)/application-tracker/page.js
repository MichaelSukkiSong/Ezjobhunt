"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  runTransaction,
} from "firebase/firestore";
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
  const [interviewingJobsId, setInterviewingJobsId] = useState([]);
  const [rejectedJobsId, setRejectedJobsId] = useState([]);
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
        setInterviewingJobsId(userDoc.interviewing || []);
        setRejectedJobsId(userDoc.rejected || []);
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
    const getInterviewingJobs = async () => {
      if (!interviewingJobsId) return;

      const db = fb.getFirestore();

      const querySnapshot = await getDocs(collection(db, "jobs"));
      const interviewingJobsArray = [];
      querySnapshot.forEach((doc) => {
        if (interviewingJobsId.includes(doc.id)) {
          interviewingJobsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setInterviewingJobs(interviewingJobsArray);
    };

    getInterviewingJobs();
  }, [interviewingJobsId]);

  useEffect(() => {
    const getRejectedJobs = async () => {
      if (!rejectedJobsId) return;

      const db = fb.getFirestore();

      const querySnapshot = await getDocs(collection(db, "jobs"));
      const rejectedJobsArray = [];
      querySnapshot.forEach((doc) => {
        if (rejectedJobsId.includes(doc.id)) {
          rejectedJobsArray.push({ id: doc.id, ...doc.data() });
        }
      });

      setRejectedJobs(rejectedJobsArray);
    };

    getRejectedJobs();
  }, [rejectedJobsId]);

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

  const handleMoveToSavedClick = async (job) => {
    const db = fb.getFirestore();

    try {
      await runTransaction(db, async (transaction) => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          // get user data
          const userDoc = querySnapshot.docs[0].data();
          // get user reference
          const userRef = doc(db, "users", querySnapshot.docs[0].id);

          const { applied, interviewing, rejected, hidden, saved } = userDoc;

          // function to remove the job
          const removeFromState = (stateArray) => {
            const index = stateArray.indexOf(job.id);
            if (index !== -1) {
              stateArray.splice(index, 1);
            }
          };

          // remove job from all arrays
          removeFromState(saved);
          removeFromState(applied);
          removeFromState(interviewing);
          removeFromState(rejected);
          removeFromState(hidden);

          // save job to saved array
          if (!saved.includes(job.id)) {
            saved.push(job.id);
          }

          // update user data
          await updateDoc(userRef, {
            applied,
            interviewing,
            rejected,
            hidden,
            saved,
          });
        }
      });

      // Update the local state and all relevant Id arrays to reflect the changes
      setSavedJobs([...savedJobs, job]);
      setAppliedJobs(appliedJobs.filter((j) => j.id !== job.id));
      setInterviewingJobs(interviewingJobs.filter((j) => j.id !== job.id));
      setRejectedJobs(rejectedJobs.filter((j) => j.id !== job.id));
      setHiddenJobs(hiddenJobs.filter((j) => j.id !== job.id));

      // Update Id arrays
      setSavedJobsId([...savedJobsId, job.id]);
      setAppliedJobsId(appliedJobsId.filter((id) => id !== job.id));
      setInterviewingJobsId(interviewingJobsId.filter((id) => id !== job.id));
      setRejectedJobsId(rejectedJobsId.filter((id) => id !== job.id));
      setHiddenJobsId(hiddenJobsId.filter((id) => id !== job.id));
    } catch (error) {
      console.error("Error moving job to saved:", error.message);
      // Handle error, show a notification, etc.
    }
  };

  const handleMoveToAppliedClick = async (job) => {
    const db = fb.getFirestore();

    try {
      await runTransaction(db, async (transaction) => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          // get user data
          const userDoc = querySnapshot.docs[0].data();
          // get user reference
          const userRef = doc(db, "users", querySnapshot.docs[0].id);

          const { applied, interviewing, rejected, hidden, saved } = userDoc;

          // function to remove the job
          const removeFromState = (stateArray) => {
            const index = stateArray.indexOf(job.id);
            if (index !== -1) {
              stateArray.splice(index, 1);
            }
          };

          // remove job from all arrays
          removeFromState(saved);
          removeFromState(applied);
          removeFromState(interviewing);
          removeFromState(rejected);
          removeFromState(hidden);

          // save job to applied array
          if (!applied.includes(job.id)) {
            applied.push(job.id);
          }

          // update user data
          await updateDoc(userRef, {
            applied,
            interviewing,
            rejected,
            hidden,
            saved,
          });
        }
      });

      // Update the local state and all relevant Id arrays to reflect the changes
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
      setAppliedJobs([...appliedJobs, job]);
      setInterviewingJobs(interviewingJobs.filter((j) => j.id !== job.id));
      setRejectedJobs(rejectedJobs.filter((j) => j.id !== job.id));
      setHiddenJobs(hiddenJobs.filter((j) => j.id !== job.id));

      // Update Id arrays
      setSavedJobsId(savedJobsId.filter((id) => id !== job.id));
      setAppliedJobsId([...appliedJobsId, job.id]);
      setInterviewingJobsId(interviewingJobsId.filter((id) => id !== job.id));
      setRejectedJobsId(rejectedJobsId.filter((id) => id !== job.id));
      setHiddenJobsId(hiddenJobsId.filter((id) => id !== job.id));
    } catch (error) {
      console.error("Error moving job to applied:", error.message);
      // Handle error, show a notification, etc.
    }
  };

  const handleMoveToInterviewingClick = async (job) => {
    const db = fb.getFirestore();

    try {
      await runTransaction(db, async (transaction) => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          // get user data
          const userDoc = querySnapshot.docs[0].data();
          // get user reference
          const userRef = doc(db, "users", querySnapshot.docs[0].id);

          const { applied, interviewing, rejected, hidden, saved } = userDoc;

          // function to remove the job
          const removeFromState = (stateArray) => {
            const index = stateArray.indexOf(job.id);
            if (index !== -1) {
              stateArray.splice(index, 1);
            }
          };

          // remove job from all arrays
          removeFromState(saved);
          removeFromState(applied);
          removeFromState(interviewing);
          removeFromState(rejected);
          removeFromState(hidden);

          // save job to interviewing array
          if (!interviewing.includes(job.id)) {
            interviewing.push(job.id);
          }

          // update user data
          await updateDoc(userRef, {
            applied,
            interviewing,
            rejected,
            hidden,
            saved,
          });
        }
      });

      // Update the local state and all relevant Id arrays to reflect the changes
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
      setAppliedJobs(appliedJobs.filter((j) => j.id !== job.id));
      setInterviewingJobs([...interviewingJobs, job]);
      setRejectedJobs(rejectedJobs.filter((j) => j.id !== job.id));
      setHiddenJobs(hiddenJobs.filter((j) => j.id !== job.id));

      // Update Id arrays
      setSavedJobsId(savedJobsId.filter((id) => id !== job.id));
      setAppliedJobsId(appliedJobsId.filter((id) => id !== job.id));
      setInterviewingJobsId([...interviewingJobsId, job.id]);
      setRejectedJobsId(rejectedJobsId.filter((id) => id !== job.id));
      setHiddenJobsId(hiddenJobsId.filter((id) => id !== job.id));
    } catch (error) {
      console.error("Error moving job to interviewing:", error.message);
      // Handle error, show a notification, etc.
    }
  };

  const handleMoveToRejectedClick = async (job) => {
    const db = fb.getFirestore();

    try {
      await runTransaction(db, async (transaction) => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          // get user data
          const userDoc = querySnapshot.docs[0].data();
          // get user reference
          const userRef = doc(db, "users", querySnapshot.docs[0].id);

          const { applied, interviewing, rejected, hidden, saved } = userDoc;

          // function to remove the job
          const removeFromState = (stateArray) => {
            const index = stateArray.indexOf(job.id);
            if (index !== -1) {
              stateArray.splice(index, 1);
            }
          };

          // remove job from all arrays
          removeFromState(saved);
          removeFromState(applied);
          removeFromState(interviewing);
          removeFromState(rejected);
          removeFromState(hidden);

          // save job to rejected array
          if (!rejected.includes(job.id)) {
            rejected.push(job.id);
          }

          // update user data
          await updateDoc(userRef, {
            applied,
            interviewing,
            rejected,
            hidden,
            saved,
          });
        }
      });

      // Update the local state and all relevant Id arrays to reflect the changes
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
      setAppliedJobs(appliedJobs.filter((j) => j.id !== job.id));
      setInterviewingJobs(interviewingJobs.filter((j) => j.id !== job.id));
      setRejectedJobs([...rejectedJobs, job]);
      setHiddenJobs(hiddenJobs.filter((j) => j.id !== job.id));

      // Update Id arrays
      setSavedJobsId(savedJobsId.filter((id) => id !== job.id));
      setAppliedJobsId(appliedJobsId.filter((id) => id !== job.id));
      setInterviewingJobsId(interviewingJobsId.filter((id) => id !== job.id));
      setRejectedJobsId([...rejectedJobsId, job.id]);
      setHiddenJobsId(hiddenJobsId.filter((id) => id !== job.id));
    } catch (error) {
      console.error("Error moving job to rejected:", error.message);
      // Handle error, show a notification, etc.
    }
  };

  const handleDeleteJobClick = async (job) => {
    const db = fb.getFirestore();

    try {
      await runTransaction(db, async (transaction) => {
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUserUid)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          // get user data
          const userDoc = querySnapshot.docs[0].data();
          // get user reference
          const userRef = doc(db, "users", querySnapshot.docs[0].id);

          const { applied, interviewing, rejected, hidden, saved } = userDoc;

          // function to remove the job
          const removeFromState = (stateArray) => {
            const index = stateArray.indexOf(job.id);
            if (index !== -1) {
              stateArray.splice(index, 1);
            }
          };

          // remove job from all arrays
          removeFromState(saved);
          removeFromState(applied);
          removeFromState(interviewing);
          removeFromState(rejected);
          removeFromState(hidden);

          // update user data
          await updateDoc(userRef, {
            applied,
            interviewing,
            rejected,
            hidden,
            saved,
          });
        }
      });

      // Update the local state and all relevant Id arrays to reflect the changes
      setSavedJobs(savedJobs.filter((j) => j.id !== job.id));
      setAppliedJobs(appliedJobs.filter((j) => j.id !== job.id));
      setInterviewingJobs(interviewingJobs.filter((j) => j.id !== job.id));
      setRejectedJobs(rejectedJobs.filter((j) => j.id !== job.id));
      setHiddenJobs(hiddenJobs.filter((j) => j.id !== job.id));

      // Update Id arrays
      setSavedJobsId(savedJobsId.filter((id) => id !== job.id));
      setAppliedJobsId(appliedJobsId.filter((id) => id !== job.id));
      setInterviewingJobsId(interviewingJobsId.filter((id) => id !== job.id));
      setRejectedJobsId(rejectedJobsId.filter((id) => id !== job.id));
      setHiddenJobsId(hiddenJobsId.filter((id) => id !== job.id));
    } catch (error) {
      console.error("Error deleting job:", error.message);
      // Handle error, show a notification, etc.
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
      fn: handleMoveToSavedClick,
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

  const buttonsForInterviewingSection = [
    {
      label: "Move to Saved",
      icon: BsBookmark,
      fn: handleMoveToSavedClick,
      color: "blue",
    },
    {
      label: "Move to Applied",
      icon: BsBookmarkCheck,
      fn: handleMoveToAppliedClick,
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

  const buttonsForRejectedSection = [
    {
      label: "Move to Saved",
      icon: BsBookmark,
      fn: handleMoveToSavedClick,
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
      fn: handleMoveToSavedClick,
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

  const renderJobs = (jobs, buttons) => {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
          {jobs.map((job) => (
            <JDcard key={job.id} job={job} buttons={buttons} />
          ))}
        </div>
        {jobs.length === 0 && (
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

  const renderContent = () => {
    switch (activeIndex) {
      case 0:
        return renderJobs(savedJobs, buttonsForSavedSection);
      case 1:
        return renderJobs(appliedJobs, buttonsForAppliedSection);
      case 2:
        return renderJobs(interviewingJobs, buttonsForInterviewingSection);
      case 3:
        return renderJobs(rejectedJobs, buttonsForRejectedSection);
      case 4:
        return renderJobs(hiddenJobs, buttonsForHiddenSection);
      default:
        return null;
    }
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
