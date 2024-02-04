import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { UserContext } from '../../context/User'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import UserCard from '../../components/UserCard/UserCard'
function MyServices() {
    const  {user} = useContext(UserContext)
    const [myServicesList,setMyServicesList]=useState([])
  const getUserServices= async()=>{
    
 try {
    const q = query(collection(db, 'Services'), where('uid', '==', user?.uid));
    const snapshot = await getDocs(q);
    const tempList=[]
   snapshot.docs.map(doc => tempList.push({...doc.data() , serviceId:doc.id}));    
   setMyServicesList(tempList);
 } catch (error) {
    console.log(error);
 }
  }
  useEffect(()=>{
    getUserServices()
},[user])
  return (

    <div>
      {myServicesList.map((item)=>{
        return <UserCard service={item} isPreview={true}/>
      })}
    </div>
  )
}

export default MyServices
