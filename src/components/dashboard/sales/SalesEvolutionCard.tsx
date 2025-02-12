
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { SalesEvolutionChart } from "../../charts/SalesEvolutionChart";

interface SalesEvolutionCardProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const SalesEvolutionCard = ({ isMinimized, onToggleMinimize }: SalesEvolutionCardProps) => {
  return (
    <Card className="p-4 md:p-6">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={onToggleMinimize}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Evolução das Vendas</h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Evolução das Vendas</h3>
            <button 
              onClick={onToggleMinimize}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
          <div className="h-[300px]">
            <SalesEvolutionChart />
          </div>
        </>
      )}
    </Card>
  );
};
