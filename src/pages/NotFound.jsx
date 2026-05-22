import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <span className={styles.icon}>🚂</span>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>Сторінку не знайдено</p>
        <p className={styles.sub}>
          Схоже, цей маршрут не існує або потяг вже поїхав
        </p>
        <button className={styles.btn} onClick={() => navigate("/")}>
          ← Повернутись на головну
        </button>
      </div>
    </div>
  );
}