import { useMemo, useState, useEffect } from 'react';
import { DateFilter } from '../types/financial';
import { financialService } from '../../../services/api';

interface FinancialData {
  mensagem: string;
  receitaTotal: number;
  despesaTotal: number;
  receitaMesAnterior: number;
  despesaMesAnterior: number;
}

export const useTransactions = (dateFilter: DateFilter) => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await financialService.getAll();
        setData(response);
      } catch (err) {
        console.error('Erro ao buscar dados da API:', err);
        setError('Falha ao carregar dados.');

        // Dados de exemplo para fallback
        setData({
          mensagem: "Dados do banco recebidos!",
          receitaTotal: 0,
          despesaTotal: 0,
          receitaMesAnterior: 0,
          despesaMesAnterior: 0
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []); // Executar apenas uma vez na montagem do componente

  const totals = useMemo(() => {
    if (!data) return {
      inflow: 0,
      outflow: 0,
      result: 0,
      comparison: {
        inflow: 0,
        outflow: 0,
        result: 0
      }
    };

    const inflow = data.receitaTotal;
    const outflow = data.despesaTotal;
    const lastMonthInflow = data.receitaMesAnterior;
    const lastMonthOutflow = data.despesaMesAnterior;

    return {
      inflow,
      outflow,
      result: inflow - outflow,
      comparison: {
        inflow: lastMonthInflow ? ((inflow - lastMonthInflow) / lastMonthInflow) * 100 : 0,
        outflow: lastMonthOutflow ? ((outflow - lastMonthOutflow) / lastMonthOutflow) * 100 : 0,
        result: (lastMonthInflow - lastMonthOutflow) ?
          ((inflow - outflow - (lastMonthInflow - lastMonthOutflow)) / Math.abs(lastMonthInflow - lastMonthOutflow)) * 100 : 0
      }
    };
  }, [data]);

  // Simulando dados do mês anterior para manter a interface consistente
  const lastMonthSameDay = useMemo(() => {
    if (!data) return [];
    return [
      {
        id: 'last-month-inflow',
        date: new Date().toISOString(),
        description: 'Receita Mês Anterior',
        value: data.receitaMesAnterior,
        type: 'inflow' as const
      },
      {
        id: 'last-month-outflow',
        date: new Date().toISOString(),
        description: 'Despesa Mês Anterior',
        value: data.despesaMesAnterior,
        type: 'outflow' as const
      }
    ];
  }, [data]);

  return { totals, lastMonthSameDay, isLoading, error };
};
