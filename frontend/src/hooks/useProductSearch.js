// hooks/useProductSearch.js

import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../api/products";

export const useProductSearch = (filters) => {
  return useQuery({
    queryKey: ["products", "search", filters],
    queryFn: () => searchProducts(filters),
    enabled: !!filters,
  });
};