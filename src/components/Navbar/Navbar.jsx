import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { UserContext } from '../../context/User';

export default function Navbar() {
    const { user, signOutHandler } = useContext(UserContext);

    return (
        <nav className={styles.navbarContainer}>
            <ul className={styles.navbar}>
                <li className={styles.li}>
                    {user ? (
                        <button className={styles.logOutBtn} onClick={signOutHandler}><img className={styles.logOut} src="https://static-00.iconduck.com/assets.00/logout-icon-2048x2048-libuexip.png" alt="" /></button>
                    ) : (
                        <Link to="/"><img className={styles.loginLogo} src="https://cdn.iconscout.com/icon/free/png-256/free-login-2840150-2359419.png" alt="" /></Link>
                    )}
                </li>
                <li className={styles.li}>
                    <Link to="/"><img className={styles.homeIcon} src="https://cdn.icon-icons.com/icons2/2248/PNG/512/cards_icon_138799.png" alt="cards" /></Link>
                </li>
                <li className={styles.li}>
                    <Link to="/matches"><img className={styles.matchesIcon} src="https://www.freeiconspng.com/thumbs/handshake-icon/black-handshake-icon-20.png" alt="" /></Link>
                </li>
            </ul>
        </nav>
    );
}