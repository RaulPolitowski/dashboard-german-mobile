import { Card } from "../ui/card";
import { ArrowDownIcon, ArrowUpIcon, Loader2 } from "lucide-react";
import { useTransactions } from "./hooks/useTransactions";
import { useState } from "react";
import { DateFilter } from "./types/financial";
import { useTheme } from "@/hooks/use-theme";
import { Alert, AlertDescription } from "../ui/alert";

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
  type: "inflow" | "outflow" | "result";
}) => {
  const isPositive = comparison > 0;
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const getCardStyles = () => {
    if (isDarkMode) {
      switch (type) {
        case "inflow":
          return "finance-card-inflow";
        case "outflow":
          return "finance-card-outflow";
        case "result":
          return "finance-card-result";
        default:
          return "";
      }
    } else {
      switch (type) {
        case "inflow":
          return "bg-emerald-500 text-white";
        case "outflow":
          return "bg-red-500 text-white";
        case "result":
          return "bg-blue-500 text-white";
        default:
          return "";
      }
    }
  };
  
  return (
    <Card className={`p-4 ${getCardStyles()}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">{title}</h3>
          <div className={`flex items-center gap-1 text-sm text-white ${isDarkMode ? 'animate-pulse-glow' : ''}`}>
            {isPositive ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
            <span>{Math.abs(comparison).toFixed(1)}%</span>
          </div>
        </div>
        <p className={`text-2xl font-bold text-white ${isDarkMode ? 'drop-shadow-md' : ''}`}>
          R$ {currentValue.toLocaleString()}
        </p>
        <p className="text-sm text-white/80">
          Mesmo dia mês anterior: R$ {previousValue.toLocaleString()}
        </p>
      </div>
    </Card>
  );
};

export const FinancialOverview = () => {
  const [dateFilter] = useState<DateFilter>('today');
  const { totals, lastMonthSameDay, isLoading, error } = useTransactions(dateFilter);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Calcular valores do mês anterior (com proteção contra valores indefinidos)
  const lastMonthInflow = lastMonthSameDay
    ? lastMonthSameDay
        .filter(t => t.type === 'inflow')
        .reduce((sum, t) => sum + t.value, 0)
    : 0;
  
  const lastMonthOutflow = lastMonthSameDay
    ? lastMonthSameDay
        .filter(t => t.type === 'outflow')
        .reduce((sum, t) => sum + t.value, 0)
    : 0;

  const lastMonthResult = lastMonthInflow - lastMonthOutflow;

  // Exibir loader enquanto carrega
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-40 gap-4">
        <Loader2 className={`h-10 w-10 animate-spin ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
        <p className="text-sm">Carregando dados financeiros...</p>
      </div>
    );
  }

  // Exibir mensagem de erro, se houver
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

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
