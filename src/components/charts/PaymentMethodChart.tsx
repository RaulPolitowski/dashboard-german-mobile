
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Cartão de Crédito', value: 450000 },
  { name: 'PIX', value: 320000 },
  { name: 'Boleto', value: 180000 },
  { name: 'Dinheiro', value: 50000 },
];

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444'];

export const PaymentMethodChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: number) => `R$ ${value.toLocaleString()}`}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};
