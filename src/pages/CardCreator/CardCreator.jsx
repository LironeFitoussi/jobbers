import CreatorForm from "../../components/CardCreator/CardCreatorForm"
import { useContext, useEffect, useState } from "react"
import UserProvider from "../../context/User";
import { UserContext } from "../../context/User";
import { db, auth } from '../../config/firebase'
import { collection, addDoc, onSnapshot, setDoc, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'
import { useNavigate } from "react-router-dom";
import styles from "./CardCreator.module.css"

function CardCreator(){
    const navigate = useNavigate()
    const [currData,setCurrData] = useState({})
    const [timeUnit,setTimeUnit] = useState(null)
    const {user} = useContext(UserContext)


    const inputUpdater = (e) =>{
        currData[e.target.name] = e.target.value
        console.log({...currData});
    }

    //! PAYLOAD : serviceId, category, desc, fName, lName, age, type, experince, uid
    
    const submitForm = async (e) =>{
        e.preventDefault()
        try{
            setCurrData({...currData})
            const addedService = await addDoc(collection(db,"Services"),{...currData,
                fName:user.fName,
                lName:user.lName,
                email:user.email,
                phone:user.phone,
                age:user.age,
                isActive:true,
                uid:user.uid,
            })
 
            const addedMatching = await setDoc(doc(db,"Matches",addedService.id),{
                iLiked:[],
                likedMe:[],
                disLike:[],
                matches:[],
            })
            
            navigate("/myServices")
        }
        catch(err){
            console.error(err);
        }
    }


    //TODO : Create clean Matches template doc (Empty lists, but add the lists and uid + sid)
    
    return (
        <>
            <CreatorForm inputUpdater={inputUpdater} submitForm={submitForm} currData={currData} setCurrData={setCurrData}/>
        </>
    )
}


export default CardCreator