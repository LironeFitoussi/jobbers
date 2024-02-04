import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();

    return (
        <header>
            <img src="/assets/images/Asset_1.png" alt="" onClick={() => navigate("/")} />
        </header>
    )
}