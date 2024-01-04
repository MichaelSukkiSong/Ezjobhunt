import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import fb from "../services/firebase";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = fb.getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);

      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
