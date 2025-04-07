import { ChartBar, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../../ui/card";
import { useTheme } from "@/hooks/use-theme";

interface CashFlowMetricsProps {
  inflow: number;
  outflow: number;
  result: number;
}

export const CashFlowMetrics = ({ inflow, outflow, result }: CashFlowMetricsProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        className={`p-4 transition-all ${isDarkMode
          ? 'bg-[#10b981] text-white border-[#059669]'
          : 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 hover:bg-emerald-50'
          }`}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-emerald-500'}`} />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-emerald-700'}`}>Entradas</h3>
        </div>
        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-emerald-600'} mt-2`}>
          R$ {inflow.toLocaleString()}
        </p>
      </Card>

      <Card
        className={`p-4 transition-all ${isDarkMode
          ? 'bg-[#ef4444] text-white border-[#dc2626]'
          : 'bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 hover:bg-rose-50'
          }`}
      >
        <div className="flex items-center gap-2">
          <TrendingDown className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-rose-500'}`} />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-rose-700'}`}>Saídas</h3>
        </div>
        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-rose-600'} mt-2`}>
          R$ {outflow.toLocaleString()}
        </p>
      </Card>

      <Card
        className={`p-4 ${isDarkMode
          ? 'bg-[#3b82f6] text-white border-[#2563eb]'
          : 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200'
          }`}
      >
        <div className="flex items-center gap-2">
          <ChartBar className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-500'}`} />
          <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>Resultado</h3>
        </div>
        <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'} mt-2`}>
          R$ {result.toLocaleString()}
        </p>
      </Card>
    </div>
  );
};
