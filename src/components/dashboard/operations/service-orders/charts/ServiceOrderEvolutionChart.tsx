
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

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

const COLORS = ['#10B981', '#6366F1', '#EF4444'];

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export const ServiceOrderEvolutionChart = ({ timeFilter }: ServiceOrderEvolutionChartProps) => {
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
          <div className="p-3 rounded-lg bg-emerald-50">
            <p className="text-emerald-600 font-medium">Finalizadas</p>
            <p>Quantidade: {mockEvolutionData.daily[0].value} ordens</p>
            <p>Valor: {formatCurrency(mockEvolutionData.daily[0].amount)}</p>
          </div>
          <div className="p-3 rounded-lg bg-indigo-50">
            <p className="text-indigo-600 font-medium">Em Andamento</p>
            <p>Quantidade: {mockEvolutionData.daily[1].value} ordens</p>
            <p>Valor: {formatCurrency(mockEvolutionData.daily[1].amount)}</p>
          </div>
          <div className="p-3 rounded-lg bg-rose-50">
            <p className="text-rose-600 font-medium">Atrasadas</p>
            <p>Quantidade: {mockEvolutionData.daily[2].value} ordens</p>
            <p>Valor: {formatCurrency(mockEvolutionData.daily[2].amount)}</p>
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
          <p>Quantidade: {totals.completed} ordens</p>
          <p>Valor: {formatCurrency(totals.completedValue)}</p>
        </div>
        <div className="p-3 rounded-lg bg-indigo-50">
          <p className="text-indigo-600 font-medium">Total em Andamento</p>
          <p>Quantidade: {totals.inProgress} ordens</p>
          <p>Valor: {formatCurrency(totals.inProgressValue)}</p>
        </div>
        <div className="p-3 rounded-lg bg-rose-50">
          <p className="text-rose-600 font-medium">Total Atrasadas</p>
          <p>Quantidade: {totals.delayed} ordens</p>
          <p>Valor: {formatCurrency(totals.delayedValue)}</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={mockEvolutionData.monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="completed" name="Finalizadas (Qtd)" fill="#10B981" />
          <Bar yAxisId="right" dataKey="completedValue" name="Finalizadas (R$)" fill="#34D399" />
          <Bar yAxisId="left" dataKey="inProgress" name="Em Andamento (Qtd)" fill="#6366F1" />
          <Bar yAxisId="right" dataKey="inProgressValue" name="Em Andamento (R$)" fill="#818CF8" />
          <Bar yAxisId="left" dataKey="delayed" name="Atrasadas (Qtd)" fill="#EF4444" />
          <Bar yAxisId="right" dataKey="delayedValue" name="Atrasadas (R$)" fill="#F87171" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
