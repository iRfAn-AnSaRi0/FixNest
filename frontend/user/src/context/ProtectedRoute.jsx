import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading, setOpenAuth, setAuthType } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setOpenAuth(true); // 👈 open login modal
      setAuthType("login");
    }
  }, [user, loading]);

  if (loading) return <p>Loading...</p>;

  if (!user) return null; // 👈 don't render page

  return children;
};

export default ProtectedRoute;