import { useState } from "react";
import { Card } from "../../../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useTheme } from "@/hooks/use-theme";

const mockData = [
  { month: 'Jan', received: 45, approved: 32, rejected: 3, value: 280000 },
  { month: 'Fev', received: 52, approved: 38, rejected: 4, value: 320000 },
  { month: 'Mar', received: 48, approved: 35, rejected: 5, value: 300000 },
  { month: 'Abr', received: 56, approved: 42, rejected: 3, value: 380000 },
  { month: 'Mai', received: 62, approved: 48, rejected: 4, value: 420000 },
  { month: 'Jun', received: 58, approved: 45, rejected: 3, value: 400000 },
];

// Componente personalizado para o Tooltip do Recharts
const CustomTooltip = ({ active, payload, label, isDarkMode }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className={`p-3 rounded-md shadow-md ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
        <p className={`text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-xs" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const OrderCharts = () => {
  const [showEvolution, setShowEvolution] = useState(true);
  const [showConversion, setShowConversion] = useState(true);
  const [timeFilter, setTimeFilter] = useState("monthly");
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Cores adaptadas para modo escuro e claro
  const chartColors = {
    received: isDarkMode ? '#818CF8' : '#6366F1', // Indigo mais claro para dark mode
    approved: isDarkMode ? '#34D399' : '#10B981', // Emerald mais claro para dark mode
    rejected: isDarkMode ? '#F87171' : '#EF4444', // Rose mais claro para dark mode
    value: isDarkMode ? '#818CF8' : '#6366F1',    // Indigo mais claro para dark mode
    grid: isDarkMode ? '#374151' : '#E5E7EB',     // Cor da grade adaptada
    text: isDarkMode ? '#D1D5DB' : '#6B7280',     // Cor do texto adaptada
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className={`p-4 ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
            Evolução dos Pedidos
          </h3>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200'}`}>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white'}>
                <SelectGroup>
                  <SelectItem value="daily">Hoje</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <button
              onClick={() => setShowEvolution(!showEvolution)}
              className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} rounded-full transition-colors`}
            >
              {showEvolution ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {showEvolution && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" tick={{ fill: chartColors.text }} />
              <YAxis tick={{ fill: chartColors.text }} />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Legend wrapperStyle={{ color: chartColors.text }} />
              <Line type="monotone" dataKey="received" name="Recebidos" stroke={chartColors.received} activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="approved" name="Aprovados" stroke={chartColors.approved} />
              <Line type="monotone" dataKey="rejected" name="Rejeitados" stroke={chartColors.rejected} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card className={`p-4 ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
            Conversão de Pedidos
          </h3>
          <button
            onClick={() => setShowConversion(!showConversion)}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} rounded-full transition-colors`}
          >
            {showConversion ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {showConversion && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="month" tick={{ fill: chartColors.text }} />
              <YAxis tick={{ fill: chartColors.text }} />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Legend wrapperStyle={{ color: chartColors.text }} />
              <Bar dataKey="value" name="Valor Total (R$)" fill={chartColors.value} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};
