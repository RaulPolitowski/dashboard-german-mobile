import { Card } from "../ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { useFinancial } from "@/contexts/FinancialContext";

const ComparisonCard = ({
  title,
  currentValue,
  previousValue,
  type
}: {
  title: string;
  currentValue: number;
  previousValue: number;
  type: "inflow" | "outflow" | "result";
}) => {
  const comparison = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0;
  const isPositive = comparison > 0;
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const getCardStyles = () => {
    if (type === "inflow") {
      return isDarkMode ? "finance-card-inflow" : "bg-emerald-500 text-white";
    } else if (type === "outflow") {
      return isDarkMode ? "finance-card-outflow" : "bg-red-500 text-white";
    } else {
      return isDarkMode ? "finance-card-result" : "bg-blue-500 text-white";
    }
  };

  return (
    <Card className={`p-4 ${getCardStyles()} transition-all duration-300 ${isDarkMode ? 'shadow-lg border border-opacity-30' : ''}`}>
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
  const { inflow, outflow, lastMonthInflow, lastMonthOutflow } = useFinancial();
  const result = inflow - outflow;
  const lastMonthResult = lastMonthInflow - lastMonthOutflow;

  return (
    <>
      <ComparisonCard
        title="Receitas"
        currentValue={inflow}
        previousValue={lastMonthInflow}
        type="inflow"
      />
      <ComparisonCard
        title="Despesas"
        currentValue={outflow}
        previousValue={lastMonthOutflow}
        type="outflow"
      />
      <ComparisonCard
        title="Resultado"
        currentValue={result}
        previousValue={lastMonthResult}
        type="result"
      />
    </>
  );
};
