import { useState, useMemo, useCallback } from "react";
import { ALL_JOBS } from "../constants/job-data";

export function useJobSearch() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [salaryMin, setSalaryMin] = useState(50);
  const [salaryMax, setSalaryMax] = useState(250);

  const toggleType = useCallback((t: string) => {
    setSelectedTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }, []);

  const toggleLevel = useCallback((l: string) => {
    setSelectedLevels((prev) => prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]);
  }, []);

  const filteredJobs = useMemo(() => {
    return ALL_JOBS.filter((j) => {
      if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
      if (location && !j.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (selectedTypes.length && !selectedTypes.includes(j.type)) return false;
      if (j.salaryMin < salaryMin * 1000 || j.salaryMax > salaryMax * 1000) return false;
      return true;
    });
  }, [search, location, selectedTypes, salaryMin, salaryMax]);

  return { search, setSearch, location, setLocation, selectedTypes, toggleType, selectedLevels, toggleLevel, salaryMin, setSalaryMin, salaryMax, setSalaryMax, filteredJobs };
}
