
import { ExpenseHistory } from "../types/expense";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`space-y-3 ${isDarkMode ? 'text-gray-200' : ''}`}>
      <h4 className={`font-semibold text-sm ${isDarkMode ? 'text-gray-100' : ''}`}>
        Histórico Comparativo
      </h4>
      <div className="space-y-2">
        {previousValues.map((prev) => {
          const change = Number(getPercentageChange(currentValue, prev.value));
          return (
            <div key={prev.month} className="flex justify-between items-center text-sm">
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                {prev.month}:
              </span>
              <div className="flex items-center gap-2">
                <span className={isDarkMode ? 'text-gray-200' : ''}>
                  R$ {prev.value.toLocaleString()}
                </span>
                <span className={
                  change > 0 
                    ? isDarkMode ? 'text-rose-400 font-medium' : 'text-rose-500' 
                    : isDarkMode ? 'text-emerald-400 font-medium' : 'text-emerald-500'
                }>
                  {change > 0 ? "+" : ""}{change}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <div className={`pt-2 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <p className={isDarkMode ? 'text-sm text-gray-300' : 'text-sm text-gray-600'}>
          Valor atual: <span className={`font-semibold ${isDarkMode ? 'text-white' : ''}`}>
            R$ {currentValue.toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};
