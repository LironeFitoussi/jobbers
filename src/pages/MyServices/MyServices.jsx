import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { UserContext } from '../../context/User'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import UserCard from '../../components/UserCard/UserCard'
import { useNavigate } from 'react-router-dom'
import styles from './MyServices.module.css'

function MyServices() {
  const { user, setChosenService } = useContext(UserContext)
  const [myServicesList, setMyServicesList] = useState([])
  const navigate = useNavigate()
  const getUserServices = async () => {
    try {
      const q = query(collection(db, 'Services'), where('uid', '==', user?.uid));
      const snapshot = await getDocs(q);
      const tempList = []
      snapshot.docs.map(doc => tempList.push({ ...doc.data(), id: doc.id }));
      setMyServicesList(tempList);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserServices()
  }, [user])

  const selectAServiceHandler = (serviceId) => {
    setChosenService(serviceId)
    console.log(serviceId);
    navigate(`/find/${serviceId}`)
  }
  const navToCreator=()=>{
    navigate(`/creator`)
  }
  
  return (
    <div className={styles.container}>
      {myServicesList.map((item, index) => {
        return <UserCard selectAServiceHandler={selectAServiceHandler} key={index} service={item} isPreview={true} />
      })}
      <div onClick={navToCreator} className={styles.addAnotherBtn}>+</div>
    </div>
  )
}

export default MyServices
