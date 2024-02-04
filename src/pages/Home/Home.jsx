import Swiper from "../../components/Swiper/Swiper";

export default function Home({ }) {

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