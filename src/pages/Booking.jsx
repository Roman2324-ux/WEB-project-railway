import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trains } from "../data/trains";
import { useBooking } from "../context/BookingContext";
import WagonSelector from "../components/WagonSelector";
import SeatMap from "../components/SeatMap";
import BookingForm from "../components/BookingForm";
import Toast from "../components/Toast";
import styles from "./Booking.module.css";

export default function Booking() {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const { chooseTrain, selectedSeats, totalPrice } = useBooking();
  const [toast, setToast] = useState(null);

  const train = trains.find((t) => t.id === Number(trainId));

  useEffect(() => {
    if (!train) {
      navigate("/", { replace: true });
      return;
    }
    chooseTrain(train);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainId]);

  if (!train) return null;

  function handleSuccess(booking) {
    setToast({
      message: `Бронювання ${booking.id} підтверджено! Місця: ${booking.seats.join(", ")}`,
    });
  }

  function formatDate(str) {
    return new Date(str).toLocaleDateString("uk-UA", {
      day: "2-digit", month: "long", year: "numeric",
    });
  }

  function formatTime(str) {
    return new Date(str).toLocaleTimeString("uk-UA", {
      hour: "2-digit", minute: "2-digit",
    });
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <button className={styles.back} onClick={() => navigate("/")}>
          ← Назад
        </button>
        <span className={styles.topTitle}>Бронювання квитків</span>
      </header>

      <div className={styles.banner}>
        <div className={styles.bannerInner}>
          <div className={styles.bannerRoute}>
            <span className={styles.bannerCity}>{train.from}</span>
            <span className={styles.bannerArrow}>→</span>
            <span className={styles.bannerCity}>{train.to}</span>
          </div>
          <div className={styles.bannerMeta}>
            <span>🚆 №{train.number}</span>
            <span>📅 {formatDate(train.departure)}</span>
            <span>⏰ {formatTime(train.departure)} — {formatTime(train.arrival)}</span>
            <span>⏱ {train.duration}</span>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <div className={styles.left}>
          <WagonSelector train={train} />
          <SeatMap />
        </div>
        <div className={styles.right}>
          {selectedSeats.length > 0 && totalPrice > 0 && (
            <div className={styles.priceBox}>
              <div className={styles.priceRow}>
                <span>Місць обрано:</span>
                <strong>{selectedSeats.length}</strong>
              </div>
              <div className={styles.priceRow}>
                <span>Ціна за місце:</span>
                <strong>{train.price} ₴</strong>
              </div>
              <div className={`${styles.priceRow} ${styles.priceTotal}`}>
                <span>До сплати:</span>
                <strong>{totalPrice} ₴</strong>
              </div>
            </div>
          )}
          <BookingForm onSuccess={handleSuccess} />
        </div>
      </main>

      {toast && (
        <Toast
          message={toast.message}
          type="success"
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}