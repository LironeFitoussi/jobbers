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

  const getServiceType = async () => {
    const snapshot = await getDoc(doc(db, "Services", id));
    console.log();
    SetServiceData(snapshot.data());
  };

  useEffect(() => {
    getServiceType();
  }, [useParams]);

  return (
    <section>
      <header className={styles.findPageHeader}>
        <h1>
          This is <b>Home</b> Page
        </h1>
        <Swiper userType={serviceData?.type} />
      </header>
    </section>
  );
}
