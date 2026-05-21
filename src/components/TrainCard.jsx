import styles from "./TrainCard.module.css";

const typeColors = {
  "Інтерсіті+": "#0057b7",
  Швидкісний: "#2e7d32",
  Пасажирський: "#6d4c41",
  Нічний: "#4a148c",
};

function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TrainCard({ train, onBook }) {
  const accentColor = typeColors[train.type] || "#333";
  const isSoldOut = train.availableSeats === 0;

  return (
    <div className={styles.card}>
      <div className={styles.stripe} style={{ background: accentColor }} />

      <div className={styles.header}>
        <span className={styles.badge} style={{ background: accentColor }}>
          {train.type}
        </span>
        <span className={styles.trainNumber}>№ {train.number}</span>
      </div>

      <div className={styles.route}>
        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.departure)}</span>
          <span className={styles.cityName}>{train.from}</span>
        </div>

        <div className={styles.routeLine}>
          <div className={styles.dot} />
          <div className={styles.line} />
          <span className={styles.duration}>{train.duration}</span>
          <div className={styles.line} />
          <div className={styles.arrowDot}>▶</div>
        </div>

        <div className={styles.city}>
          <span className={styles.time}>{formatTime(train.arrival)}</span>
          <span className={styles.cityName}>{train.to}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.meta}>
          <span>📅 {formatDate(train.departure)}</span>
          <span>🚃 {train.wagons} вагонів</span>
          <span className={isSoldOut ? styles.soldOut : styles.seats}>
            {isSoldOut ? "🔴 Квитки відсутні" : `🟢 ${train.availableSeats} місць`}
          </span>
        </div>

        <div className={styles.priceRow}>
          {train.price && (
            <span className={styles.price}>
              від <strong>{train.price} ₴</strong>
            </span>
          )}
          <button
            className={styles.bookBtn}
            style={{ background: isSoldOut ? "#ccc" : accentColor }}
            disabled={isSoldOut}
            onClick={() => onBook && onBook(train)}
          >
            {isSoldOut ? "Немає місць" : "Обрати місця →"}
          </button>
        </div>
      </div>
    </div>
  );
}