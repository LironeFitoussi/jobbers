import styles from './UserCard.module.css'
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { useContext } from 'react';
import { UserContext } from '../../context/User';
const UserCard = ({ service, isPreview, selectAServiceHandler }) => {
    const { serviceId, category, description, fName, lName, age, type, experince, uid } = service
    const { chosenService } = useContext(UserContext)
    const nextCard = () => {
        // todo: set next card logic   
        console.log('next card');
    }

    const addToWanted = async () => {
        console.log('i want  him');
        // todo: set add to Favorites logic (await)
        //Step 1: Check if user liked
        //1.1: fetch target match card
        const docRef = doc(db, "Matches", serviceId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            //1.2: check at 'target' likes if user card exist
            console.log(docSnap.data().iliked);

            const likedOnes = docSnap.data().iliked
            // console.log(docSnap.data());
            // const likedOnes = docSnap.data().iLiked
            // likedOnes.some((index) => {
            //Step 2: if target liked:
            //         console.log(index);
            //     if (index === uid) {
            //         console.log(true);

            //     }
            // }

        } else {
            console.log("No such document!");
        }



        //2.1: set arrayUnion to matches and add uid
        //2.2: remove uid from likes array

        //Step 3: if user didn't liked:
        //3.1:  add to 'user' liked
    }

    const addToUnwanted = async () => {
        console.log('i dont want  him');
        // todo: set add to  No Favorites logic (await)
        nextCard();
    }

    return (
        <div className={styles.container} style={isPreview && { position: 'none' }} onClick={() => selectAServiceHandler(serviceId)}>
            <div className={styles.bgImg}></div>
            <div>
                <img className={styles.profileImg} src="" alt="" />
                <div className={styles.cardHeader}>
                    <h1>{fName + ' ' + lName} <span>{age}</span></h1>
                    <p>{category}</p>
                    <div div >
                        {type === 'freelancer' && <p>EXPERirnce: {experince}</p>}
                        <p>About Me: {description}</p>
                    </div>
                </div>

                {!isPreview && (
                    <section>
                        <button onClick={addToWanted}>||LIKE</button>
                        <button onClick={addToUnwanted}>||DISLIKE</button>
                    </section>
                )}
            </div>
        </div >
    )
}

export default UserCard;