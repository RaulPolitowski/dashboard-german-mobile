
import { useState } from "react";
import { Card } from "../ui/card";
import { DateFilter } from "./types/financial";
import { useTransactions } from "./hooks/useTransactions";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { TransactionsList } from "./components/TransactionsList";

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { filteredTransactions, totals } = useTransactions(dateFilter);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Fluxo de Caixa</h3>
        <div className="flex gap-2 items-center">
          <button 
            onClick={() => setShowTransactions(true)}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            Ver movimentações
          </button>
          <select 
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className="border border-gray-200 rounded-md px-3 py-1.5 text-sm"
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
      <div className="mt-6">
        <CashFlowChart
          inflow={totals.inflow}
          outflow={totals.outflow}
          result={totals.result}
        />
      </div>

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Movimentações</DialogTitle>
          </DialogHeader>
          <TransactionsList transactions={filteredTransactions} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};
