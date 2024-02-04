import React, { useContext, useEffect, useState, useSyncExternalStore } from 'react'
import { UserContext } from '../../context/User'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase'
import UserCard from '../../components/UserCard/UserCard'
import { useNavigate } from 'react-router-dom'

function MyServices() {
  const { user, setChosenService } = useContext(UserContext)
  const [myServicesList, setMyServicesList] = useState([])
  const navigate = useNavigate()
  const getUserServices = async () => {
    try {
      const q = query(collection(db, 'Services'), where('uid', '==', user?.uid));
      const snapshot = await getDocs(q);
      const tempList = []
      snapshot.docs.map(doc => tempList.push({ ...doc.data(), serviceId: doc.id }));
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
  return (
    <div>
      {myServicesList.map((item) => {
        return <UserCard selectAServiceHandler={selectAServiceHandler} service={item} isPreview={true} />
      })}

      <button>add another</button>

      <button>use the selected service</button>
    </div>
  )
}

export default MyServices
