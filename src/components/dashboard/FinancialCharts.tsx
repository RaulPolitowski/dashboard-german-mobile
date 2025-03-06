
import { useState } from "react";
import { Card } from "../ui/card";
import { DateFilter } from "./types/financial";
import { useTransactions } from "./hooks/useTransactions";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TransactionsList } from "./components/TransactionsList";
import { useTheme } from "@/hooks/use-theme";

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { filteredTransactions, totals } = useTransactions(dateFilter);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Card className={`p-4 md:p-6 transition-all ${isDarkMode ? 'bg-gradient-to-br from-slate-800/90 via-blue-800/70 to-slate-800/90 text-white border-blue-700/50 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)]' : 'bg-gradient-to-br from-sky-50 via-white to-white border border-sky-100 hover:shadow-[0_4px_20px_rgba(14,165,233,0.25)]'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-900'}`}>
          Fluxo de Caixa
        </h3>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setShowTransactions(true)}
            className={`text-sm px-3 py-1 rounded-md transition-all ${
              isDarkMode 
                ? 'text-blue-300 hover:text-blue-200 bg-blue-900/30 border border-blue-700/30 hover:bg-blue-800/40 hover:border-blue-600/40 shadow-[0_0_10px_rgba(56,189,248,0.3)] hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]' 
                : 'text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300'
            }`}
          >
            Ver movimentações
          </button>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className={`border rounded-md px-3 py-1.5 text-sm transition-all ${
              isDarkMode 
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
        inflow={totals.inflow}
        outflow={totals.outflow}
        result={totals.result}
        transactions={filteredTransactions}
      />
      <div className="mt-6 p-2 rounded-lg bg-opacity-50">
        <CashFlowChart
          inflow={totals.inflow}
          outflow={totals.outflow}
          result={totals.result}
        />
      </div>

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className={`max-w-4xl ${isDarkMode ? 'bg-gradient-to-br from-slate-800/90 to-blue-800/80 border-blue-700/50 shadow-[0_0_25px_rgba(56,189,248,0.4)]' : 'bg-white shadow-lg'}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-gray-200' : ''}>Movimentações</DialogTitle>
          </DialogHeader>
          <TransactionsList transactions={filteredTransactions} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};
