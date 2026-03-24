import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  function chooseTrain(train) {
    setSelectedTrain(train);
    setSelectedWagon(null);
    setSelectedSeats([]);
  }

  function chooseWagon(wagon) {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  }

  function toggleSeat(seatNumber) {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  }

  function resetBooking() {
    setSelectedTrain(null);
    setSelectedWagon(null);
    setSelectedSeats([]);
  }

  return (
    <BookingContext.Provider
      value={{
        selectedTrain,
        selectedWagon,
        selectedSeats,
        chooseTrain,
        chooseWagon,
        toggleSeat,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}