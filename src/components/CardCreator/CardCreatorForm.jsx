import { useContext, useEffect, useState } from "react";
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";
import {
  collection,
  addDoc,
  onSnapshot,
  setDoc,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import styles from "./CardCreatorForm.module.css";
//TODO ON create of card, take current user details (fullName,phone)

function CreatorForm(props) {
  const { inputUpdater, currData, submitForm, setCurrData } = props;
  const { user } = useContext(UserContext);
  const [isProvider, setIsProvider] = useState(null);
  const [formStage, setFormStage] = useState(1);

  console.log(user);
  //? Info to put inside : user?.firstName, user?.lastName, user.Phone, user.Email, user.Age

  const validateType = (e) => {
    if (e.target.value == "Freelancer") {
      console.log("Valid type");
      setFormStage(2);
      setCurrData({ ...currData, time: "years", type: "Freelancer" });
      setIsProvider(true);
    } else {
      console.log("Validate else");
      setFormStage(2);
      setCurrData({ ...currData, type: "Client" });
      setIsProvider(false);
    }
  };

  // TODO : add backwards button to offer to change form between freelancer and client.
  //? FOR BOTH : Category,Description,IsActive,Uid,
  //! Freelancer : type=freelancer, Experience (duration of y+m),

  return (
    <div className={styles.cardCreatorFormContainer}>
      {formStage == 1 ? (
        <div className={styles.chooseTypeContainer}>
          <label htmlFor="selectType">
            <b>Freelancer Or Client ? </b>
          </label>
          <button
            className={styles.typeServBtn}
            name="FreelancerBtn"
            value={"Freelancer"}
            onClick={validateType}>
            Freelancer
          </button>
          <button
            className={styles.typeServBtn}
            name="ClientBtn"
            value={"Client"}
            onClick={validateType}>
            Client
          </button>
        </div>
      ) : null}

      {formStage == 2 ? (
        <div>
          <form className={styles.typeServForm} onSubmit={submitForm}>
            <h1>Create your card</h1>
            <div className={styles.preDef}>
              <label htmlFor="fullName">Full name : </label>
              <input
                type="text"
                name="fullName"
                disabled
                value={`${user?.fName} ${user?.lName}`}
              />
            </div>
            <div className={styles.preDef}>
              <label htmlFor="email">Email : </label>
              <input type="text" name="email" disabled value={user?.email} />
            </div>
            <div className={styles.preDef}>
              <label htmlFor="phone">Phone number : </label>
              <input type="text" name="phone" disabled value={user?.phone} />
            </div>
            <div className={styles.preDef}>
              <label htmlFor="age">Age : </label>
              <input type="text" name="age" disabled value={user?.age} />
            </div>
            <div>
              <select name="category" id="" onChange={inputUpdater}>
                <option value="" selected disabled>
                  Pick the Category :{" "}
                </option>
                <option value="Graphics-And-Designs">Graphics & Design</option>
                <option value="Programming-And-Tech">Programming & Tech</option>
                <option value="Digital-Marketing">Digital Marketing</option>
                <option value="Video-And-Animation">Video & Animations</option>
                <option value="Writing-And-Translation">
                  Writing & Translation
                </option>
                <option value="Music-And-Audio">Music & Audio</option>
                <option value="Business">Business</option>
                <option value="Consulting">Consulting</option>
              </select>
            </div>
            <div>
              <label htmlFor="description">Description : </label>
              <textarea
                className={styles.textareaDescription}
                name="description"
                onChange={inputUpdater}
                rows="10"></textarea>
            </div>
            {isProvider ? (
              <div>
                <label htmlFor="experience">Experience : </label>
                <input
                  type="number"
                  onChange={inputUpdater}
                  name="experience"
                />
                <select name="time" onChange={inputUpdater}>
                  <option value=" years">Years</option>
                  <option value=" months">Months</option>
                </select>
              </div>
            ) : null}

            <button className={styles.submitBtn} type="submit" name="submitBtn">
              Submit Form
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default CreatorForm;
