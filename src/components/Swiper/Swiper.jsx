import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebase.js";
import UserCard from "../../components/UserCard/UserCard";
import styles from "./Swiper.module.css";
import { UserContext } from "../../context/User.jsx";

const Swiper = ({ userType }) => {
  const [servicesArr, setServicesArr] = useState([]);
  const { user } = useContext(UserContext);
  const { chosenService } = useContext(UserContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        let serviceQuery;
        if (userType === "Client") {
          serviceQuery = query(
            collection(db, "Services"),
            where("isActive", "==", true),
            where("type", "==", "Freelancer")
          );
        } else if (userType === "Freelancer") {
          serviceQuery = query(
            collection(db, "Services"),
            where("isActive", "==", true),
            where("type", "==", "Client")
          );
        }

        const servicesSnapshot = await getDocs(serviceQuery);

        if (!servicesSnapshot.empty) {
          const allServices = servicesSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          const matchesCollection = doc(db, "Matches", chosenService);

          const unsubscribe = onSnapshot(
            matchesCollection,
            (matchesSnapshot) => {
              const forbiddenIds = [];
              matchesSnapshot = matchesSnapshot.data();
              forbiddenIds.push(
                ...(matchesSnapshot.matches || []),
                ...(matchesSnapshot.disLike || []),
                ...(matchesSnapshot.iLiked || [])
              );

              const filteredServices = allServices.filter(
                (service) => !forbiddenIds.includes(service.id)
              );

              setServicesArr(filteredServices);
            }
          );

          return () => unsubscribe();
        } else {
          console.error("No services found for the given category");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [userType, chosenService]);

  return (
    <div className={styles.container}>
      {servicesArr.length > 0 ? (
        servicesArr.map((service, index) => (
          <UserCard key={index} service={service} isSwiper={true} />
        ))
      ) : (
        <p>No Data Available</p>
      )}
    </div>
  );
};

export default Swiper;
