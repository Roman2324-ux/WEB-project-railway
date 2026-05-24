import { useBooking } from "../context/BookingContext";
import styles from "./WagonSelector.module.css";

const WAGON_TYPES = ["Купе", "Плацкарт", "СВ", "Сидячий"];

const SEATS_BY_TYPE = {
  "Купе": 36,
  "Плацкарт": 54,
  "СВ": 18,
  "Сидячий": 60,
};

export default function WagonSelector({ train }) {
  const { selectedWagon, chooseWagon } = useBooking();

  const wagons = Array.from({ length: train.wagons }, (_, i) => {
    const type = WAGON_TYPES[i % WAGON_TYPES.length];
    return {
      number: i + 1,
      type,
      seats: SEATS_BY_TYPE[type],
    };
  });

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.legend}>
        {Object.entries(SEATS_BY_TYPE).map(([type, seats]) => (
          <span key={type} className={styles.legendItem}>
            <strong>{type}</strong> — {seats} місць
          </span>
        ))}
      </div>
      <div className={styles.list}>
        {wagons.map((wagon) => (
          <button
            key={wagon.number}
            className={`${styles.wagon} ${
              selectedWagon?.number === wagon.number ? styles.active : ""
            }`}
            onClick={() => chooseWagon(wagon)}
          >
            <span className={styles.num}>№{wagon.number}</span>
            <span className={styles.type}>{wagon.type}</span>
            <span className={styles.seats}>{wagon.seats} місць</span>
          </button>
        ))}
      </div>
    </div>
  );
}