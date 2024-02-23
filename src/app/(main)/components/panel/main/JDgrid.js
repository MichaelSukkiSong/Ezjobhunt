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
  startAfter,
  orderBy,
} from "firebase/firestore";
import fb from "@/app/services/firebase";
import { useAuth } from "@/app/hooks/useAuth";
import JDcard from "./JDcard";
import {
  BsBookmark,
  BsBookmarkCheck,
  BsEyeSlash,
  BsFlag,
  LuCoffee,
} from "../../../icons";

function removeDuplicateObjects(array) {
  return array.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.id === obj.id && t.name === obj.name)
  );
}

const JDgrid = ({ filteringOptions }) => {
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 50;
  const [lastVisible, setLastVisible] = useState(null);

  const [loading, setLoading] = useState(true);
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
    industry,
  } = filteringOptions;

  useEffect(() => {
    if (user) {
      setCurrentUserUid(user?.uid);
    }
  }, [user]);

  useEffect(() => {
    const getJobs = async () => {
      const db = fb.getFirestore();
      const jobsArray = [];
      // TESTING
      const first = query(
        collection(db, "jobs"),
        orderBy("job_title"),
        limit(jobsPerPage)
      );
      const documentSnapshots = await getDocs(first);

      // Get the last visible document
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      setLastVisible(lastVisible);
      // console.log("last", lastVisible);

      documentSnapshots.forEach((doc) => {
        jobsArray.push({ id: doc.id, ...doc.data() });
      });
      setJobs(jobsArray);
      setLoading(false);
    };

    const getSavedAppliedHiddenJobs = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getJobs();
    getSavedAppliedHiddenJobs();
  }, [currentUserUid]);

  useEffect(() => {
    const handleScroll = async () => {
      const { scrollHeight, scrollTop, clientHeight } = document.querySelector(
        "#infiniteJobsScrollDiv"
      );

      if (scrollHeight - scrollTop - clientHeight < 100) {
        console.log("you are at the end! fetch more jobs!");

        setCurrentPage(currentPage + 1);
      }
    };

    document
      .querySelector("#infiniteJobsScrollDiv")
      ?.addEventListener("scroll", handleScroll);

    return () => {
      document
        .querySelector("#infiniteJobsScrollDiv")
        ?.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  useEffect(() => {
    const loadNextJobs = async () => {
      setLoading(true);

      const db = fb.getFirestore();
      const jobsArray = [];

      const next = query(
        collection(db, "jobs"),
        orderBy("job_title"),
        startAfter(lastVisible),
        limit(jobsPerPage)
      );

      const documentSnapshots = await getDocs(next);

      setLastVisible(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

      documentSnapshots.forEach((doc) => {
        jobsArray.push({ id: doc.id, ...doc.data() });
      });
      setJobs((prev) => {
        return [...prev, ...jobsArray];
      });

      setLoading(false);
    };

    loadNextJobs();
  }, [currentPage]);

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

  const JDcard_etc_main = () => {
    return (
      <button>
        <LuCoffee />
      </button>
    );
  };

  const renderJDcard = () => {
    return removeDuplicateObjects(jobs)
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

        const industryMatch =
          !industry ||
          industry?.length === 0 ||
          industry.includes(job.industry);

        return (
          searchTermMatch &&
          remoteMatch &&
          transparentSalariesMatch &&
          roleMatch &&
          typeMatch &&
          experienceMatch &&
          industryMatch
        );
        // locationMatch &&
      })
      .map((job) => {
        return (
          <JDcard
            key={job.id}
            job={job}
            buttons={buttons}
            etc={JDcard_etc_main()}
          />
        );
      });
  };

  return (
    <div className="infinite-scroll-component__outerdiv">
      <div className="infinite-scroll-component ">
        {loading ? (
          <div className="flex flex-col justify-start items-center h-screen">
            <iframe
              src="https://lottie.host/embed/ffcbf3fd-52ff-4bf0-a4f4-9218f3fa44f3/eT8ajCvyLR.json"
              type="text/html"
            ></iframe>
            Loading Jobs...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 ">
            {renderJDcard()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JDgrid;
