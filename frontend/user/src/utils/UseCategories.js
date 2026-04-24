import { useQuery } from "@tanstack/react-query";
import { getCategory } from "./services/GetAllCategoryApi";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategory();
      return res?.data?.data || [];
    },
    staleTime: 1000 * 60 * 10, // 10 min cache
  });
};