import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User'
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore'

function MyServices() {
  const  {user} = useContext(UserContext)
useEffect(()=>{
    getUserServices()
},[])
  const getUserServices= async()=>{
    q= query(db,"Services",where("uid" ,"==",user.uid))
   snapshot= await getDocs(q)
   console.log(snapshot);
  }
  return (
    <div>
      
    </div>
  )
}

export default MyServices
