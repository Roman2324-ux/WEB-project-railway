import { useNavigate } from "react-router-dom";
import TrainList from "../components/TrainList";
import { trains } from "../data/trains";
import styles from "./Home.module.css";

export default function Home() {
  const navigate = useNavigate();

  function handleBook(train) {
    navigate(`/booking/${train.id}`);
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.logoRow}>
            <span className={styles.uaFlag}>🇺🇦</span>
            <span className={styles.logoText}>Укрзалізниця</span>
          </div>
          <h1 className={styles.heading}>Знайди свій рейс</h1>
          <p className={styles.subheading}>
            Переглядай розклад, обирай місця та бронюй квитки онлайн
          </p>
        </div>
        <div className={styles.heroBg} aria-hidden="true">
          🚆
        </div>
      </header>

      <main className={styles.main}>
        <TrainList trains={trains} onBook={handleBook} />
      </main>
    </div>
  );
}