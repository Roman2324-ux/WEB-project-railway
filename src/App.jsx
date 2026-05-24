import { Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BookingProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking/:trainId" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BookingProvider>
  );
}