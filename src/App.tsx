import "@fontsource/inter";
import "@fontsource/inter/700.css";
import "@fontsource/poppins";
import "@fontsource/sarabun";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { I18nextProvider } from 'react-i18next';
import i18n from './services/i18n/i18n';
import "./App.css";
import LoginOrSignup from "./Pages/Auth/LoginOrSignup";
import Home from "./Pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from 'react';

function App() {
  // Set document direction based on language (for RTL languages if needed)
  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = i18n.language;
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginOrSignup />} />
          <Route path="/login" element={<LoginOrSignup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </I18nextProvider>
  );
}

export default App;