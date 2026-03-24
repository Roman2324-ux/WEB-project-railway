import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Home from "./pages/Home";
import Booking from "./pages/Booking";

export default function App() {
  return (
    <BookingProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<Booking />} />
      </Routes>
    </BookingProvider>
  );
}