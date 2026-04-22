import { createContext, useContext, useState, useEffect } from "react";
import baseApi from "../services/Api";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openAuth, setOpenAuth] = useState(false);
    const [authType, setAuthType] = useState("login");
    const [redirectData, setRedirectData] = useState(null);
    const [accessDenied, setAccessDenied] = useState(false);
    const navigate = useNavigate();
 
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await baseApi.get("/users/me")

                if (res.data.success) {
                    setUser(res.data.data);
                    // console.log(res.data.data);

                }
            } catch (error) {
                // console.log(error.response.status);

                if (error.response?.status === 401) {
                    setUser(null); // ✅ silent
                }
                else if (error.response?.status === 403) {
                    setUser(null);
                    setAccessDenied(true);
                    setOpenAuth(false); // 🔥 prevent login modal
                } else {
                    console.error(error);
                    setUser(null); // only real issues
                }

            }
            finally {
                setLoading(false);

            }

        }
        fetchUser();
    }, [])

    // console.log(authType);

    const logout = async () => {
        try {
            const res = await baseApi.post("/users/logout"); // 🔥 call backend
            // console.log(res.data);

            toast.success(res.data.message);
            setUser(null);
             localStorage.removeItem("token");
            navigate("/"); // 🔥 clear user from state
        } catch (error) {
            //    console.error("Logout error:", error);
            toast.error("Logout failed. Please try again.");
        }
    };
    return (
        <AuthContext.Provider value={{
            user, setUser, loading, logout,
            setOpenAuth, openAuth, authType, setAuthType,
            redirectData,
            setRedirectData,
            accessDenied,
            setAccessDenied
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);