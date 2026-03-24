import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// Placeholder for Lab 10
function BookingPage() {
  return (
    <div style={{ padding: "60px 20px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>🚃 Бронювання квитків</h2>
      <p style={{ color: "#888" }}>Цей розділ буде реалізовано в лабораторній роботі 10.</p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/booking/:trainId" element={<BookingPage />} />
    </Routes>
  );
}