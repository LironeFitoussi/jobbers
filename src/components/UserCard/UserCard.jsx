import styles from './UserCard.module.css'
import { collection, doc, getDoc } from "firebase/firestore";

const UserCard = ({ service }) => {
    const { serviceId, category, desc, fName, lName, age, type, experince, uid } = service
    console.log(service);
    const nextCard = () => {
        // todo: set next card logic   
        console.log('next card');
    }

    const addToWanted = async () => {
        console.log('i want  him');
        // todo: set add to Favorites logic (await)
        let userQuery = query(
            collection(db, 'Matches',),
        );

        // const docRef = doc(db, "cities", );
        // const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            console.log("No such document!");
        }
        nextCard();
    }

    const addToUnwanted = async () => {
        console.log('i dont want  him');
        // todo: set add to  No Favorites logic (await)
        nextCard();
    }


    return (
        <div className={styles.container}>
            <div className={styles.bgImg}></div>
            <div>
                <img className={styles.profileImg} src="" alt="" />
                <div className={styles.cardHeader}>
                    <h1>{fName + ' ' + lName} <span>{age}</span></h1>
                    <p>{category}</p>
                    <div div >
                        {type === 'freelancer' && <p>EXPERirnce: {experince}</p>}
                        <p>About Me: {desc}</p>
                    </div>
                </div>
                <section>
                    <button onClick={addToWanted}>||LIKE</button>
                    <button onClick={addToUnwanted}>||DISLIKE</button>
                </section>
            </div>
        </div >
    )
}

export default UserCard;