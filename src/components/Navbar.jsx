import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <span className={styles.flag}>🇺🇦</span>
          <span className={styles.logoText}>Укрзалізниця</span>
        </Link>
        <div className={styles.links}>
          <Link
            to="/"
            className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
          >
            🔍 Розклад
          </Link>
          <Link
            to="/my-bookings"
            className={`${styles.link} ${pathname === "/my-bookings" ? styles.active : ""}`}
          >
            🎫 Мої бронювання
          </Link>
        </div>
      </div>
    </nav>
  );
}