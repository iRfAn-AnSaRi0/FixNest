import { useEffect } from "react";
import { adminAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, setOpenAuth, loading } = adminAuth();
    useEffect(() => {
        if (!loading && user === null) {
            setOpenAuth(true)
        }
    }, [user, loading, setOpenAuth])

 if (loading) return null;

    if (!user) {
        return null;
    }


    return children;
}

export default ProtectedRoute