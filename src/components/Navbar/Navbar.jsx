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
                        <button onClick={signOutHandler}>Sign Out</button>
                    ) : (
                        <Link to="/auth">Login</Link>
                    )}
                </li>
                <li className={styles.li}>
                    <Link to="/">Home</Link>
                </li>
                <li className={styles.li}>
                    <Link to="/matches">matches</Link>
                </li>
            </ul>
        </nav>
    );
}
