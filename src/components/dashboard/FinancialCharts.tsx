
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

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const [showTransactions, setShowTransactions] = useState(false);
  const { filteredTransactions, totals } = useTransactions(dateFilter);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-emerald-700">Receitas</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            R$ {totals.inflow.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-rose-700">Despesas</h3>
          </div>
          <p className="text-2xl font-bold text-rose-600 mt-2">
            R$ {totals.outflow.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-blue-700">Resultado</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
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
          <TransactionsList
            transactions={filteredTransactions}
            dateFilter={dateFilter}
            currentPage={1}
            totalPages={Math.ceil(filteredTransactions.length / 5)}
            onDateFilterChange={setDateFilter}
            onPageChange={() => {}}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
