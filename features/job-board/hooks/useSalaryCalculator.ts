import { useState, useCallback, useMemo } from "react";
import type { SalaryCalculation } from "../types";

interface UseSalaryCalculatorProps {
  initialBase?: number;
  initialBonus?: number;
  initialEquity?: number;
}

export function useSalaryCalculator({ initialBase = 150000, initialBonus = 20000, initialEquity = 50000 }: UseSalaryCalculatorProps = {}) {
  const [baseSalary, setBaseSalary] = useState(initialBase);
  const [bonus, setBonus] = useState(initialBonus);
  const [equity, setEquity] = useState(initialEquity);
  const [taxRate, setTaxRate] = useState(30);

  const calculation = useMemo<SalaryCalculation>(() => {
    const totalComp = baseSalary + bonus + equity;
    const annualAfterTax = totalComp * (1 - taxRate / 100);
    return {
      baseSalary,
      bonus,
      equity,
      totalComp,
      monthlyGross: Math.round(totalComp / 12),
      monthlyNet: Math.round(annualAfterTax / 12),
      taxRate,
    };
  }, [baseSalary, bonus, equity, taxRate]);

  const reset = useCallback(() => {
    setBaseSalary(initialBase);
    setBonus(initialBonus);
    setEquity(initialEquity);
    setTaxRate(30);
  }, [initialBase, initialBonus, initialEquity]);

  return {
    baseSalary,
    setBaseSalary,
    bonus,
    setBonus,
    equity,
    setEquity,
    taxRate,
    setTaxRate,
    calculation,
    reset,
  };
}
