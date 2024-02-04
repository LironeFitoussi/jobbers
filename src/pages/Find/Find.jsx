import { useContext } from "react";
import Swiper from "../../components/Swiper/Swiper";
import { UserContext } from '../../context/User'
import styles from './Find.module.css'
import { useParams } from "react-router-dom";
export default function Find() {
    const { user } = useContext(UserContext)
    
    
  
    return (
        <section>
            <header>
                <h1>This is <b>Home</b> Page</h1>
                <Swiper userType={user.type} />
            </header>
        </section>
    )
}