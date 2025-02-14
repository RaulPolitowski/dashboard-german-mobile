
import { useState } from "react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { DateFilter } from "./types/financial";
import { useTransactions } from "./hooks/useTransactions";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";

export const FinancialCharts = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const { filteredTransactions, totals } = useTransactions(dateFilter);

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Fluxo de Caixa</h3>
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
    </div>
  );
};
