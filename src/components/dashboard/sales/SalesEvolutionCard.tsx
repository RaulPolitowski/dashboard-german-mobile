
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { SalesEvolutionChart } from "../../charts/SalesEvolutionChart";
import { useTheme } from "@/hooks/use-theme";

interface SalesEvolutionCardProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export const SalesEvolutionCard = ({ isMinimized, onToggleMinimize }: SalesEvolutionCardProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <Card className={`p-4 md:p-6 ${isDarkMode ? 'dashboard-card' : ''} transition-all duration-300`}>
      {isMinimized ? (
        <div 
          className={`flex items-center justify-between cursor-pointer ${
            isDarkMode ? 'hover:bg-dashboard-hover/30 p-2 rounded-md transition-colors' : ''
          }`}
          onClick={onToggleMinimize}
        >
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-700'}`}>
            Evolução das Vendas
          </h3>
          <ChevronDown className={`w-5 h-5 ${
            isDarkMode 
              ? 'text-primary animate-pulse-glow' 
              : 'text-gray-500'
          }`} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-700'}`}>
              Evolução das Vendas
            </h3>
            <button 
              onClick={onToggleMinimize}
              className={`p-2 ${
                isDarkMode 
                  ? 'hover:bg-dashboard-hover/50 text-primary hover:text-primary-glow hover:shadow-neon' 
                  : 'hover:bg-gray-100'
              } rounded-full transition-all duration-300`}
            >
              <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-gray-500'}`} />
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
