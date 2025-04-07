import { useState } from "react";
import { Card } from "../ui/card";
import { DateFilter } from "./types/financial";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useTheme } from "@/hooks/use-theme";
import { useFinancial } from "@/contexts/FinancialContext";

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { inflow, outflow } = useFinancial();
  const result = inflow - outflow;

  return (
    <Card className={`p-4 md:p-6 transition-all ${isDarkMode ? 'bg-gradient-to-br from-slate-800/90 via-blue-800/70 to-slate-800/90 text-white border-blue-700/50 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]' : 'bg-gradient-to-br from-sky-50 via-white to-white border border-sky-100 hover:shadow-[0_4px_20px_rgba(14,165,233,0.25)]'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-900'}`}>
          Fluxo de Caixa
        </h3>
        <div className="flex gap-2 items-center">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className={`border rounded-md px-3 py-1.5 text-sm transition-all ${isDarkMode
                ? 'bg-blue-900/30 border-blue-700/50 text-gray-200 focus:outline-none focus:border-blue-500/80 focus:shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                : 'bg-sky-50 border-sky-200 focus:outline-none focus:border-sky-300 focus:ring-1 focus:ring-sky-200'
              }`}
          >
            <option value="today">Hoje</option>
            <option value="yesterday">Ontem</option>
            <option value="last7days">Últimos 7 dias</option>
            <option value="currentMonth">Mês atual</option>
            <option value="lastMonth">Mês anterior</option>
          </select>
        </div>
      </div>
      <CashFlowMetrics
        inflow={inflow}
        outflow={outflow}
        result={result}
      />
      <div className="mt-6 p-2 rounded-lg bg-opacity-50">
        <CashFlowChart
          inflow={inflow}
          outflow={outflow}
          result={result}
        />
      </div>
    </Card>
  );
};
