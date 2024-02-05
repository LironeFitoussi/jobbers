import { useContext, useEffect, useState } from "react";
import Swiper from "../../components/Swiper/Swiper";
import { UserContext } from "../../context/User";
import styles from "./Find.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
export default function Find() {
  const [serviceData, SetServiceData] = useState();
  const { id } = useParams();
  const { setChosenService } = useContext(UserContext);
  setChosenService(id);
  const getServiceType = async () => {
    const snapshot = await getDoc(doc(db, "Services", id));
    SetServiceData(snapshot.data());
  };

  useEffect(() => {
    getServiceType();
  }, [useParams]);

  return (
    <section className={styles.cardsContainerSection}>
      <header className={styles.cardsContainer}>
        <Swiper userType={serviceData?.type} />
      </header>
    </section>
  );
}
