import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import fb from "../services/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = fb.getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("user : ", user);

      if (user) {
        const db = fb.getFirestore();

        // Check if the user already exists in Firestore
        const querySnapshot = await getDocs(
          query(collection(db, "users"), where("uid", "==", user.uid))
        );

        if (querySnapshot.empty) {
          // user does not exist, add it to Firestore
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

            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        } else {
          // user already exists, skip
          console.log(
            `user "${user.uid}" already exists in Firestore. Skipping...`
          );
        }
      }

      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
