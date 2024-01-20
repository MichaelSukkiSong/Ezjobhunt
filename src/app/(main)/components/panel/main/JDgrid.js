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
  limit,
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

const JDgrid = ({ filteringOptions }) => {
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [numVisibleJobs, setNumVisibleJobs] = useState(40);
  const user = useAuth();
  const router = useRouter();
  const {
    searchTerm,
    locations,
    remoteOnly,
    role,
    type,
    experience,
    transparentSalaries,
  } = filteringOptions;

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
      // TESTING
      // const q = query(collection(db, "jobs"), limit(500));
      // const querySnapshot = await getDocs(q);
      // ORIGINAL
      const querySnapshot = await getDocs(collection(db, "jobs"));
      querySnapshot.forEach((doc) => {
        jobsArray.push({ id: doc.id, ...doc.data() });
      });
      setJobs(jobsArray);
    };

    const getSavedAppliedHiddenJobs = async () => {
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

    getJobs();
    getSavedAppliedHiddenJobs();
  }, [currentUserUid]);

  //TODO
  useEffect(() => {
    const handleScroll = () => {
      // console.log("scroll working!");

      const { scrollHeight, scrollTop, clientHeight } = document.querySelector(
        "#infiniteJobsScrollDiv"
      );

      // console.log(scrollHeight, scrollTop, clientHeight);

      if (scrollHeight - scrollTop - clientHeight < 100) {
        // console.log("end of list!");

        const newNumVisibleJobs = numVisibleJobs + 40;
        setNumVisibleJobs(newNumVisibleJobs);
      }
    };

    document
      .querySelector("#infiniteJobsScrollDiv")
      .addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#infiniteJobsScrollDiv")
        .removeEventListener("scroll", handleScroll);
    };
  }, [numVisibleJobs]);

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
      color: "blue",
    },
    {
      label: "Mark Applied",
      icon: BsBookmarkCheck,
      fn: handleMarkAppliedClick,
      color: "blue",
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
      .filter((job) => {
        const searchTermMatch =
          job.job_title?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          job.requirements?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          job.tech_stack?.toLowerCase().includes(searchTerm?.toLowerCase());

        const remoteMatch =
          !remoteOnly || job.job_location?.toLowerCase().includes("remote");

        const transparentSalariesMatch =
          !transparentSalaries || job.salary_range;

        const roleMatch =
          role === "" || job.role?.toLowerCase() === role?.toLowerCase();

        const typeMatch =
          type === "" || job.job_type?.toLowerCase() === type?.toLowerCase();

        const experienceMatch =
          !experience ||
          experience?.length === 0 ||
          (experience[0] < job.min_years_experience &&
            job.min_years_experience < experience[1]);

        // const locationMatch =
        //   locations.length === 0 ||
        //   locations.some((location) =>
        //     job.job_location.toLowerCase().includes(location.toLowerCase())
        //   );

        return (
          searchTermMatch &&
          remoteMatch &&
          transparentSalariesMatch &&
          roleMatch &&
          typeMatch &&
          experienceMatch
        );
        // locationMatch &&
      })
      .slice(0, numVisibleJobs)
      .map((job) => {
        return <JDcard key={job.id} job={job} buttons={buttons} />;
      });
  };

  return (
    <div className="infinite-scroll-component__outerdiv">
      <div className="infinite-scroll-component ">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
          {renderJDcard()}
        </div>
      </div>
    </div>
  );
};

export default JDgrid;
