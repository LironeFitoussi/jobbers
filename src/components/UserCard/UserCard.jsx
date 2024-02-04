import styles from './UserCard.module.css'
const UserCard = ({ service }) => {
    const { category, desc, fName, lName, age, type, experince } = service
    console.log(service);

    const nextCard = () => {
        // todo: set next card logic   
        console.log('next card');
    }

    const addToWanted = async () => {
        console.log('i want  him');
        // todo: set add to Favorites logic (await)

        nextCard();
    }

    const addToUnwanted = async () => {
        console.log('i dont want  him');
        // todo: set add to  No Favorites logic (await)
        nextCard();
    }


    return (
        <div className={styles.container}>
            <div className={styles.bgImg}></div>
            <div>
                <img className={styles.profileImg} src="" alt="" />
                <div className={styles.cardHeader}>
                    <h1>{fName + ' ' + lName} <span>{age}</span></h1>
                    <p>{category}</p>
                    < div >
                        {type === 'freelancer' && <p>EXPERirnce: {experince}</p>}
                        <p>About Me: {desc}</p>
                    </div>
                </div>
                <section>
                    <button onClick={addToWanted}>||LIKE</button>
                    <button onClick={addToUnwanted}>||DISLIKE</button>
                </section>
            </div>
        </div >
    )
}

export default UserCard;