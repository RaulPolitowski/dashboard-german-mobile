
import { useMemo } from 'react';
import { Transaction, DateFilter } from '../types/financial';
import { subDays, startOfMonth, endOfMonth, isWithinInterval, isSameDay, subMonths, parseISO } from 'date-fns';

export const transactions: readonly Transaction[] = [
  { id: '1', date: '2024-02-20T14:30:00', description: 'Venda Produto A', value: 1500, type: 'inflow' } as const,
  { id: '2', date: '2024-02-20T09:15:00', description: 'Pagamento Fornecedor', value: 800, type: 'outflow' } as const,
  { id: '3', date: '2024-02-20T16:45:00', description: 'Venda Serviço B', value: 2000, type: 'inflow' } as const,
  { id: '4', date: '2024-02-20T11:20:00', description: 'Despesas Operacionais', value: 600, type: 'outflow' } as const,
  { id: '5', date: '2024-02-20T10:00:00', description: 'Venda Produto C', value: 1200, type: 'inflow' } as const,
  { id: '6', date: '2024-02-20T13:45:00', description: 'Manutenção', value: 450, type: 'outflow' } as const,
  { id: '7', date: '2024-02-20T15:30:00', description: 'Venda Serviço D', value: 1800, type: 'inflow' } as const,
  { id: '8', date: '2024-02-20T09:00:00', description: 'Material de Escritório', value: 300, type: 'outflow' } as const,
  { id: '9', date: '2024-02-19T14:30:00', description: 'Venda Produto E', value: 2500, type: 'inflow' } as const,
  { id: '10', date: '2024-02-19T10:15:00', description: 'Pagamento Internet', value: 200, type: 'outflow' } as const,
  { id: '11', date: '2024-02-18T16:45:00', description: 'Venda Serviço F', value: 3000, type: 'inflow' } as const,
  { id: '12', date: '2024-02-18T11:20:00', description: 'Aluguel', value: 1500, type: 'outflow' } as const,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const useTransactions = (dateFilter: DateFilter) => {
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
  }, [dateFilter]);

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

  return { filteredTransactions, totals };
};
