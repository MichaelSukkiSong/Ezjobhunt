import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import fb from "../services/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = fb.getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("user : ", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
