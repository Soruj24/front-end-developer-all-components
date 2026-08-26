import { useSalaryCalculator } from "../hooks/useSalaryCalculator";

export function SalaryCalculator() {
  const { baseSalary, setBaseSalary, bonus, setBonus, equity, setEquity, taxRate, setTaxRate, calculation, reset } = useSalaryCalculator();

  const formatCurrency = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Total Compensation Calculator</h3>
        <button onClick={reset} className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300">Reset</button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Base Salary</label>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{formatCurrency(baseSalary)}</span>
          </div>
          <input type="range" min={50000} max={500000} step={5000} value={baseSalary} onChange={(e) => setBaseSalary(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Annual Bonus</label>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{formatCurrency(bonus)}</span>
          </div>
          <input type="range" min={0} max={200000} step={5000} value={bonus} onChange={(e) => setBonus(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Equity (Annual)</label>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{formatCurrency(equity)}</span>
          </div>
          <input type="range" min={0} max={500000} step={10000} value={equity} onChange={(e) => setEquity(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700" />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Effective Tax Rate</label>
            <span className="text-xs font-semibold text-zinc-900 dark:text-white">{taxRate}%</span>
          </div>
          <input type="range" min={15} max={50} step={1} value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-900 dark:bg-zinc-700" />
        </div>

        <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800/50">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Total Comp</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{formatCurrency(calculation.totalComp)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Monthly Gross</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white">{formatCurrency(calculation.monthlyGross)}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Annual After Tax</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(calculation.totalComp * (1 - taxRate / 100))}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Monthly Net</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{formatCurrency(calculation.monthlyNet)}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex-1 rounded-lg border border-zinc-100 p-2.5 text-center dark:border-zinc-800">
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Base</p>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{Math.round((baseSalary / calculation.totalComp) * 100)}%</p>
          </div>
          <div className="flex-1 rounded-lg border border-zinc-100 p-2.5 text-center dark:border-zinc-800">
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Bonus</p>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{Math.round((bonus / calculation.totalComp) * 100)}%</p>
          </div>
          <div className="flex-1 rounded-lg border border-zinc-100 p-2.5 text-center dark:border-zinc-800">
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500">Equity</p>
            <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{Math.round((equity / calculation.totalComp) * 100)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
