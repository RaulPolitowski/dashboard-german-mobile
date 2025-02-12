
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BudgetTooltip } from '../tooltips/BudgetTooltip';

interface BudgetEvolutionChartProps {
  data: any[];
  timeFilter: string;
}

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

const pieData = [
  { name: 'Aprovados', value: 45, valor: 320000, percent: 66 },
  { name: 'Pendentes', value: 15, valor: 98000, percent: 22 },
  { name: 'Recusados', value: 8, valor: 45000, percent: 12 },
];

const totalBudgets = pieData.reduce((sum, item) => sum + item.value, 0);
const totalValue = pieData.reduce((sum, item) => sum + item.valor, 0);

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export const BudgetEvolutionChart = ({ data, timeFilter }: BudgetEvolutionChartProps) => {
  if (timeFilter === "this-month") {
    return (
      <div className="relative h-full">
        <div className="absolute top-0 left-0 right-0 text-center">
          <p className="text-sm text-gray-600">Total de Orçamentos: {totalBudgets}</p>
          <p className="text-sm text-gray-600">Valor Total: {formatCurrency(totalValue)}</p>
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value, valor, percent }) => 
                `${name}: ${value} (${percent}%) - ${formatCurrency(valor)}`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
        <Tooltip content={<BudgetTooltip />} />
        <Bar yAxisId="left" dataKey="aprovados" name="Aprovados (Qtd)" fill="#10B981" />
        <Bar yAxisId="right" dataKey="valorAprovados" name="Aprovados (R$)" fill="#34D399" />
        <Bar yAxisId="left" dataKey="pendentes" name="Pendentes (Qtd)" fill="#F59E0B" />
        <Bar yAxisId="right" dataKey="valorPendentes" name="Pendentes (R$)" fill="#FBBF24" />
        <Bar yAxisId="left" dataKey="recusados" name="Recusados (Qtd)" fill="#EF4444" />
        <Bar yAxisId="right" dataKey="valorRecusados" name="Recusados (R$)" fill="#F87171" />
      </BarChart>
    </ResponsiveContainer>
  );
};
