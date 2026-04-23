import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoute";
import ScrollToTop from "./components/ui/ScrollToTop";
import { getCategory } from "./services/GetAllCategoryApi";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import AccessDenied from "./components/ui/AccessDenied";
import { Suspense } from "react";
import FixNestLoader from "./components/ui/FixNestLoader";

function App() {

  const { accessDenied, loading } = useAuth();

  //  console.time("FixNestAppLoad");

  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategory();
        setCategories(res?.data?.data || []);

      } catch (error) {
        console.error(error);
      } finally {
        setLoad(false);
        // console.timeEnd("FixNestAppLoad");
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return null; // or loader
  }

  return (
    <>

      {accessDenied ? (
        <AccessDenied />
      ) : (
        <>
        <Suspense  fallback={<FixNestLoader/>}>
          <Toaster position="top-right" reverseOrder={false} />
          <ScrollToTop />
          <Navbar />
          <AppRoutes categories={categories} loading={loading} />
          <Footer categories={categories} />
          </Suspense>
        </>
        
      )}

    </>
  );
}

export default App;
