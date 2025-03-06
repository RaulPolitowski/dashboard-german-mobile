import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface ServiceOrderPerformanceChartProps {
  timeFilter: string;
}

const mockPerformanceData = {
  monthly: [
    { month: 'Jan', sla: 95, avgTime: 2.5, onTime: 98 },
    { month: 'Fev', sla: 93, avgTime: 2.7, onTime: 95 },
    { month: 'Mar', sla: 97, avgTime: 2.2, onTime: 99 },
    { month: 'Abr', sla: 94, avgTime: 2.6, onTime: 96 },
    { month: 'Mai', sla: 96, avgTime: 2.3, onTime: 97 },
    { month: 'Jun', sla: 98, avgTime: 2.1, onTime: 99 },
  ],
  daily: [
    { day: 'Seg', sla: 96, avgTime: 2.3, onTime: 97 },
    { day: 'Ter', sla: 95, avgTime: 2.4, onTime: 96 },
    { day: 'Qua', sla: 97, avgTime: 2.2, onTime: 98 },
    { day: 'Qui', sla: 94, avgTime: 2.5, onTime: 95 },
    { day: 'Sex', sla: 98, avgTime: 2.1, onTime: 99 },
    { day: 'Sáb', sla: 93, avgTime: 2.6, onTime: 94 },
    { day: 'Dom', sla: 92, avgTime: 2.7, onTime: 93 },
  ]
};

// Componente personalizado para o Tooltip do Recharts
const CustomTooltip = ({ active, payload, label, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-md shadow-md ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{`${label || ''}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.name.includes('SLA') || entry.name.includes('Pontualidade') ? '%' : entry.name.includes('Tempo') ? ' dias' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ServiceOrderPerformanceChart = ({ timeFilter }: ServiceOrderPerformanceChartProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Cores adaptadas para modo escuro e claro
  const chartColors = {
    sla: isDarkMode ? '#34D399' : '#10B981',      // Emerald mais claro para dark mode
    avgTime: isDarkMode ? '#818CF8' : '#6366F1',  // Indigo mais claro para dark mode
    onTime: isDarkMode ? '#F59E0B' : '#D97706',   // Amber mais claro para dark mode
    grid: isDarkMode ? '#374151' : '#E5E7EB',     // Cor da grade adaptada
    text: isDarkMode ? '#D1D5DB' : '#6B7280',     // Cor do texto adaptada
  };

  const data = timeFilter === 'daily' ? mockPerformanceData.daily : mockPerformanceData.monthly;
  const xKey = timeFilter === 'daily' ? 'day' : 'month';

  // Calcular médias para os indicadores de desempenho
  const averages = data.reduce((acc, curr) => ({
    sla: acc.sla + curr.sla,
    avgTime: acc.avgTime + curr.avgTime,
    onTime: acc.onTime + curr.onTime,
  }), { sla: 0, avgTime: 0, onTime: 0 });

  const totalItems = data.length;
  const avgSLA = (averages.sla / totalItems).toFixed(1);
  const avgTime = (averages.avgTime / totalItems).toFixed(1);
  const avgOnTime = (averages.onTime / totalItems).toFixed(1);

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 border-emerald-700/80' : 'bg-emerald-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-emerald-200' : 'text-emerald-600'}`}>SLA Médio</p>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>{avgSLA}%</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-indigo-900/60 border-indigo-700/80' : 'bg-indigo-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-indigo-200' : 'text-indigo-600'}`}>Tempo Médio</p>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{avgTime} dias</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-amber-900/60 border-amber-700/80' : 'bg-amber-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-amber-200' : 'text-amber-600'}`}>Pontualidade</p>
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>{avgOnTime}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
          <XAxis dataKey={xKey} tick={{ fill: chartColors.text }} />
          <YAxis tick={{ fill: chartColors.text }} />
          <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
          <Legend wrapperStyle={{ color: chartColors.text }} />
          <Line type="monotone" dataKey="sla" name="SLA (%)" stroke={chartColors.sla} activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="avgTime" name="Tempo Médio (dias)" stroke={chartColors.avgTime} />
          <Line type="monotone" dataKey="onTime" name="Pontualidade (%)" stroke={chartColors.onTime} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
