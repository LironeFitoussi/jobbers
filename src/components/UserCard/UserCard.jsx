import styles from "./UserCard.module.css";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext } from "react";
import { UserContext } from "../../context/User";
const UserCard = ({ service, isPreview, selectAServiceHandler,isSwiper }) => {
  const {
    id,
    category,
    description,
    fName,
    lName,
    age,
    type,
    experince,
    uid,
  } = service;
  const { chosenService } = useContext(UserContext);
  const nextCard = () => {
    // todo: set next card logic
    console.log("next card");
  };

  const addToWanted = async () => {
    console.log("i want  him");
    // todo: set add to Favorites logic (await)
    //Step 1: Check if user liked
    //1.1: fetch target match card
    const myServiceDoc= await getDoc(doc(db,"Matches",chosenService))
    const myServiceData =myServiceDoc.data();
    const currentServiceDoc=await getDoc(doc(db,"Matches",id))
    const currentServiceData =currentServiceDoc.data();
    if(currentServiceData.iLiked.indexOf(chosenService)==-1){// i am not in card iLiked
      console.log("he didn't like me, i will add to his Liked me");
      if(myServiceData.iLiked.indexOf(id)==-1){
      console.log("i will add to my Ilike");

        myServiceData.iLiked.push(id)
        await updateDoc(doc(db,"Matches",chosenService), { iLiked: myServiceData.iLiked });

      }
      
      if(currentServiceData.likedMe.indexOf(chosenService)==-1){
      currentServiceData.likedMe.push(chosenService)
          await updateDoc(doc(db,"Matches",id), { likedMe: currentServiceData.likedMe });
          console.log("added to curr LIKED ME");
      }
    
    }
    else{
      console.log("We in THE BIG else");
      console.log(currentServiceData.matches.indexOf(chosenService)==-1 && myServiceData.matches.indexOf(id)==-1);
      if(currentServiceData.matches.indexOf(chosenService)==-1 && myServiceData.matches.indexOf(id)==-1){
        console.log("enter matches");
      currentServiceData.matches.push(chosenService)
      await updateDoc(doc(db,"Matches",id), { matches: currentServiceData.matches });
      myServiceData.matches.push(id)
      await updateDoc(doc(db,"Matches",chosenService), { matches: myServiceData.matches })
      }

    }

    
    




















    // const docRef = doc(db, "Matches", serviceId);
    // const docSnap = await getDoc(docRef);
    // if (docSnap.exists()) {
    //   //1.2: check at 'target' likes if user card exist
    //   console.log(docSnap.data().iliked);

    //   const likedList = docSnap.data().iliked;
    //   const matchedList = docSnap.data().matches;
    //   const whereIsLiked = likedList.indexOf(chosenService);
    //   // query to check if A liked B and B liked A
    //   if (whereIsLiked == -1) {
    //     likedList.push(chosenService);
    //     await updateDoc(docRef, { iliked: likedList });
    //   } else {
    //     likedList.splice(whereIsLiked, 1);
    //     matchedList.push(chosenService);
    //     await updateDoc(docRef, { matches: matchedList, iliked: likedList });
    //     console.log("already exist");
    //   }
    // }

    //2.1: set arrayUnion to matches and add uid
    //2.2: remove uid from likes array

    //Step 3: if user didn't liked:
    //3.1:  add to 'user' liked
  };

  const addToUnwanted = async () => {
    console.log("i dont want  him");
    // todo: set add to  No Favorites logic (await)
    nextCard();
  };

  return (
    <div
      className={styles.container}
      style={
        isPreview && {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          aligniItems: "center",
          background:"none",height:"30vh"
        }
      }
      onClick={() => isPreview && selectAServiceHandler(serviceId)}>
      <div className={styles.bgImg}></div>
      <div>
        <img className={styles.profileImg} src="" alt="" />
        <div className={styles.cardHeader}>
          <h1>
            {fName + " " + lName} <span>{age}</span>
          </h1>
          <p>{category.replace(/-/g, ' ')}</p>
          <div div>
            {type === "Freelancer" && <p>EXPERirnce: {experince}</p>}
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
    </div>
  );
};

export default UserCard;
