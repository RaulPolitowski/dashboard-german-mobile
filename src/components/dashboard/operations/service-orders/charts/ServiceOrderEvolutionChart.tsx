import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface ServiceOrderEvolutionChartProps {
  timeFilter: string;
}

const mockEvolutionData = {
  monthly: [
    { month: 'Jan', completed: 25, completedValue: 125000, inProgress: 15, inProgressValue: 75000, delayed: 3, delayedValue: 15000 },
    { month: 'Fev', completed: 28, completedValue: 140000, inProgress: 18, inProgressValue: 90000, delayed: 4, delayedValue: 20000 },
    { month: 'Mar', completed: 32, completedValue: 160000, inProgress: 20, inProgressValue: 100000, delayed: 5, delayedValue: 25000 },
    { month: 'Abr', completed: 30, completedValue: 150000, inProgress: 22, inProgressValue: 110000, delayed: 3, delayedValue: 15000 },
    { month: 'Mai', completed: 35, completedValue: 175000, inProgress: 19, inProgressValue: 95000, delayed: 2, delayedValue: 10000 },
    { month: 'Jun', completed: 38, completedValue: 190000, inProgress: 21, inProgressValue: 105000, delayed: 4, delayedValue: 20000 },
  ],
  daily: [
    { name: 'Finalizadas', value: 38, amount: 190000, color: '#10B981' },
    { name: 'Em Andamento', value: 21, amount: 105000, color: '#6366F1' },
    { name: 'Atrasadas', value: 4, amount: 20000, color: '#EF4444' },
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
            {`${entry.name}: ${entry.value.toLocaleString()} ${entry.payload && entry.payload.amount ? `(R$ ${entry.payload.amount.toLocaleString()})` : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export const ServiceOrderEvolutionChart = ({ timeFilter }: ServiceOrderEvolutionChartProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Cores adaptadas para modo escuro e claro
  const chartColors = {
    completed: isDarkMode ? '#34D399' : '#10B981',      // Emerald mais claro para dark mode
    completedValue: isDarkMode ? '#6EE7B7' : '#34D399', // Emerald ainda mais claro
    inProgress: isDarkMode ? '#818CF8' : '#6366F1',     // Indigo mais claro para dark mode
    inProgressValue: isDarkMode ? '#A5B4FC' : '#818CF8', // Indigo ainda mais claro
    delayed: isDarkMode ? '#F87171' : '#EF4444',        // Rose mais claro para dark mode
    delayedValue: isDarkMode ? '#FCA5A5' : '#F87171',   // Rose ainda mais claro
    grid: isDarkMode ? '#374151' : '#E5E7EB',           // Cor da grade adaptada
    text: isDarkMode ? '#D1D5DB' : '#6B7280',           // Cor do texto adaptada
  };

  const COLORS = [chartColors.completed, chartColors.inProgress, chartColors.delayed];

  const totals = mockEvolutionData.monthly.reduce((acc, curr) => ({
    completed: acc.completed + curr.completed,
    completedValue: acc.completedValue + curr.completedValue,
    inProgress: acc.inProgress + curr.inProgress,
    inProgressValue: acc.inProgressValue + curr.inProgressValue,
    delayed: acc.delayed + curr.delayed,
    delayedValue: acc.delayedValue + curr.delayedValue,
  }), { 
    completed: 0, 
    completedValue: 0,
    inProgress: 0, 
    inProgressValue: 0,
    delayed: 0, 
    delayedValue: 0 
  });

  if (timeFilter === 'daily' || timeFilter === 'current-month') {
    return (
      <div className="h-full">
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 border-emerald-700/80' : 'bg-emerald-50'}`}>
            <p className={`font-medium ${isDarkMode ? 'text-emerald-200' : 'text-emerald-600'}`}>Finalizadas</p>
            <p className={isDarkMode ? 'text-emerald-300' : ''}>Quantidade: {mockEvolutionData.daily[0].value} ordens</p>
            <p className={isDarkMode ? 'text-emerald-300' : ''}>Valor: {formatCurrency(mockEvolutionData.daily[0].amount)}</p>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-indigo-900/60 border-indigo-700/80' : 'bg-indigo-50'}`}>
            <p className={`font-medium ${isDarkMode ? 'text-indigo-200' : 'text-indigo-600'}`}>Em Andamento</p>
            <p className={isDarkMode ? 'text-indigo-300' : ''}>Quantidade: {mockEvolutionData.daily[1].value} ordens</p>
            <p className={isDarkMode ? 'text-indigo-300' : ''}>Valor: {formatCurrency(mockEvolutionData.daily[1].amount)}</p>
          </div>
          <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-rose-900/60 border-rose-700/80' : 'bg-rose-50'}`}>
            <p className={`font-medium ${isDarkMode ? 'text-rose-200' : 'text-rose-600'}`}>Atrasadas</p>
            <p className={isDarkMode ? 'text-rose-300' : ''}>Quantidade: {mockEvolutionData.daily[2].value} ordens</p>
            <p className={isDarkMode ? 'text-rose-300' : ''}>Valor: {formatCurrency(mockEvolutionData.daily[2].amount)}</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockEvolutionData.daily}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, amount }) => `${name}: ${value} (${formatCurrency(amount)})`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockEvolutionData.daily.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
            <Legend wrapperStyle={{ color: chartColors.text }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900/60 border-emerald-700/80' : 'bg-emerald-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-emerald-200' : 'text-emerald-600'}`}>Total Finalizadas</p>
          <p className={isDarkMode ? 'text-emerald-300' : ''}>Quantidade: {totals.completed} ordens</p>
          <p className={isDarkMode ? 'text-emerald-300' : ''}>Valor: {formatCurrency(totals.completedValue)}</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-indigo-900/60 border-indigo-700/80' : 'bg-indigo-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-indigo-200' : 'text-indigo-600'}`}>Total em Andamento</p>
          <p className={isDarkMode ? 'text-indigo-300' : ''}>Quantidade: {totals.inProgress} ordens</p>
          <p className={isDarkMode ? 'text-indigo-300' : ''}>Valor: {formatCurrency(totals.inProgressValue)}</p>
        </div>
        <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-rose-900/60 border-rose-700/80' : 'bg-rose-50'}`}>
          <p className={`font-medium ${isDarkMode ? 'text-rose-200' : 'text-rose-600'}`}>Total Atrasadas</p>
          <p className={isDarkMode ? 'text-rose-300' : ''}>Quantidade: {totals.delayed} ordens</p>
          <p className={isDarkMode ? 'text-rose-300' : ''}>Valor: {formatCurrency(totals.delayedValue)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockEvolutionData.monthly}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
          <XAxis dataKey="month" tick={{ fill: chartColors.text }} />
          <YAxis yAxisId="left" tick={{ fill: chartColors.text }} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} tick={{ fill: chartColors.text }} />
          <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
          <Legend wrapperStyle={{ color: chartColors.text }} />
          <Bar yAxisId="left" dataKey="completed" name="Finalizadas (Qtd)" fill={chartColors.completed} />
          <Bar yAxisId="right" dataKey="completedValue" name="Finalizadas (R$)" fill={chartColors.completedValue} />
          <Bar yAxisId="left" dataKey="inProgress" name="Em Andamento (Qtd)" fill={chartColors.inProgress} />
          <Bar yAxisId="right" dataKey="inProgressValue" name="Em Andamento (R$)" fill={chartColors.inProgressValue} />
          <Bar yAxisId="left" dataKey="delayed" name="Atrasadas (Qtd)" fill={chartColors.delayed} />
          <Bar yAxisId="right" dataKey="delayedValue" name="Atrasadas (R$)" fill={chartColors.delayedValue} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
