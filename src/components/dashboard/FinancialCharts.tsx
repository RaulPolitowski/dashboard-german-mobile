
import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { DateFilter } from "./types/financial";
import { useTransactions } from "./hooks/useTransactions";
import { CashFlowMetrics } from "./components/CashFlowMetrics";
import { CashFlowChart } from "./components/CashFlowChart";
import { TransactionsList } from "./components/TransactionsList";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";

export const FinancialCharts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const itemsPerPage = 5;

  const { filteredTransactions, totals } = useTransactions(dateFilter);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleDateFilterChange = (value: DateFilter) => {
    setDateFilter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa</h3>
        <CashFlowMetrics
          inflow={totals.inflow}
          outflow={totals.outflow}
          result={totals.result}
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

      <Card className="p-4 md:p-6">
        <TransactionsList
          transactions={paginatedTransactions}
          dateFilter={dateFilter}
          currentPage={currentPage}
          totalPages={totalPages}
          onDateFilterChange={handleDateFilterChange}
          onPageChange={setCurrentPage}
        />
      </Card>
    </div>
  );
};
