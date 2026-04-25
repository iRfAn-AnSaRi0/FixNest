import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoute";
import ScrollToTop from "./components/ui/ScrollToTop";
import { useAuth } from "./context/AuthContext";
import AccessDenied from "./components/ui/AccessDenied";
import { Suspense } from "react";
import FixNestLoader from "./components/ui/FixNestLoader";
import { CategoriesProvider } from "./context/CategoryContext";


function App() {

  const { accessDenied, loading } = useAuth();

  //  if (loading) {
  //    return <FixNestLoader />; // or loader
  //  }

  return (
    <>

      {accessDenied ? (
        <AccessDenied />
      ) : (
        <>
          <Suspense fallback={<FixNestLoader />}>
            <Toaster position="top-right" reverseOrder={false} />
            <ScrollToTop />
            <CategoriesProvider>
              <Navbar />
              <AppRoutes />
              <Footer />
            </CategoriesProvider>

          </Suspense>
        </>

      )}

    </>
  );
}

export default App;
