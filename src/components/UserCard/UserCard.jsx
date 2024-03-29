import styles from "./UserCard.module.css";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { UserContext } from "../../context/User";
const UserCard = ({ service, isPreview, selectAServiceHandler, isSwiper }) => {
  const { id, category, description, fName, lName, age, type, experince, uid } =
    service;
  const { chosenService } = useContext(UserContext);

  const addToWanted = async () => {
    // todo: set add to Favorites logic (await)
    //Step 1: Check if user liked
    //1.1: fetch target match card
    const myServiceDoc = await getDoc(doc(db, "Matches", chosenService));
    const myServiceData = myServiceDoc.data();
    const currentServiceDoc = await getDoc(doc(db, "Matches", id));
    const currentServiceData = currentServiceDoc.data();
    if (currentServiceData.iLiked.indexOf(chosenService) == -1) {
      // i am not in card iLiked
      // console.log("he didn't like me, i will add to his Liked me");
      if (myServiceData.iLiked.indexOf(id) == -1) {
        // console.log("i will add to my Ilike");

        myServiceData.iLiked.push(id);
        await updateDoc(doc(db, "Matches", chosenService), {
          iLiked: myServiceData.iLiked,
        });
      }

      if (currentServiceData.likedMe.indexOf(chosenService) == -1) {
        currentServiceData.likedMe.push(chosenService);
        await updateDoc(doc(db, "Matches", id), {
          likedMe: currentServiceData.likedMe,
        });
        // console.log("added to curr LIKED ME");
      }
    } else {    
      if (
        currentServiceData.matches.indexOf(chosenService) == -1 &&
        myServiceData.matches.indexOf(id) == -1
      ) {
        // console.log("enter matches");
        currentServiceData.matches.push(chosenService);
        await updateDoc(doc(db, "Matches", id), {
          matches: currentServiceData.matches,
        });
        myServiceData.matches.push(id);
        await updateDoc(doc(db, "Matches", chosenService), {
          matches: myServiceData.matches,
        });
      }
    }
  };

  const addToUnwanted = async () => {
    // console.log("i dont want  him");
    const myServiceDoc = await getDoc(doc(db, "Matches", chosenService));
    const myServiceData = myServiceDoc.data();
    myServiceData.disLike.push(id);
    await updateDoc(doc(db, "Matches", chosenService), {
      disLike: myServiceData.disLike,
    });
  };

  // console.log(category);

  return (
    <div
      className={styles.container}
      style={isPreview && { position: "initial" }}
      onClick={() => isPreview && selectAServiceHandler(id)}>
      <div className={styles.bgImg}></div>
      <div>
        <div className={styles.cardHeader}>
          <div>
            <h1>
              {fName + " " + lName} <span>{age}</span>
            </h1>
            <img
              className={styles.profilePic}
              src="https://media.istockphoto.com/id/526947869/vector/man-silhouette-profile-picture.jpg?s=612x612&w=0&k=20&c=5I7Vgx_U6UPJe9U2sA2_8JFF4grkP7bNmDnsLXTYlSc="
              alt="profileimg"
            />
          </div>
          <b>{type}</b>
          <p>{category?.replace(/-/g, " ")}</p>
          <div div>
            {type === "Freelancer" && <p>Experirnce: {experince}</p>}
            <p>About Me: {description}</p>
          </div>
        </div>
        {!isPreview && (
          <section className={styles.btnSection}>
            <button className={styles.btnDisLike} onClick={addToUnwanted}>
              <img
                src="https://cdn.freebiesupply.com/logos/large/2x/facebook-like-logo-png-transparent.png"
                alt=""
              />
            </button>
            <button className={styles.btnLike} onClick={addToWanted}>
              <img
                src="https://cdn.freebiesupply.com/logos/large/2x/facebook-like-logo-png-transparent.png"
                alt=""
              />
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default UserCard;
