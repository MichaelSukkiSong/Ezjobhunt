"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import fb from "@/app/services/firebase";
import { useAuth } from "@/app/hooks/useAuth";
import JDcard from "./JDcard";

const JDgrid = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
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
  const handleMarkAppliedClick = () => {};
  const handleHideJobClick = () => {};
  const handleReportJobClick = () => {};

  const renderJDcard = () => {
    return (
      jobs
        .filter((job) => !job.about_company !== true)
        // TODO
        .filter((job) => !savedJobs.includes(job.id))
        .map((job) => {
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
        })
    );
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
