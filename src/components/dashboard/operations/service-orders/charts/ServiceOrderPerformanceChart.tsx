
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const mockPerformanceData = [
  { month: 'Jan', completionTime: 3.2, onTimeRate: 92 },
  { month: 'Fev', completionTime: 3.5, onTimeRate: 89 },
  { month: 'Mar', completionTime: 3.1, onTimeRate: 94 },
  { month: 'Abr', completionTime: 3.3, onTimeRate: 91 },
  { month: 'Mai', completionTime: 3.0, onTimeRate: 95 },
  { month: 'Jun', completionTime: 2.8, onTimeRate: 96 },
];

export const ServiceOrderPerformanceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockPerformanceData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="completionTime"
          name="Tempo Médio (dias)"
          stroke="#6366F1"
          activeDot={{ r: 8 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="onTimeRate"
          name="Taxa de Entrega no Prazo (%)"
          stroke="#10B981"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
