import JDcard from "./JDcard";
import fb from "@/app/services/firebase";
import { collection, getDocs } from "firebase/firestore";

const JDgrid = () => {
  const renderJDcard = async () => {
    const db = fb.getFirestore();
    const querySnapshot = await getDocs(collection(db, "jobs"));
    querySnapshot.forEach((job) => {
      return <JDcard job={job.data()} />;
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
