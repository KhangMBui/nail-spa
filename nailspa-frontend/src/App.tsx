import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import BookingPage from "./pages/BookingPage/BookingPage";
// import CheckInPage from "./pages/CheckInPage";
// import AppointmentsPage from "./pages/AppointmentsPage";
// import ServicesPage from "./pages/ServicesPage";
import "./App.css";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import LoginPage from "./pages/LoginPage/LoginPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/check-in" element={<CheckInPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/services" element={<ServicesPage />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
