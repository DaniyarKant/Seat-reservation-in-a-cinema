import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";

function Header() {
    const { user } = useUser();
    const { logoutAcc } = useLogout();

    const { email } = user[0];

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h3>KINOPARK</h3>
                <div>
                    <ul>
                        <Link to="/home">
                            <li>Home</li>
                        </Link>
                        <Link to="/repertuar">
                            <li>Repertuar</li>
                        </Link>
                        <Link to="/reservations">
                            <li>Reservations</li>
                        </Link>
                        {email == "daniyar@mail.ru" && (
                            <Link to="/admin">
                                <li>Admin panel</li>
                            </Link>
                        )}
                    </ul>
                </div>

                <div>
                    <button onClick={() => logoutAcc()}>LOGOUT</button>
                </div>
            </div>
        </div>
    );
}

export default Header;
