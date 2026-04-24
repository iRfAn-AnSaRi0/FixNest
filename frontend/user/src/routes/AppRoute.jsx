import { Routes, Route } from "react-router-dom";
import { lazy } from "react";

// PAGES
import Home from "../pages/Home/Home"
import ProtectedRoute from "../context/ProtectedRoute"
const ServicePage = lazy(() => import("../pages/Services/ServicesPage"));
const ServicesCategoryPage = lazy(() => import("../pages/Services/ServicesCategoryPage"));
const HowItWorksPage = lazy(() => import("../pages/How-it-works/HowItWorksPage"));
const HelpPage = lazy(() => import("../pages/Help/HelpPage"));
const ContactSupportPage = lazy(() => import("../pages/Help/ContactSupportPage"));
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const ForProfessionalsPage = lazy(() => import("../pages/ForProfessionals/ForProfessionalsPage"));
const PrivacyPolicyPage = lazy(() => import("../pages/Terms-Conditions/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("../pages/Terms-Conditions/TermsPage"));
const BookingPage = lazy(() => import("../pages/Booking/BookingPage"));
const CurrentBookingAndHistory = lazy(() => import("../pages/Booking/CurrentBookingAndHistory"));

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

        <Route path="/my-bookings" element={<CurrentBookingAndHistory />} />



      </Routes>
  );
};

export default AppRoutes;