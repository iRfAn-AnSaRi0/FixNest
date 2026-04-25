import { useContext, createContext, useState, useEffect } from "react";
import { getCategory } from "../services/GetAllCategoryApi";

const CategoriesContext = createContext();

export const useCategories = () => useContext(CategoriesContext);

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);

                const res = await getCategory();
                
                setCategories(res.data.data);

            } catch (error) {
                console.log(error?.response || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <CategoriesContext.Provider value={{ categories, loading }}>
            {children}
        </CategoriesContext.Provider>
    );
};