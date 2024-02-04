import { db, auth } from '../../config/firebase'
import React, { createContext, useState, useContext, useEffect } from "react";
import LogIn from '../../components/Authentication/LogIn';
import SignUp from '../../components/Authentication/SignUp';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, onSnapshot, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { UserContext } from '../../context/User'
import { useNavigate } from 'react-router-dom';


function Authentication() {
    const { user, setUser, setUserFromDb, signOutHandler } = useContext(UserContext)
    
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({})
    const [isRegistered, setIsRegistered] = useState(true)



    const inputInfo = (e) => {
        newUser[e.target.name] = e.target.value
        console.log(e.target.value);
        setNewUser(newUser)
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        const logUser = await signInWithEmailAndPassword(auth, newUser.email, newUser.password)
        console.log(logUser);
        console.log("user logged");
    }

    const submitSignUp = async (e) => {
        try {
            e.preventDefault()
            console.log(newUser);
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
                .then(async (userCred) => {
                    const { email, fName, lName, phone, age } = { ...newUser }
                    console.log(userCred);
                    await setDoc(doc(db, "Users", userCred.user.uid), { fName, lName, email, phone, age, role: "User", uid: userCred.user.uid })
                    console.log("user logged in");
                    // Todo: navigarte to create
                })
            }
            catch (err) {
                console.error(err);
            }
        navigate("/creator")
    }

    const toggleType = () => {
        setIsRegistered(!isRegistered)
    }


    return (
        <>
            {user ? <div>
                Hello user

                <button onClick={signOutHandler}>Sign out</button>
            </div> : <div className='authDiv'>
                {isRegistered ? <LogIn inputInfo={inputInfo} submitLogin={submitLogin} /> : <SignUp inputInfo={inputInfo} submitSignUp={submitSignUp} />}
                <br /><h3>Don't have an account? <span onClick={toggleType}>{isRegistered ? "Click here to Sign Up" : "Click here to Log In"}</span> </h3>
            </div>}

        </>
    )







    return (
        <>
            <div className='authDiv'>
                <LogIn />
            </div>
        </>
    )

}

export default Authentication