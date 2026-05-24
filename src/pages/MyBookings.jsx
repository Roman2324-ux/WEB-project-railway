import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBookings, clearBookings } from "../services/BookingService";
import { trains } from "../data/trains";
import styles from "./MyBookings.module.css";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(getAllBookings());
  }, []);

  function handleClear() {
    if (window.confirm("Видалити всі бронювання?")) {
      clearBookings();
      setBookings([]);
    }
  }

  function getTrainInfo(trainId) {
    return trains.find((t) => t.id === trainId);
  }

  function formatDate(str) {
    return new Date(str).toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button className={styles.back} onClick={() => navigate("/")}>
          ← Назад
        </button>
        <span className={styles.topTitle}>🎫 Мої бронювання</span>
        {bookings.length > 0 && (
          <button className={styles.clearBtn} onClick={handleClear}>
            Очистити все
          </button>
        )}
      </header>

      <main className={styles.main}>
        {bookings.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>🎫</span>
            <p>У вас ще немає бронювань</p>
            <small>Оберіть рейс на головній сторінці</small>
            <button className={styles.goHome} onClick={() => navigate("/")}>
              Перейти до розкладу
            </button>
          </div>
        ) : (
          <div className={styles.list}>
            {bookings.map((b) => {
              const train = getTrainInfo(b.trainId);
              return (
                <div key={b.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.bookingId}>{b.id}</span>
                    <span className={styles.date}>{formatDate(b.createdAt)}</span>
                  </div>
                  {train && (
                    <div className={styles.route}>
                      <strong>{train.from}</strong>
                      <span className={styles.arrow}>→</span>
                      <strong>{train.to}</strong>
                      <span className={styles.trainNum}>№{train.number}</span>
                    </div>
                  )}
                  <div className={styles.details}>
                    <span>🚃 Вагон №{b.wagonNumber}</span>
                    <span>💺 Місця: {b.seats.join(", ")}</span>
                    <span>👤 {b.passenger.name}</span>
                  </div>
                  {train?.price && (
                    <div className={styles.total}>
                      Сплачено:{" "}
                      <strong>{train.price * b.seats.length} ₴</strong>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}