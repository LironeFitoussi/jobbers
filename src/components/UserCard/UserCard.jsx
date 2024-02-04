import styles from './UserCard.module.css'
const UserCard = () => {

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
                    <h1>||USERNAME <span>||AGE</span></h1>
                    <p>||PROFFESION</p>
                    <div>
                        <p>EXPERirnce: ||XP</p>
                        <p>ABOT: ||about</p>
                    </div>
                </div>
                <section>
                    <button onClick={addToWanted}>||LIKE</button>
                    <button onClick={addToUnwanted}>||DISLIKE</button>
                </section>
            </div>
        </div>
    )
}

export default UserCard;