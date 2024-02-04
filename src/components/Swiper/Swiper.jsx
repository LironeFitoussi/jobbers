import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import UserCard from "../../components/UserCard/UserCard";
import styles from './Swiper.module.css'

const Swiper = ({ userPref }) => {
    const [servicesArr, setServicesArr] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollectionRef = collection(db, 'Services');
                const serviceQuery = query(
                    servicesCollectionRef,
                    where('category', '==', 'Photographer'),
                    where('isActive', '==', true)
                );
                const servicesSnapshot = await getDocs(serviceQuery);

                if (!servicesSnapshot.empty) {
                    const allServices = servicesSnapshot.docs.map(doc => doc.data());
                    setServicesArr(allServices);
                } else {
                    console.error('No services found for the given category');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, []);

    console.log(servicesArr);

    return (
        <div className={styles.container}>
            {servicesArr.length > 0 ? servicesArr.map((service, index) => (
                <UserCard key={index} service={service} />
            )) : <p>No Data Available</p>}
        </div>
    );
}

export default Swiper;
