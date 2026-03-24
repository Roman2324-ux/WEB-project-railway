import { useState } from "react";
import TrainCard from "./TrainCard";
import styles from "./TrainList.module.css";

const ALL_TYPES = ["Усі", "Інтерсіті+", "Швидкісний", "Пасажирський", "Нічний"];

export default function TrainList({ trains, onBook }) {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("Усі");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filtered = trains.filter((t) => {
    const q = query.toLowerCase();
    const matchesQuery =
      t.number.toLowerCase().includes(q) ||
      t.from.toLowerCase().includes(q) ||
      t.to.toLowerCase().includes(q);
    const matchesType = activeType === "Усі" || t.type === activeType;
    const matchesAvail = !onlyAvailable || t.availableSeats > 0;
    return matchesQuery && matchesType && matchesAvail;
  });

  return (
    <section className={styles.section}>
      {/* Search bar */}
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Пошук за маршрутом або номером потяга..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button className={styles.clearBtn} onClick={() => setQuery("")}>
            ✕
          </button>
        )}
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.typeFilters}>
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              className={`${styles.typeBtn} ${activeType === type ? styles.typeBtnActive : ""}`}
              onClick={() => setActiveType(type)}
            >
              {type}
            </button>
          ))}
        </div>
        <label className={styles.availToggle}>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />
          <span>Тільки з місцями</span>
        </label>
      </div>

      {/* Results count */}
      <p className={styles.resultsCount}>
        Знайдено рейсів: <strong>{filtered.length}</strong>
      </p>

      {/* Cards grid */}
      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((train) => (
            <TrainCard key={train.id} train={train} onBook={onBook} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <span>🚆</span>
          <p>Рейсів не знайдено. Спробуйте змінити параметри пошуку.</p>
        </div>
      )}
    </section>
  );
}