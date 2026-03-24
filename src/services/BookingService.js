const STORAGE_KEY = "railway_bookings";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(bookings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

// ─── Mock booked seats per wagon ──────────────────────────────────────────────
// Key format: "trainId_wagonNumber"
// We seed a few taken seats so the map looks realistic from the start.

const SEED_TAKEN = {
  "1_1": [3, 7, 12, 15, 22],
  "1_2": [1, 5, 18],
  "2_1": [2, 9, 11, 20, 33],
  "3_1": [4, 6, 14],
  "4_1": [8, 17, 25, 31],
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the list of seat numbers already booked for a given train/wagon.
 * Merges seed data with anything saved to localStorage.
 */
export function getBookedSeats(trainId, wagonNumber) {
  const key = `${trainId}_${wagonNumber}`;
  const seed = SEED_TAKEN[key] || [];

  const allBookings = loadAll();
  const fromStorage = allBookings
    .filter((b) => b.trainId === trainId && b.wagonNumber === wagonNumber)
    .flatMap((b) => b.seats);

  return [...new Set([...seed, ...fromStorage])];
}

/**
 * Saves a new booking to localStorage.
 * Returns the saved booking object with a generated id.
 */
export function saveBooking({ trainId, wagonNumber, seats, passenger }) {
  const booking = {
    id: `BK-${Date.now()}`,
    trainId,
    wagonNumber,
    seats,
    passenger,
    createdAt: new Date().toISOString(),
  };

  const all = loadAll();
  all.push(booking);
  saveAll(all);

  return booking;
}

/**
 * Returns all bookings from localStorage.
 */
export function getAllBookings() {
  return loadAll();
}

/**
 * Removes all bookings (for dev/testing).
 */
export function clearBookings() {
  localStorage.removeItem(STORAGE_KEY);
}