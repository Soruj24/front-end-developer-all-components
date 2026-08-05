import { useState, useMemo, useCallback } from "react";
import { COURSES } from "../constants/course-data";

export function useCourseFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCourses = useMemo(() => {
    return activeCategory === "All" ? COURSES : COURSES.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const resetFilter = useCallback(() => setActiveCategory("All"), []);

  return { activeCategory, setActiveCategory, filteredCourses, resetFilter };
}
