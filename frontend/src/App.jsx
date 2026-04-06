import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingObjects from "./components/FloatingObjects";

// Pages
import Home from "./pages/Home";
import Inbound from "./pages/Inbound";
import Outbound from "./pages/Outbound";
import BookingPage from "./pages/BookingPage";
import AdminDashboard from "./pages/AdminDashboard";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = React.useState(() => {
    return localStorage.getItem('app_language') || 'en';
  });

  React.useEffect(() => {
    localStorage.setItem('app_language', currentLanguage);
  }, [currentLanguage]);

  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}>
        <FloatingObjects />
        <Navbar currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
        
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home currentLanguage={currentLanguage} />} />
            <Route path="/inbound" element={<Inbound selectedLanguage={currentLanguage} setSelectedLanguage={setCurrentLanguage} />} />
            <Route path="/outbound" element={<Outbound selectedLanguage={currentLanguage} setSelectedLanguage={setCurrentLanguage} />} />
            <Route path="/booking" element={<BookingPage currentLanguage={currentLanguage} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/terms" element={<TermsConditions currentLanguage={currentLanguage} />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}
