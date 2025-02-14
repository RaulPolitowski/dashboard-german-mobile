
import { ChartBar, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Calendar, TrendingDown, TrendingUp, X } from "lucide-react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useMemo } from "react";
import { format, parseISO, subDays, startOfMonth, endOfMonth, isWithinInterval, isSameDay, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ResponsiveBar } from "@nivo/bar";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";

interface Transaction {
  id: string;
  date: string;
  description: string;
  value: number;
  type: 'inflow' | 'outflow';
}

type DateFilter = 'today' | 'yesterday' | 'last7days' | 'currentMonth' | 'lastMonth';

export const FinancialCharts = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState<DateFilter>('today');
  const itemsPerPage = 5;

  const transactions: readonly Transaction[] = [
    { id: '1', date: '2024-02-20T14:30:00', description: 'Venda Produto A', value: 1500, type: 'inflow' } as const,
    { id: '2', date: '2024-02-19T09:15:00', description: 'Pagamento Fornecedor', value: 800, type: 'outflow' } as const,
    { id: '3', date: '2024-02-18T16:45:00', description: 'Venda Serviço B', value: 2000, type: 'inflow' } as const,
    { id: '4', date: '2024-02-17T11:20:00', description: 'Despesas Operacionais', value: 600, type: 'outflow' } as const,
    { id: '5', date: '2024-02-20T10:00:00', description: 'Venda Produto C', value: 1200, type: 'inflow' } as const,
    { id: '6', date: '2024-02-20T13:45:00', description: 'Manutenção', value: 450, type: 'outflow' } as const,
    { id: '7', date: '2024-02-19T15:30:00', description: 'Venda Serviço D', value: 1800, type: 'inflow' } as const,
    { id: '8', date: '2024-02-18T09:00:00', description: 'Material de Escritório', value: 300, type: 'outflow' } as const,
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredTransactions = useMemo(() => {
    const today = new Date();
    const yesterday = subDays(today, 1);
    const last7Days = subDays(today, 7);
    const currentMonthStart = startOfMonth(today);
    const currentMonthEnd = endOfMonth(today);
    const lastMonthStart = startOfMonth(subMonths(today, 1));
    const lastMonthEnd = endOfMonth(subMonths(today, 1));

    return transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      switch (dateFilter) {
        case 'today':
          return isSameDay(transactionDate, today);
        case 'yesterday':
          return isSameDay(transactionDate, yesterday);
        case 'last7days':
          return isWithinInterval(transactionDate, { start: last7Days, end: today });
        case 'currentMonth':
          return isWithinInterval(transactionDate, { start: currentMonthStart, end: currentMonthEnd });
        case 'lastMonth':
          return isWithinInterval(transactionDate, { start: lastMonthStart, end: lastMonthEnd });
        default:
          return true;
      }
    });
  }, [transactions, dateFilter]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const totals = useMemo(() => {
    const inflow = filteredTransactions
      .filter(t => t.type === 'inflow')
      .reduce((sum, t) => sum + t.value, 0);
    const outflow = filteredTransactions
      .filter(t => t.type === 'outflow')
      .reduce((sum, t) => sum + t.value, 0);
    return {
      inflow,
      outflow,
      result: inflow - outflow
    };
  }, [filteredTransactions]);

  const chartData = useMemo(() => {
    return [
      {
        type: "Entradas",
        value: totals.inflow,
        color: "rgb(16, 185, 129)"
      },
      {
        type: "Saídas",
        value: totals.outflow,
        color: "rgb(244, 63, 94)"
      },
      {
        type: "Resultado",
        value: totals.result,
        color: "rgb(59, 130, 246)"
      }
    ];
  }, [totals]);

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h3 className="font-semibold text-emerald-700">Entradas</h3>
            </div>
            <p className="text-2xl font-bold text-emerald-600 mt-2">
              R$ {totals.inflow.toLocaleString()}
            </p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-rose-500" />
              <h3 className="font-semibold text-rose-700">Saídas</h3>
            </div>
            <p className="text-2xl font-bold text-rose-600 mt-2">
              R$ {totals.outflow.toLocaleString()}
            </p>
          </Card>

          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200">
            <div className="flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-blue-700">Resultado</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              R$ {totals.result.toLocaleString()}
            </p>
          </Card>
        </div>

        <div className="mt-6 h-[200px]">
          <ResponsiveBar
            data={chartData}
            keys={['value']}
            indexBy="type"
            margin={{ top: 10, right: 10, bottom: 40, left: 80 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            colors={({ data }) => data.color}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: (value) => `R$ ${value.toLocaleString()}`
            }}
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Movimentações</h3>
          <div className="flex gap-2">
            <Select value={dateFilter} onValueChange={(value: DateFilter) => {
              setDateFilter(value);
              setCurrentPage(1); // Reset page when filter changes
            }}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                  <SelectItem value="currentMonth">Mês atual</SelectItem>
                  <SelectItem value="lastMonth">Mês anterior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {paginatedTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className={`p-4 rounded-lg border ${
                transaction.type === 'inflow'
                  ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                  : 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                    {transaction.description}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(parseISO(transaction.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
                  </p>
                </div>
                <span className={`text-lg font-bold ${
                  transaction.type === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  R$ {transaction.value.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="flex items-center px-4 text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
