import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingObjects from "./components/FloatingObjects";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home"));
const Inbound = lazy(() => import("./pages/Inbound"));
const Outbound = lazy(() => import("./pages/Outbound"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const TermsConditions = lazy(() => import("./pages/TermsConditions"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));

// Loading Component
const PageLoader = () => (
  <div style={{
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'hsl(var(--background))'
  }}>
    <div className="loader"></div>
  </div>
);

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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home currentLanguage={currentLanguage} />} />
              <Route path="/inbound" element={<Inbound selectedLanguage={currentLanguage} setSelectedLanguage={setCurrentLanguage} />} />
              <Route path="/outbound" element={<Outbound selectedLanguage={currentLanguage} setSelectedLanguage={setCurrentLanguage} />} />
              <Route path="/booking" element={<BookingPage currentLanguage={currentLanguage} />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/terms" element={<TermsConditions currentLanguage={currentLanguage} />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

