import { useBooking } from "../context/BookingContext";
import styles from "./WagonSelector.module.css";

const WAGON_TYPES = ["Купе", "Плацкарт", "СВ", "Сидячий"];

export default function WagonSelector({ train }) {
  const { selectedWagon, chooseWagon } = useBooking();

  // Generate wagon list based on train.wagons count
  const wagons = Array.from({ length: train.wagons }, (_, i) => ({
    number: i + 1,
    type: WAGON_TYPES[i % WAGON_TYPES.length],
    seats: 36,
  }));

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Оберіть вагон</h3>
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