import { useMemo, useState, useEffect } from 'react';
import { Transaction, DateFilter } from '../types/financial';
import { subDays, startOfMonth, endOfMonth, isWithinInterval, isSameDay, subMonths, parseISO } from 'date-fns';
import { financialService, salesService, expensesService } from '../../../services/api';

// Funções para converter dados da API para o formato de transações
const mapFinancialToTransactions = (financialData: any[]): Transaction[] => {
  const inflowTransactions = financialData.map(item => ({
    id: item.id.toString(),
    date: item.date || new Date().toISOString(),
    description: `Registro Financeiro - ${item.month}/${item.year}`,
    value: parseFloat(item.inflow) || 0,
    type: 'inflow' as const
  }));
  
  const outflowTransactions = financialData.map(item => ({
    id: `out-${item.id}`,
    date: item.date || new Date().toISOString(),
    description: `Despesas - ${item.month}/${item.year}`,
    value: parseFloat(item.outflow) || 0,
    type: 'outflow' as const
  }));
  
  return [...inflowTransactions, ...outflowTransactions];
};

const mapSalesToTransactions = (salesData: any[]): Transaction[] => {
  return salesData.map(item => ({
    id: `sale-${item.id}`,
    date: item.date || new Date().toISOString(),
    description: `Venda: ${item.product || 'Produto'} - ${item.customer || 'Cliente'}`,
    value: parseFloat(item.totalAmount) || 0,
    type: 'inflow' as const
  }));
};

const mapExpensesToTransactions = (expensesData: any[]): Transaction[] => {
  return expensesData.map(item => ({
    id: `exp-${item.id}`,
    date: item.date || new Date().toISOString(),
    description: `${item.category || 'Despesa'}: ${item.description || 'Sem descrição'}`,
    value: parseFloat(item.amount) || 0,
    type: 'outflow' as const
  }));
};

export const useTransactions = (dateFilter: DateFilter) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados da API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Buscar dados financeiros
        const financialData = await financialService.getAll();
        const salesData = await salesService.getAll();
        const expensesData = await expensesService.getAll();
        
        // Converter para o formato de transações
        const financialTransactions = mapFinancialToTransactions(financialData);
        const salesTransactions = mapSalesToTransactions(salesData);
        const expensesTransactions = mapExpensesToTransactions(expensesData);
        
        // Combinar todos os dados
        const allTransactions = [
          ...financialTransactions,
          ...salesTransactions,
          ...expensesTransactions
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setTransactions(allTransactions);
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err);
        setError('Falha ao carregar dados. Usando dados de exemplo.');
        
        // Dados de exemplo para fallback
        const today = new Date();
        const todayStr = today.toISOString();
        const yesterdayStr = subDays(today, 1).toISOString();
        const lastMonthSameDayStr = subMonths(today, 1).toISOString();
        
        const fallbackData = [
          { id: '1', date: todayStr, description: 'Venda Produto A', value: 1500, type: 'inflow' } as const,
          { id: '2', date: todayStr, description: 'Pagamento Fornecedor', value: 800, type: 'outflow' } as const,
          { id: '3', date: todayStr, description: 'Venda Serviço B', value: 2000, type: 'inflow' } as const,
          { id: '11', date: lastMonthSameDayStr, description: 'Venda Produto A', value: 1200, type: 'inflow' } as const,
          { id: '12', date: lastMonthSameDayStr, description: 'Pagamento Fornecedor', value: 700, type: 'outflow' } as const,
          { id: '13', date: lastMonthSameDayStr, description: 'Venda Serviço B', value: 1800, type: 'inflow' } as const,
          { id: '4', date: yesterdayStr, description: 'Despesas Operacionais', value: 600, type: 'outflow' } as const,
          { id: '5', date: yesterdayStr, description: 'Venda Produto C', value: 1200, type: 'inflow' } as const,
        ];
        
        setTransactions(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []); // Executar apenas uma vez na montagem do componente

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
  }, [dateFilter, transactions]);

  const lastMonthSameDay = useMemo(() => {
    const lastMonth = subMonths(new Date(), 1);
    return transactions.filter(transaction => 
      isSameDay(parseISO(transaction.date), lastMonth)
    );
  }, [transactions]);

  const totals = useMemo(() => {
    const inflow = filteredTransactions
      .filter(t => t.type === 'inflow')
      .reduce((sum, t) => sum + t.value, 0);
    const outflow = filteredTransactions
      .filter(t => t.type === 'outflow')
      .reduce((sum, t) => sum + t.value, 0);
    
    // Evitar divisão por zero usando valores padrão
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
        inflow: lastMonthInflow ? ((inflow - lastMonthInflow) / lastMonthInflow) * 100 : 0,
        outflow: lastMonthOutflow ? ((outflow - lastMonthOutflow) / lastMonthOutflow) * 100 : 0,
        result: (lastMonthInflow - lastMonthOutflow) ? ((inflow - outflow - (lastMonthInflow - lastMonthOutflow)) / Math.abs(lastMonthInflow - lastMonthOutflow)) * 100 : 0
      }
    };
  }, [filteredTransactions, lastMonthSameDay]);

  return { filteredTransactions, totals, lastMonthSameDay, isLoading, error };
};
