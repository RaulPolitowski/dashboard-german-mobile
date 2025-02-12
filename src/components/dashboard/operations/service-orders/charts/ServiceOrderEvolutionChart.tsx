
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../../../../ui/card';

interface ServiceOrderEvolutionChartProps {
  timeFilter: string;
}

const mockEvolutionData = {
  monthly: [
    { month: 'Jan', completed: 25, inProgress: 15, delayed: 3 },
    { month: 'Fev', completed: 28, inProgress: 18, delayed: 4 },
    { month: 'Mar', completed: 32, inProgress: 20, delayed: 5 },
    { month: 'Abr', completed: 30, inProgress: 22, delayed: 3 },
    { month: 'Mai', completed: 35, inProgress: 19, delayed: 2 },
    { month: 'Jun', completed: 38, inProgress: 21, delayed: 4 },
  ],
  daily: [
    { name: 'Finalizadas', value: 38, color: '#10B981' },
    { name: 'Em Andamento', value: 21, color: '#6366F1' },
    { name: 'Atrasadas', value: 4, color: '#EF4444' },
  ]
};

const COLORS = ['#10B981', '#6366F1', '#EF4444'];

export const ServiceOrderEvolutionChart = ({ timeFilter }: ServiceOrderEvolutionChartProps) => {
  const totals = mockEvolutionData.monthly.reduce((acc, curr) => ({
    completed: acc.completed + curr.completed,
    inProgress: acc.inProgress + curr.inProgress,
    delayed: acc.delayed + curr.delayed,
  }), { completed: 0, inProgress: 0, delayed: 0 });

  if (timeFilter === 'daily' || timeFilter === 'current-month') {
    return (
      <div className="h-full">
        <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
          <div className="p-3 rounded-lg bg-emerald-50">
            <p className="text-emerald-600 font-medium">Finalizadas</p>
            <p>{mockEvolutionData.daily[0].value} ordens</p>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50">
            <p className="text-indigo-600 font-medium">Em Andamento</p>
            <p>{mockEvolutionData.daily[1].value} ordens</p>
          </div>
          <div className="p-3 rounded-lg bg-rose-50">
            <p className="text-rose-600 font-medium">Atrasadas</p>
            <p>{mockEvolutionData.daily[2].value} ordens</p>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={mockEvolutionData.daily}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {mockEvolutionData.daily.map((entry, index) => (
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
        <div className="p-3 rounded-lg bg-emerald-50">
          <p className="text-emerald-600 font-medium">Total Finalizadas</p>
          <p>{totals.completed} ordens</p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50">
          <p className="text-indigo-600 font-medium">Total em Andamento</p>
          <p>{totals.inProgress} ordens</p>
        </div>
        <div className="p-3 rounded-lg bg-rose-50">
          <p className="text-rose-600 font-medium">Total Atrasadas</p>
          <p>{totals.delayed} ordens</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockEvolutionData.monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" name="Finalizadas" fill="#10B981" />
          <Bar dataKey="inProgress" name="Em Andamento" fill="#6366F1" />
          <Bar dataKey="delayed" name="Atrasadas" fill="#F43F5E" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
