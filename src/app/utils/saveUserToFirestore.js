import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import fb from "../services/firebase";

export async function saveUserToFirestore(user) {
  const db = fb.getFirestore();

  // Check if the user already exists in Firestore
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("uid", "==", user.uid))
  );

  if (querySnapshot.empty) {
    // User does not exist, add it to Firestore
    try {
      const docRef = await addDoc(collection(db, "users"), {
        uid: user?.uid,
        name: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
        providerData: user?.providerData[0],
        saved: [],
        applied: [],
        interviewing: [],
        rejected: [],
        hidden: [],
      });

      console.log("User document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } else {
    // User already exists, skip
    console.log(`User "${user.uid}" already exists in Firestore. Skipping...`);
  }
}
