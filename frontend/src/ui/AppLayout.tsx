import { Outlet } from "react-router";
import styles from "./AppLayout.module.css";
import Header from "./Header";
import Footer from "./Footer";

function AppLayout() {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.wrapper}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default AppLayout;
