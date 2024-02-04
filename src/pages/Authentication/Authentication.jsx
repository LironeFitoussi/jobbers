import { db, auth } from '../../config/firebase'
import React, { createContext, useState, useContext, useEffect } from "react";
import LogIn from '../../components/Authentication/LogIn';
import SignUp from '../../components/Authentication/SignUp';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, onSnapshot, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { UserContext } from '../../context/User'


function Authentication() {

    const { user, setUser, setUserFromDb, signOutHandler } = useContext(UserContext)

    const [newUser, setNewUser] = useState({})
    const [isRegistered, setIsRegistered] = useState(true)



    const inputInfo = (e) => {
        newUser[e.target.name] = e.target.value
        console.log(e.target.value);
        setNewUser(newUser)
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        const logUser = await signInWithEmailAndPassword(auth, newUser.Email, newUser.Password)
        console.log(logUser);
        console.log("user logged");
    }

    const submitSignUp = async (e) => {
        try {
            e.preventDefault()
            console.log(newUser);
            createUserWithEmailAndPassword(auth, newUser.Email, newUser.Password)
                .then(async (userCred) => {
                    const { Email, firstName, lastName, Phone, Age } = { ...newUser }
                    console.log(userCred);
                    await setDoc(doc(db, "Users", userCred.user.uid), { lastName, firstName, Email, Phone, Age, role: "User",uid:userCred.user.uid })
                    console.log("user logged in");
                })
        }
        catch (err) {
            console.error(err);
        }
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