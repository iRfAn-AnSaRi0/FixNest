import { createContext, useContext, useState } from "react";
import { getCurrentBooking, getHistory, cancelBooking } from "../services/BookingApi";

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [currentBooking, setCurrentBooking] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Current Booking (only if not already fetched)
    const fetchCurrentBooking = async (force = false) => {
        if (!force && currentBooking.length > 0) return; // 🔥 prevent extra calls

        setLoading(true);
        try {
            const res = await getCurrentBooking();
            // console.log(res.data.data);

            setCurrentBooking(res.data.data); // ✅ fix
        } catch (error) {
            // console.error(error);
            throw error
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
         setLoading(true);
        try {
            const res = await getHistory();

            setHistory(prev => {
                // merge API + local (avoid duplicates)
                const ids = new Set(prev.map(i => i._id));
                const merged = [...prev];

                res.data.data.forEach(item => {
                    if (!ids.has(item._id)) {
                        merged.push(item);
                    }
                });

                return merged;
            });

        } catch (error) {
            // console.error(error);
            throw error
        } finally {
            setLoading(false);
        }
    };

    const cancelBookingApi = async (id) => {
        try {
            const res = await cancelBooking(id);
            const cancelledItem = res.data.data;

            // remove from current
            setCurrentBooking(prev =>
                prev.filter(item => item._id !== id)
            );
            // add to history
            setHistory(prev => [cancelledItem, ...prev]);
            return res; 

        } catch (error) {

            // console.log("CONTEXT ERROR:", error.response?.data);
            throw error; // ✅ VERY IMPORTANT

        }
    };

    return (
        <BookingContext.Provider
            value={{
                currentBooking,
                history,
                loading,
                fetchCurrentBooking,
                fetchHistory,
                cancelBookingApi,
            }}
        >
            {children}
        </BookingContext.Provider>
    );
};