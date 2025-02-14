
import { useState } from "react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { DateFilter } from "./types/financial";
import { useTransactions } from "./hooks/useTransactions";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { TransactionsList } from "./components/TransactionsList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const ComparisonIndicator = ({ value }: { value: number | undefined }) => {
  if (typeof value === 'undefined') return null;
  
  const isPositive = value > 0;
  return (
    <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-white' : 'text-white'}`}>
      {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
      <span>{Math.abs(value).toFixed(1)}%</span>
    </div>
  );
};

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { filteredTransactions, totals } = useTransactions(dateFilter);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-emerald-500">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Receitas</h3>
            <ComparisonIndicator value={totals.comparison.inflow} />
          </div>
          <p className="text-2xl font-bold text-white mt-2">
            R$ {totals.inflow.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-rose-500">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Despesas</h3>
            <ComparisonIndicator value={totals.comparison.outflow} />
          </div>
          <p className="text-2xl font-bold text-white mt-2">
            R$ {totals.outflow.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-blue-500">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Resultado</h3>
            <ComparisonIndicator value={totals.comparison.result} />
          </div>
          <p className="text-2xl font-bold text-white mt-2">
            R$ {totals.result.toLocaleString()}
          </p>
        </Card>
      </div>

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
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Despesas</h3>
          <ExpensesDistributionChart />
        </Card>
        <ExpensesTable />
      </div>

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Movimentações</DialogTitle>
          </DialogHeader>
          <TransactionsList transactions={filteredTransactions} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
