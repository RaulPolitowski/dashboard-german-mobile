
import { useMemo } from 'react';
import { Transaction, DateFilter } from '../types/financial';
import { subDays, startOfMonth, endOfMonth, isWithinInterval, isSameDay, subMonths, parseISO } from 'date-fns';

// Gerando data atual para as transações
const today = new Date();
const todayStr = today.toISOString();
const yesterdayStr = subDays(today, 1).toISOString();
const lastMonthSameDayStr = subMonths(today, 1).toISOString();

export const transactions: readonly Transaction[] = [
  { id: '1', date: todayStr, description: 'Venda Produto A', value: 1500, type: 'inflow' } as const,
  { id: '2', date: todayStr, description: 'Pagamento Fornecedor', value: 800, type: 'outflow' } as const,
  { id: '3', date: todayStr, description: 'Venda Serviço B', value: 2000, type: 'inflow' } as const,
  { id: '11', date: lastMonthSameDayStr, description: 'Venda Produto A', value: 1200, type: 'inflow' } as const,
  { id: '12', date: lastMonthSameDayStr, description: 'Pagamento Fornecedor', value: 700, type: 'outflow' } as const,
  { id: '13', date: lastMonthSameDayStr, description: 'Venda Serviço B', value: 1800, type: 'inflow' } as const,
  { id: '4', date: yesterdayStr, description: 'Despesas Operacionais', value: 600, type: 'outflow' } as const,
  { id: '5', date: yesterdayStr, description: 'Venda Produto C', value: 1200, type: 'inflow' } as const,
  { id: '6', date: yesterdayStr, description: 'Manutenção', value: 450, type: 'outflow' } as const,
  { id: '7', date: todayStr, description: 'Venda Serviço D', value: 1800, type: 'inflow' } as const,
  { id: '8', date: todayStr, description: 'Material de Escritório', value: 300, type: 'outflow' } as const,
  { id: '9', date: yesterdayStr, description: 'Venda Produto E', value: 2500, type: 'inflow' } as const,
  { id: '10', date: yesterdayStr, description: 'Pagamento Internet', value: 200, type: 'outflow' } as const,
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

  const lastMonthSameDay = useMemo(() => {
    const lastMonth = subMonths(new Date(), 1);
    return transactions.filter(transaction => 
      isSameDay(parseISO(transaction.date), lastMonth)
    );
  }, []);

  const totals = useMemo(() => {
    const inflow = filteredTransactions
      .filter(t => t.type === 'inflow')
      .reduce((sum, t) => sum + t.value, 0);
    const outflow = filteredTransactions
      .filter(t => t.type === 'outflow')
      .reduce((sum, t) => sum + t.value, 0);
    
    const lastMonthInflow = lastMonthSameDay
      .filter(t => t.type === 'inflow')
      .reduce((sum, t) => sum + t.value, 0);
    const lastMonthOutflow = lastMonthSameDay
      .filter(t => t.type === 'outflow')
      .reduce((sum, t) => sum + t.value, 0);

    return {
      inflow,
      outflow,
      result: inflow - outflow,
      comparison: {
        inflow: ((inflow - lastMonthInflow) / lastMonthInflow) * 100,
        outflow: ((outflow - lastMonthOutflow) / lastMonthOutflow) * 100,
        result: ((inflow - outflow - (lastMonthInflow - lastMonthOutflow)) / Math.abs(lastMonthInflow - lastMonthOutflow)) * 100
      }
    };
  }, [filteredTransactions, lastMonthSameDay]);

  return { filteredTransactions, totals, lastMonthSameDay };
};
