import { useState, useMemo, useCallback } from "react";
import { MENU_ITEMS } from "../constants/menu-data";

export function useFilters() {
  const [activeCuisine, setActiveCuisine] = useState("All");
  const [activeDietary, setActiveDietary] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (activeCuisine !== "All" && item.category !== activeCuisine) return false;
      if (activeDietary && !item.dietary.includes(activeDietary)) return false;
      if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [activeCuisine, activeDietary, searchQuery]);

  const searchSuggestions = useMemo(() => {
    return MENU_ITEMS.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 0).slice(0, 5);
  }, [searchQuery]);

  const resetFilters = useCallback(() => {
    setActiveCuisine("All");
    setActiveDietary(null);
    setSearchQuery("");
  }, []);

  return { activeCuisine, setActiveCuisine, activeDietary, setActiveDietary, searchQuery, setSearchQuery, filteredItems, searchSuggestions, resetFilters };
}
