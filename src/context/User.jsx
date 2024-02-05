import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export default function UserProvider({ children }) {

  const [chosenService, setChosenService] = useState()
  const [user, setUser] = useState();
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    onUserChange();
  }, []);
  
  const onUserChange = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        try {
          const docSnapshot = await getDoc(userRef);
          const userDbData = docSnapshot.data();
          setUser({ ...userDbData });

        } catch (error) {
          console.log(error);
        }
      } else {
        setUser();
      }
    });
  };
  const setUserFromDb = async (user) => {
    const userRef = doc(db, "Users", user.uid);
    try {
      const docSnapshot = await getDoc(userRef);
      const userDbData = docSnapshot.data();
      setUser({ ...userDbData });
    } catch (error) {
      console.log(error);
    }
  };

  const shared = { user, setUser, setUserFromDb, signOutHandler, chosenService, setChosenService };
  return <UserContext.Provider value={shared}>{children}</UserContext.Provider>;
}
