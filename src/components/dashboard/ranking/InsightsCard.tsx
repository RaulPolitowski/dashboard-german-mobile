
import { TrendingUp, TrendingDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";

interface InsightsCardProps {
  insights: {
    [key: string]: {
      change: number;
      value: number;
    };
  };
  onMinimize: () => void;
}

export const InsightsCard = ({ insights, onMinimize }: InsightsCardProps) => {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
          Insights de Performance
        </h3>
        <button 
          onClick={onMinimize}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(insights).map(([period, data]) => (
          <div key={period} className={`p-4 rounded-lg ${
            data.change >= 0 
              ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20' 
              : 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/20'
            } border`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                {period === 'week' ? 'Semana' : period === 'month' ? 'Mês' : 'Ano'}
              </span>
              <div className={`flex items-center ${
                data.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
              }`}>
                {data.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-sm font-medium">
                  {data.change >= 0 ? '+' : ''}{data.change}%
                </span>
              </div>
            </div>
            <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
              R$ {data.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};
