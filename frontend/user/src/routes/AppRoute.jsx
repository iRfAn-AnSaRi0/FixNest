import { Routes, Route } from "react-router-dom";

// PAGES
import Home from "../pages/Home/Home";
import ServicePage from "../pages/Services/ServicesPage";
import ServicesCategoryPage from "../pages/Services/ServicesCategoryPage";
import HowItWorksPage from "../pages/How-it-works/HowItWorksPage";
import HelpPage from "../pages/Help/HelpPage";
import ContactSupportPage from "../pages/Help/ContactSupportPage";
import AboutPage from "../pages/About/AboutPage";
import ForProfessionalsPage from "../pages/ForProfessionals/ForProfessionalsPage";
import PrivacyPolicyPage from "../pages/Terms-Conditions/PrivacyPolicyPage";
import TermsPage from "../pages/Terms-Conditions/TermsPage";
import BookingPage from "../pages/Booking/BookingPage";
import ProtectedRoute from "../context/ProtectedRoute";
import BookingSuccess from "../pages/Booking/BookingSuccess";
import CurrentBookingAndHistory from "../pages/Booking/CurrentBookingAndHistory";

const AppRoutes = ({ categories, loading }) => {

  return (
    <Routes>

      {/* HOME */}
      <Route path="/" element={<Home categories={categories} loading={loading} />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/how-it-works" element={<HowItWorksPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/contact" element={<ContactSupportPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/professionals" element={<ForProfessionalsPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-conditions" element={<TermsPage />} />
      <Route path="/booking/:id" element={<ProtectedRoute>
        <BookingPage />
      </ProtectedRoute>} />
      {/* SERVICES (Dynamic) */}
      <Route path="/services/:name/:id" element={<ServicesCategoryPage />} />

      <Route path="/my-bookings" element={<CurrentBookingAndHistory/>} />



    </Routes>
  );
};

export default AppRoutes;