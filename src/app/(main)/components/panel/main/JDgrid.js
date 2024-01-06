"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import fb from "@/app/services/firebase";
import { useAuth } from "@/app/hooks/useAuth";
import JDcard from "./JDcard";

const JDgrid = () => {
  const [jobs, setJobs] = useState([]);
  const user = useAuth();

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
  }, []);

  const renderJDcard = () => {
    return jobs
      .filter((job) => !job.about_company !== true)
      .filter((job) => !user.saved?.includes(job.id))
      .map((job) => {
        return <JDcard key={job.id} job={job} />;
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
