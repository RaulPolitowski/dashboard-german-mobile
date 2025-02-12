
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { WeeklySalesChart } from "../../charts/WeeklySalesChart";

interface WeeklySalesCardProps {
  isMinimized: boolean;
  isInsightsMinimized: boolean;
  onToggleMinimize: () => void;
  onToggleInsights: () => void;
}

export const WeeklySalesCard = ({
  isMinimized,
  isInsightsMinimized,
  onToggleMinimize,
  onToggleInsights
}: WeeklySalesCardProps) => {
  return (
    <Card className="p-4 md:p-6">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={onToggleMinimize}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Análise de Vendas por Dia e Horário</h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Análise de Vendas por Dia e Horário</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição semanal de vendas por intervalo de horário</p>
            </div>
            <button 
              onClick={onToggleMinimize}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          {!isInsightsMinimized && <WeeklySalesChart />}
          <div className="mt-4">
            <div 
              className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={onToggleInsights}
            >
              <h4 className="font-medium text-gray-700 dark:text-gray-200">Insights</h4>
              {isInsightsMinimized ? (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
