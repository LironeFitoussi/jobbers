import styles from "./Matches.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Matches() {
  const { user } = useContext(UserContext);
  const [matchData, setMatchData] = useState([]);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const serviceQuery = query(
          collection(db, "Services"),
          where("uid", "==", user.uid)
        );
        const serviceSnapshot = await getDocs(serviceQuery);

        let tempArr = [];
        serviceSnapshot.docs.map((item) => {
          tempArr.push({ ...item.data(), id: item.id });
        });
        setServiceData(tempArr);

        if (!serviceSnapshot.empty) {
          const promises = tempArr.map(async (item) => {
            const matchDoc = await getDoc(doc(db, "Matches", item.id));
            return matchDoc.data().matches;
          });

          const resolvedMatches = await Promise.all(promises);
          setMatchData(resolvedMatches.flat()); // Flatten the array of arrays
        } else {
          console.error("No services found for the user");
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, [user]);

  useEffect(() => {
    if (matchData) {
      const fetchData = async () => {
        try {
          const data = [];
          for (const service of matchData) {
            const serviceDoc = await getDoc(doc(db, "Services", service));
            if (serviceDoc.exists()) {
              data.push(serviceDoc.data());
            } else {
              console.error("Service document not found for id:", service);
            }
          }
          setServiceData(data);
        } catch (error) {
          console.error("Error fetching service:", error);
        }
      };
      fetchData();
    }
  }, [matchData]);

  return (
    <section className={styles.matchesContainer}>
      <h1 style={{ textAlign: "center" }}>
        Your Matches{" "}
        <button
          onClick={() => {
            console.log(matchData);
          }}></button>
      </h1>
      {matchData ? (
        <div className={styles.matchContainer}>
          {serviceData?.map((service, index) => {
            return (
              <div key={index} className={styles.match}>
                <img
                  src="https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc="
                  alt="profileimg"
                />
                <div>
                  <p>{`${service.fName} ${service.lName}`}</p>
                  <span>{service.category}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    window.open(
                      `https://api.whatsapp.com/send?phone=${phoneNumber}&text=Ready%20to%20Start%20Working%3F`,
                      "_blank"
                    );
                  }}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png"
                    alt="WhatsApp Icon"
                  />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div>You have no matches yet :/</div>
      )}
    </section>
  );
}
