
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

interface ServiceOrderPerformanceChartProps {
  timeFilter: string;
}

const mockPerformanceData = {
  monthly: [
    { month: 'Jan', completionTime: 3.2, onTimeRate: 92, delayRate: 8 },
    { month: 'Fev', completionTime: 3.5, onTimeRate: 89, delayRate: 11 },
    { month: 'Mar', completionTime: 3.1, onTimeRate: 94, delayRate: 6 },
    { month: 'Abr', completionTime: 3.3, onTimeRate: 91, delayRate: 9 },
    { month: 'Mai', completionTime: 3.0, onTimeRate: 95, delayRate: 5 },
    { month: 'Jun', completionTime: 2.8, onTimeRate: 96, delayRate: 4 },
  ],
  daily: [
    { name: 'No Prazo', value: 96, color: '#10B981' },
    { name: 'Atrasadas', value: 4, color: '#EF4444' },
  ]
};

const COLORS = ['#10B981', '#EF4444'];

export const ServiceOrderPerformanceChart = ({ timeFilter }: ServiceOrderPerformanceChartProps) => {
  const averages = {
    completionTime: Number((mockPerformanceData.monthly.reduce((acc, curr) => acc + curr.completionTime, 0) / mockPerformanceData.monthly.length).toFixed(1)),
    onTimeRate: Number((mockPerformanceData.monthly.reduce((acc, curr) => acc + curr.onTimeRate, 0) / mockPerformanceData.monthly.length).toFixed(1)),
    delayRate: Number((mockPerformanceData.monthly.reduce((acc, curr) => acc + curr.delayRate, 0) / mockPerformanceData.monthly.length).toFixed(1))
  };

  if (timeFilter === 'daily' || timeFilter === 'current-month') {
    return (
      <div className="h-full">
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="p-3 rounded-lg bg-emerald-50">
            <p className="text-emerald-600 font-medium">No Prazo</p>
            <p>{mockPerformanceData.daily[0].value}%</p>
          </div>
          <div className="p-3 rounded-lg bg-rose-50">
            <p className="text-rose-600 font-medium">Atrasadas</p>
            <p>{mockPerformanceData.daily[1].value}%</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockPerformanceData.daily}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockPerformanceData.daily.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
        <div className="p-3 rounded-lg bg-indigo-50">
          <p className="text-indigo-600 font-medium">Tempo Médio</p>
          <p>{averages.completionTime} dias</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-50">
          <p className="text-emerald-600 font-medium">Taxa Média no Prazo</p>
          <p>{averages.onTimeRate}%</p>
        </div>
        <div className="p-3 rounded-lg bg-rose-50">
          <p className="text-rose-600 font-medium">Taxa Média de Atraso</p>
          <p>{averages.delayRate}%</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockPerformanceData.monthly}>
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
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="delayRate"
            name="Taxa de Atraso (%)"
            stroke="#EF4444"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
