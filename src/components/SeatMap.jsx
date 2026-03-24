import { useEffect, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { getBookedSeats } from "../services/BookingService";
import styles from "./SeatMap.module.css";

const SEATS_PER_ROW = 4; // 2 + aisle + 2 layout

export default function SeatMap() {
  const { selectedTrain, selectedWagon, selectedSeats, toggleSeat } = useBooking();
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (!selectedTrain || !selectedWagon) return;
    const taken = getBookedSeats(selectedTrain.id, selectedWagon.number);
    setBookedSeats(taken);
  }, [selectedTrain, selectedWagon]);

  if (!selectedWagon) {
    return (
      <div className={styles.placeholder}>
        <span>🚃</span>
        <p>Оберіть вагон, щоб побачити схему місць</p>
      </div>
    );
  }

  const totalSeats = selectedWagon.seats;
  const rows = Math.ceil(totalSeats / SEATS_PER_ROW);

  function getSeatStatus(seatNum) {
    if (bookedSeats.includes(seatNum)) return "booked";
    if (selectedSeats.includes(seatNum)) return "selected";
    return "free";
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>
        Вагон №{selectedWagon.number} — {selectedWagon.type}
      </h3>

      {/* Legend */}
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.free}`} /> Вільне
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.selected}`} /> Обране
        </span>
        <span className={styles.legendItem}>
          <span className={`${styles.dot} ${styles.booked}`} /> Заброньовано
        </span>
      </div>

      {/* Seat grid */}
      <div className={styles.wagon}>
        <div className={styles.wagonHead}>🚂</div>
        <div className={styles.grid}>
          {Array.from({ length: rows }, (_, rowIdx) => {
            const leftA = rowIdx * SEATS_PER_ROW + 1;
            const leftB = rowIdx * SEATS_PER_ROW + 2;
            const rightC = rowIdx * SEATS_PER_ROW + 3;
            const rightD = rowIdx * SEATS_PER_ROW + 4;

            return (
              <div key={rowIdx} className={styles.row}>
                <span className={styles.rowNum}>{rowIdx + 1}</span>
                <div className={styles.seatGroup}>
                  {[leftA, leftB].map((n) =>
                    n <= totalSeats ? (
                      <Seat
                        key={n}
                        number={n}
                        status={getSeatStatus(n)}
                        onClick={() => getSeatStatus(n) !== "booked" && toggleSeat(n)}
                      />
                    ) : (
                      <div key={n} className={styles.seatEmpty} />
                    )
                  )}
                </div>
                <div className={styles.aisle} />
                <div className={styles.seatGroup}>
                  {[rightC, rightD].map((n) =>
                    n <= totalSeats ? (
                      <Seat
                        key={n}
                        number={n}
                        status={getSeatStatus(n)}
                        onClick={() => getSeatStatus(n) !== "booked" && toggleSeat(n)}
                      />
                    ) : (
                      <div key={n} className={styles.seatEmpty} />
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <p className={styles.summary}>
          Обрано місць: <strong>{selectedSeats.length}</strong> —{" "}
          {selectedSeats.sort((a, b) => a - b).join(", ")}
        </p>
      )}
    </div>
  );
}

function Seat({ number, status, onClick }) {
  return (
    <button
      className={`${styles.seat} ${styles[status]}`}
      onClick={onClick}
      disabled={status === "booked"}
      title={`Місце ${number}`}
    >
      {number}
    </button>
  );
}