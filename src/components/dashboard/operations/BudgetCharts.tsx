
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '../../ui/card';

const mockData = [
  { month: 'Jan', aprovados: 45, valorAprovados: 320000, pendentes: 15, valorPendentes: 98000, recusados: 8, valorRecusados: 45000 },
  { month: 'Fev', aprovados: 50, valorAprovados: 375000, pendentes: 12, valorPendentes: 85000, recusados: 10, valorRecusados: 62000 },
  { month: 'Mar', aprovados: 48, valorAprovados: 350000, pendentes: 18, valorPendentes: 120000, recusados: 7, valorRecusados: 38000 },
  { month: 'Abr', aprovados: 52, valorAprovados: 390000, pendentes: 14, valorPendentes: 95000, recusados: 9, valorRecusados: 52000 },
  { month: 'Mai', aprovados: 55, valorAprovados: 420000, pendentes: 16, valorPendentes: 110000, recusados: 11, valorRecusados: 68000 },
  { month: 'Jun', aprovados: 58, valorAprovados: 450000, pendentes: 13, valorPendentes: 89000, recusados: 8, valorRecusados: 48000 },
];

const conversionData = [
  { month: 'Jan', aprovados: 45, pendentes: 15, vencidos: 5, taxa: 65 },
  { month: 'Fev', aprovados: 50, pendentes: 12, vencidos: 6, taxa: 68 },
  { month: 'Mar', aprovados: 48, pendentes: 18, vencidos: 4, taxa: 62 },
  { month: 'Abr', aprovados: 52, pendentes: 14, vencidos: 7, taxa: 70 },
  { month: 'Mai', aprovados: 55, pendentes: 16, vencidos: 5, taxa: 72 },
  { month: 'Jun', aprovados: 58, pendentes: 13, vencidos: 6, taxa: 75 },
];

export const BudgetCharts = () => {
  const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Evolução de Orçamentos</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name.startsWith('valor')) {
                    return [formatCurrency(value), 'Valor'];
                  }
                  return [value, 'Quantidade'];
                }}
              />
              <Bar yAxisId="left" dataKey="aprovados" name="Aprovados (Qtd)" fill="#10B981" />
              <Bar yAxisId="right" dataKey="valorAprovados" name="Aprovados (R$)" fill="#34D399" />
              <Bar yAxisId="left" dataKey="pendentes" name="Pendentes (Qtd)" fill="#F59E0B" />
              <Bar yAxisId="right" dataKey="valorPendentes" name="Pendentes (R$)" fill="#FBBF24" />
              <Bar yAxisId="left" dataKey="recusados" name="Recusados (Qtd)" fill="#EF4444" />
              <Bar yAxisId="right" dataKey="valorRecusados" name="Recusados (R$)" fill="#F87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Taxa de Conversão e Status</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" unit="%" />
              <Tooltip 
                formatter={(value: number, name: string) => {
                  if (name === 'taxa') {
                    return [`${value}%`, 'Taxa de Conversão'];
                  }
                  return [value, name];
                }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="taxa" 
                name="Taxa de Conversão"
                stroke="#6366F1" 
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="aprovados" 
                name="Aprovados"
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981' }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="pendentes" 
                name="Pendentes"
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B' }}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="vencidos" 
                name="Vencidos"
                stroke="#EF4444" 
                strokeWidth={2}
                dot={{ fill: '#EF4444' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
