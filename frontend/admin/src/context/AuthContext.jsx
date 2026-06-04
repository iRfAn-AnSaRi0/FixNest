import { useContext, createContext, useState, useEffect} from "react";
import baseApi from "../services/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [openAuth, setOpenAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);

    useEffect(()=>{
        const fetchAdmin = async () =>{
            try {
                const res = await baseApi.get("/me");
                // console.log(res.data);
                setUser(res.data.data);
            } catch (error) {
                 console.error("Error fetching admin profile:", error);
                 setUser(null);
            }finally{
                 setLoading(false);
            }
        }
        fetchAdmin();
    }, [])

    const logout = async () =>{
        try {
            const res =  await baseApi.post("/logout");
            // console.log(res.data);
            localStorage.removeItem("token")
            setUser(null);
        } catch (error) {
             console.error("Error logging out:", error);
        }
    }

    return(
        <AuthContext.Provider value={{user, setUser, openAuth, setOpenAuth, loading, setLoading, accessDenied, setAccessDenied, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const adminAuth = () => useContext(AuthContext);
