
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIsMobile } from '../../hooks/use-mobile';

const data = [
  { category: 'Pessoal', value: 35000 },
  { category: 'Marketing', value: 15000 },
  { category: 'Operacional', value: 25000 },
  { category: 'Infraestrutura', value: 18000 },
  { category: 'Logística', value: 12000 },
  { category: 'Tecnologia', value: 8500 },
  { category: 'Manutenção', value: 6500 },
  { category: 'Treinamento', value: 4500 },
  { category: 'Seguros', value: 3800 },
  { category: 'Outros', value: 2700 }
].sort((a, b) => b.value - a.value);

export const ExpensesDistributionChart = () => {
  const total = data.reduce((acc, curr) => acc + curr.value, 0);
  const isMobile = useIsMobile();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data} 
        layout="vertical"
        margin={isMobile ? 
          { top: 5, right: 10, left: 80, bottom: 5 } : 
          { top: 5, right: 30, left: 100, bottom: 5 }
        }
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
        <XAxis 
          type="number"
          tickFormatter={(value) => `R$ ${(value / 1000)}k`}
          domain={[0, 'dataMax']}
          tickMargin={5}
        />
        <YAxis 
          type="category"
          dataKey="category"
          width={isMobile ? 70 : 90}
          tick={{ 
            fontSize: isMobile ? 11 : 12,
            textAnchor: "end",
          }}
        />
        <Tooltip
          formatter={(value: number) => [
            `R$ ${value.toLocaleString()}`,
            `${((value / total) * 100).toFixed(1)}% do total`
          ]}
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
          }}
        />
        <Bar 
          dataKey="value" 
          fill="#F43F5E"
          radius={[0, 4, 4, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
