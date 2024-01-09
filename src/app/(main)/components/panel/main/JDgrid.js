"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import fb from "@/app/services/firebase";
import { useAuth } from "@/app/hooks/useAuth";
import JDcard from "./JDcard";
import {
  BsBookmark,
  BsBookmarkCheck,
  BsEyeSlash,
  BsFlag,
} from "../../../icons";

const JDgrid = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setCurrentUserUid(user?.uid);
      // console.log(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const getJobs = async () => {
      const db = fb.getFirestore();
      const jobsArray = [];
      const querySnapshot = await getDocs(collection(db, "jobs"));
      querySnapshot.forEach((doc) => {
        jobsArray.push({ id: doc.id, ...doc.data() });
      });
      setJobs(jobsArray);
    };

    getJobs();

    const getSavedJobs = async () => {
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

        // get saved jobs and set it to state
        setSavedJobs(userDoc.saved || []);
        // get applied jobs and set it to state
        setAppliedJobs(userDoc.applied || []);
        // get hidden jobs and set it to state
        setHiddenJobs(userDoc.hidden || []);
      }
    };

    getSavedJobs();
  }, [currentUserUid]);

  const handleSaveJobClick = async (job) => {
    if (!currentUserUid) {
      router.push("/auth");
      return;
    }
    try {
      const db = fb.getFirestore();

      // Query the user by uid
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0];

      // Update the user document
      await updateDoc(doc(db, "users", userDoc.id), {
        saved: arrayUnion(job.id),
      });

      // Update the state to remove the saved job
      setJobs((prevJobs) => prevJobs.filter((el) => el.id !== job.id));

      console.log("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error.message);
    }
  };
  const handleMarkAppliedClick = async (job) => {
    if (!currentUserUid) {
      router.push("/auth");
      return;
    }
    try {
      const db = fb.getFirestore();

      // Query the user by uid
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0];

      // Update the user document
      await updateDoc(doc(db, "users", userDoc.id), {
        applied: arrayUnion(job.id),
      });

      // Update the state to remove the saved job
      setJobs((prevJobs) => prevJobs.filter((el) => el.id !== job.id));

      console.log("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error.message);
    }
  };
  const handleHideJobClick = async (job) => {
    if (!currentUserUid) {
      router.push("/auth");
      return;
    }
    try {
      const db = fb.getFirestore();

      // Query the user by uid
      const q = query(
        collection(db, "users"),
        where("uid", "==", currentUserUid)
      );
      const querySnapshot = await getDocs(q);

      const userDoc = querySnapshot.docs[0];

      // Update the user document
      await updateDoc(doc(db, "users", userDoc.id), {
        hidden: arrayUnion(job.id),
      });

      // Update the state to remove the saved job
      setJobs((prevJobs) => prevJobs.filter((el) => el.id !== job.id));

      console.log("Job saved successfully!");
    } catch (error) {
      console.error("Error saving job:", error.message);
    }
  };
  const handleReportJobClick = () => {};

  const buttons = [
    {
      label: "Save Job",
      icon: BsBookmark,
      fn: handleSaveJobClick,
      color: "green",
    },
    {
      label: "Mark Applied",
      icon: BsBookmarkCheck,
      fn: handleMarkAppliedClick,
      color: "green",
    },
    {
      label: "Hide Job",
      icon: BsEyeSlash,
      fn: handleHideJobClick,
      color: "red",
    },
    {
      label: "Report Job",
      icon: BsFlag,
      fn: handleReportJobClick,
      color: "red",
    },
  ];

  const renderJDcard = () => {
    return jobs
      .filter((job) => !job.about_company !== true)
      .filter((job) => !savedJobs.includes(job.id))
      .filter((job) => !appliedJobs.includes(job.id))
      .filter((job) => !hiddenJobs.includes(job.id))
      .map((job) => {
        return <JDcard key={job.id} job={job} buttons={buttons} />;
      });
  };

  return (
    <div className="infinite-scroll-component__outerdiv">
      <div className="infinite-scroll-component ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {renderJDcard()}
        </div>
      </div>
    </div>
  );
};

export default JDgrid;
