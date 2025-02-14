
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

const ComparisonCard = ({ 
  title, 
  currentValue, 
  previousValue, 
  comparison, 
  bgColor 
}: { 
  title: string;
  currentValue: number;
  previousValue: number;
  comparison: number;
  bgColor: string;
}) => {
  const isPositive = comparison > 0;
  
  return (
    <Card className={`p-4 ${bgColor}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <div className="flex items-center gap-1 text-sm text-white">
            {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
            <span>{Math.abs(comparison).toFixed(1)}%</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-white">
          R$ {currentValue.toLocaleString()}
        </p>
        <p className="text-sm text-white/80">
          Mesmo dia mês anterior: R$ {previousValue.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { filteredTransactions, totals, lastMonthSameDay } = useTransactions(dateFilter);

  const lastMonthInflow = lastMonthSameDay
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.value, 0);
  
  const lastMonthOutflow = lastMonthSameDay
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.value, 0);

  const lastMonthResult = lastMonthInflow - lastMonthOutflow;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ComparisonCard
          title="Receitas"
          currentValue={totals.inflow}
          previousValue={lastMonthInflow}
          comparison={totals.comparison.inflow}
          bgColor="bg-blue-500"
        />
        <ComparisonCard
          title="Despesas"
          currentValue={totals.outflow}
          previousValue={lastMonthOutflow}
          comparison={totals.comparison.outflow}
          bgColor="bg-rose-500"
        />
        <ComparisonCard
          title="Resultado"
          currentValue={totals.result}
          previousValue={lastMonthResult}
          comparison={totals.comparison.result}
          bgColor={totals.result >= 0 ? "bg-emerald-500" : "bg-rose-500"}
        />
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
