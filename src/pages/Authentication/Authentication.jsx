import {db,auth} from '../../config/firebase'
import React, { createContext, useState, useContext, useEffect } from "react";
import LogIn from '../../components/Authentication/LogIn';
import SignUp from '../../components/Authentication/SignUp';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword   } from "firebase/auth";
import {collection , addDoc, onSnapshot, setDoc , doc, getDoc, getDocs , deleteDoc} from 'firebase/firestore'
import UserContext from '../../context/User'


function Authentication(){

    // const {user, setUser, setUserFromDb, signOutHandler} = useContext(UserContext)
    
    const [newUser,setNewUser] = useState({})
    const [isRegistered, setIsRegistered] = useState(true)

    const UsersRef = collection(db,"Users")


    const inputInfo = (e) => {
        newUser[e.target.name] = e.target.value
        console.log(e.target.value);
        setNewUser(newUser)
    }

    const submitLogin = async (e) =>{
        e.preventDefault()
        console.log(e.target.value);
        const logUser = await signInWithEmailAndPassword(auth,newUser.Email,newUser.Password)
        console.log(logUser);
    }

    const submitSignUp = async(e) =>{
        try{
            e.preventDefault()
            console.log(newUser);
            const registerUser = await createUserWithEmailAndPassword(auth,newUser.Email,newUser.Password)
            .then(async(UserCred) =>{
                await setDoc(doc(db,"Users",UserCred.user.uid),{...newUser, role:"User"})
                console.log(UserCred);
            })
        }
        catch(err){
            console.error(err);
        }
    }

    const toggleType = () =>{
        setIsRegistered(!isRegistered)
    }


    return (
        <>
        <div className='authDiv'>
            {isRegistered ? <LogIn inputInfo={inputInfo} submitLogin={submitLogin}/> : <SignUp inputInfo={inputInfo} submitSignUp={submitSignUp}/>}
            <br /><h3>Don't have an account? <span onClick={toggleType}>{isRegistered ? "Click here to Sign Up" : "Click here to Log In"}</span> </h3>
        </div>
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