import { useContext, createContext, useEffect, useState } from "react";
import baseApi from "../services/Api"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [openAuth, setOpenAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {


    const fetcTechnician = async () => {
      try {
        const res = await baseApi.get("/technician/me");
        // console.log(res.data.data);
        console.log("ME RESPONSE:", res.data);
        setUser(res.data.data.user);

      } catch (error) {
        const status = error.response?.status;

        console.log("ERROR STATUS:", status);

        if (status === 401) {
          // ❌ Not logged in
          setUser(null);
        } else if (status === 403) {
          setUser(null);
          setAccessDenied(true);
          setOpenAuth(false); // 🔥 prevent login modal
        } else {
          console.error(error);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetcTechnician();
  }, []);

  const logout = async () => {
    try {
      const res = await baseApi.post("/users/logout")
      console.log(res.data);
      setUser(null);

    } catch (error) {
      console.error(error.response);

    }
  }

  return (
    <AuthContext.Provider value={{
      user, setUser, openAuth, setOpenAuth, loading, logout, accessDenied,
      setAccessDenied
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const techAuth = () => useContext(AuthContext)