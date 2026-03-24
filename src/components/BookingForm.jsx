import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { saveBooking } from "../services/BookingService";
import styles from "./BookingForm.module.css";

function validate({ name, phone, email }) {
  const errors = {};
  if (!name.trim() || name.trim().length < 2)
    errors.name = "Введіть повне ім'я (мін. 2 символи)";
  if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone))
    errors.phone = "Невірний формат телефону";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Невірний формат email";
  return errors;
}

export default function BookingForm({ onSuccess }) {
  const { selectedTrain, selectedWagon, selectedSeats, resetBooking } = useBooking();

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const canSubmit = selectedSeats.length > 0 && selectedWagon;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Simulate slight async delay (mock API)
    setTimeout(() => {
      const booking = saveBooking({
        trainId: selectedTrain.id,
        wagonNumber: selectedWagon.number,
        seats: selectedSeats,
        passenger: form,
      });
      setLoading(false);
      resetBooking();
      onSuccess(booking);
    }, 600);
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Дані пасажира</h3>

      {!canSubmit && (
        <p className={styles.hint}>
          ⬆️ Оберіть вагон та хоча б одне місце, щоб продовжити
        </p>
      )}

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Ім'я та прізвище
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Іванко Петренко"
            className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
            value={form.name}
            onChange={handleChange}
            disabled={!canSubmit}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>

        {/* Phone */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Телефон
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+380 50 123 4567"
            className={`${styles.input} ${errors.phone ? styles.invalid : ""}`}
            value={form.phone}
            onChange={handleChange}
            disabled={!canSubmit}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="example@mail.com"
            className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
            value={form.email}
            onChange={handleChange}
            disabled={!canSubmit}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        {/* Order summary */}
        {canSubmit && (
          <div className={styles.summary}>
            <p>
              🚆 <strong>{selectedTrain.from} → {selectedTrain.to}</strong>
            </p>
            <p>
              🚃 Вагон №{selectedWagon.number} ({selectedWagon.type})
            </p>
            <p>
              💺 Місця: <strong>{selectedSeats.sort((a, b) => a - b).join(", ")}</strong>
            </p>
          </div>
        )}

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!canSubmit || loading}
        >
          {loading ? "Бронюємо…" : "Підтвердити бронювання →"}
        </button>
      </form>
    </div>
  );
}