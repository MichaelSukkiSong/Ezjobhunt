import fb from "@/app/services/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";

export async function saveJobs(jobs) {
  const db = fb.getFirestore();

  for (const job of jobs) {
    // Check if the job already exists in Firestore
    const querySnapshot = await getDocs(
      query(collection(db, "greenhouse"), where("id", "==", job.id))
    );

    if (querySnapshot.empty) {
      // Job does not exist, add it to Firestore
      try {
        const docRef = await addDoc(collection(db, "greenhouse"), {
          ...job,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      // Job already exists, skip
      console.log(
        `Job "${job.title}" already exists in Firestore. Skipping...`
      );
    }
  }
}
