import { collection, getDocs } from "firebase/firestore";
import fb from "@/app/services/firebase";
import JDcard from "./JDcard";

const JDgrid = async () => {
  const jobs = await fetchJobs();

  const renderJDcard = () => {
    return jobs.map((job) => {
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

async function fetchJobs() {
  const db = fb.getFirestore();
  const jobs = [];
  const querySnapshot = await getDocs(collection(db, "jobs"));
  querySnapshot.forEach((doc) => {
    jobs.push({ id: doc.id, ...doc.data() });
  });

  return jobs;
}
