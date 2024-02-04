import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import UserCard from "../../components/UserCard/UserCard";
import styles from './Swiper.module.css';

const Swiper = ({ userType }) => {
    const [servicesArr, setServicesArr] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                let serviceQuery;
                if (userType === 'employer') {
                    serviceQuery = query(
                        collection(db, 'Services'),
                        where('category', '==', 'Photographer'),
                        where('isActive', '==', true),
                        where('type', '==', 'freelancer'),
                    );
                } else if (userType === 'freelancer') {
                    serviceQuery = query(
                        collection(db, 'Services'),
                        where('category', '==', 'Photographer'),
                        where('isActive', '==', true),
                        where('type', '==', 'employer'),
                    );
                }

                const servicesSnapshot = await getDocs(serviceQuery);

                if (!servicesSnapshot.empty) {
                    const allServices = servicesSnapshot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }));
                    setServicesArr(allServices);
                } else {
                    console.error('No services found for the given category');
                }
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchServices();
    }, [userType]);

    // console.log(servicesArr);

    return (
        <div className={styles.container}>
            {servicesArr.length > 0 ? servicesArr.map((service, index) => (
                <UserCard key={index} service={service} />
            )) : <p>No Data Available</p>}
        </div>
    );
}

export default Swiper;
