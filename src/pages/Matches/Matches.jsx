import styles from './Matches.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User'
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function Matches() {
    const { user } = useContext(UserContext)
    const [matchData, setMatchData] = useState(null);
    const [serviceData, setServiceData] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const serviceQuery = query(
                    collection(db, 'Services'),
                    where('uid', '==', user.uid),
                );
                const serviceSnapshot = await getDocs(serviceQuery);

                if (!serviceSnapshot.empty) {
                    const serviceDoc = serviceSnapshot.docs[0];
                    const serviceId = serviceDoc.id;

                    const matchDoc = await getDoc(doc(db, 'Matches', serviceId));
                    if (matchDoc.exists()) {
                        setMatchData(matchDoc.data().matches);
                    } else {
                        console.error('No match found for the user');
                    }
                } else {
                    console.error('No service found for the user');
                }
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        };

        fetchMatches();
    }, [user.uid]);

    useEffect(() => {
        if (matchData) {
            const fetchData = async () => {
                try {
                    const data = [];
                    for (const service of matchData) {
                        const serviceDoc = await getDoc(doc(db, 'Services', service));
                        if (serviceDoc.exists()) {
                            data.push(serviceDoc.data());
                        } else {
                            console.error('Service document not found for id:', service);
                        }
                    }
                    setServiceData(data);
                } catch (error) {
                    console.error('Error fetching service:', error);
                }
            };
            fetchData();
        }
    }, [matchData]);

    return (
        <section>
            <header>
                <h1>This is <b>Matches</b> Page</h1>
            </header>
            {serviceData && (
                <div>
                    {serviceData.map((service) => {
                        return (
                            <div key={service.id}>
                                <img src="" alt="profileimg" />
                                <div>{`${service.fName} ${service.lName}`}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    )
}
