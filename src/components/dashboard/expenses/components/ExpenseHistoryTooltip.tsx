
import { ExpenseHistory } from "../types/expense";

interface ExpenseHistoryTooltipProps {
  currentValue: number;
  previousValues: ExpenseHistory[];
  getPercentageChange: (current: number, previous: number) => string;
}

export const ExpenseHistoryTooltip = ({ 
  currentValue, 
  previousValues, 
  getPercentageChange 
}: ExpenseHistoryTooltipProps) => {
  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-sm">Histórico Comparativo</h4>
      <div className="space-y-2">
        {previousValues.map((prev) => {
          const change = Number(getPercentageChange(currentValue, prev.value));
          return (
            <div key={prev.month} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{prev.month}:</span>
              <div className="flex items-center gap-2">
                <span>R$ {prev.value.toLocaleString()}</span>
                <span className={change > 0 ? "text-rose-500" : "text-emerald-500"}>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pt-2 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Valor atual: <span className="font-semibold">R$ {currentValue.toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};
