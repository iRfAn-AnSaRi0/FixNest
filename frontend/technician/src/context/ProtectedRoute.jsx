import { useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, setOpenAuth, loading } = useAuth();
    useEffect(() => {
        if (!loading && user === null) {
            setOpenAuth(true)
        }
    }, [user, loading, setOpenAuth])

    // if (loading) return <p>Loading...</p>;

    if (!user) {
        return null;
    }


    return children;
}

export default ProtectedRoute