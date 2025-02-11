
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Cartão de Crédito', value: 450000 },
  { name: 'PIX', value: 320000 },
  { name: 'Boleto', value: 180000 },
  { name: 'Dinheiro', value: 50000 },
];

export const PaymentMethodChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
        <XAxis 
          dataKey="name" 
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `R$ ${(value / 1000)}k`}
        />
        <Tooltip
          formatter={(value: number) => `R$ ${value.toLocaleString()}`}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#6366F1"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
