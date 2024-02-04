import { useContext } from "react";
import Swiper from "../../components/Swiper/Swiper";
import { UserContext } from '../../context/User'
import styles from './Find.module.css'

export default function Find() {
    // const { user } = useContext(UserContext)
    // console.log(user);

    const user = {
        type: 'employer'
    }
    return (
        <section>
            <header>
                <h1>This is <b>Home</b> Page</h1>
                <Swiper userType={user.type} />
            </header>
        </section>
    )
}