
import { Card } from "../ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useTransactions } from "./hooks/useTransactions";
import { useState } from "react";
import { DateFilter } from "./types/financial";

const ComparisonCard = ({ 
  title, 
  currentValue, 
  previousValue, 
  comparison, 
  type
}: { 
  title: string;
  currentValue: number;
  previousValue: number;
  comparison: number;
  type: 'inflow' | 'outflow' | 'result';
}) => {
  const isPositive = comparison > 0;
  
  const getColors = () => {
    switch (type) {
      case 'inflow':
        return {
          bg: 'bg-[#D3E4FD]',
          text: 'text-blue-700',
          border: 'border-blue-100'
        };
      case 'outflow':
        return {
          bg: 'bg-[#E5DEFF]',
          text: 'text-purple-700',
          border: 'border-purple-100'
        };
      case 'result':
        return currentValue >= 0 
          ? {
              bg: 'bg-[#F2FCE2]',
              text: 'text-green-700',
              border: 'border-green-100'
            }
          : {
              bg: 'bg-red-50',
              text: 'text-red-700',
              border: 'border-red-100'
            };
    }
  };

  const { bg, text, border } = getColors();
  
  return (
    <Card className={`p-6 ${bg} ${border} border rounded-xl shadow-sm`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${text}`}>{title}</h3>
          <div className={`flex items-center gap-1 text-sm ${text}`}>
            {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
            <span>{Math.abs(comparison).toFixed(1)}%</span>
          </div>
        </div>
        <p className={`text-2xl font-bold ${text}`}>
          R$ {currentValue.toLocaleString()}
        </p>
        <p className={`text-sm ${text} opacity-80`}>
          Mesmo dia mês anterior: R$ {previousValue.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};

export const FinancialOverview = () => {
  const [dateFilter] = useState<DateFilter>('today');
  const { totals, lastMonthSameDay } = useTransactions(dateFilter);

  const lastMonthInflow = lastMonthSameDay
    .filter(t => t.type === 'inflow')
    .reduce((sum, t) => sum + t.value, 0);
  
  const lastMonthOutflow = lastMonthSameDay
    .filter(t => t.type === 'outflow')
    .reduce((sum, t) => sum + t.value, 0);

  const lastMonthResult = lastMonthInflow - lastMonthOutflow;

  return (
    <>
      <ComparisonCard
        title="Receitas"
        currentValue={totals.inflow}
        previousValue={lastMonthInflow}
        comparison={totals.comparison.inflow}
        type="inflow"
      />
      <ComparisonCard
        title="Despesas"
        currentValue={totals.outflow}
        previousValue={lastMonthOutflow}
        comparison={totals.comparison.outflow}
        type="outflow"
      />
      <ComparisonCard
        title="Resultado"
        currentValue={totals.result}
        previousValue={lastMonthResult}
        comparison={totals.comparison.result}
        type="result"
      />
    </>
  );
};
