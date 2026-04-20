import { Toaster } from "react-hot-toast";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoute";
import ScrollToTop from "./components/ui/ScrollToTop";
import { getCategory } from "./services/GetAllCategoryApi";
import { useState, useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import AccessDenied from "./components/ui/AccessDenied";

function App() {

  const [categories, setCategories] = useState([]);
  const [load, setLoad] = useState(true);

  const { accessDenied, loading } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoad(true)
        const res = await getCategory();
        const data = res?.data?.data || [];
        setCategories(data);

        setTimeout(() => {
          setLoad(false);
        }, 600);
      } catch (error) {
        console.error(error)
        setCategories([]);
        setLoad(false);
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
          <Toaster position="top-right" reverseOrder={false} />
          <ScrollToTop />
          <Navbar />
          <AppRoutes categories={categories} loading={loading} />
          <Footer categories={categories} />
        </>
      )}

    </>
  );
}

export default App;
