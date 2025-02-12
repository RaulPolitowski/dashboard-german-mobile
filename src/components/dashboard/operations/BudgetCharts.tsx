
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card } from '../../ui/card';

const mockData = [
  { month: 'Jan', aprovados: 45, pendentes: 15, recusados: 8 },
  { month: 'Fev', aprovados: 50, pendentes: 12, recusados: 10 },
  { month: 'Mar', aprovados: 48, pendentes: 18, recusados: 7 },
  { month: 'Abr', aprovados: 52, pendentes: 14, recusados: 9 },
  { month: 'Mai', aprovados: 55, pendentes: 16, recusados: 11 },
  { month: 'Jun', aprovados: 58, pendentes: 13, recusados: 8 },
];

const conversionData = [
  { month: 'Jan', taxa: 65 },
  { month: 'Fev', taxa: 68 },
  { month: 'Mar', taxa: 62 },
  { month: 'Abr', taxa: 70 },
  { month: 'Mai', taxa: 72 },
  { month: 'Jun', taxa: 75 },
];

export const BudgetCharts = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Evolução de Orçamentos</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="aprovados" name="Aprovados" fill="#10B981" />
              <Bar dataKey="pendentes" name="Pendentes" fill="#F59E0B" />
              <Bar dataKey="recusados" name="Recusados" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Taxa de Conversão</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis dataKey="month" />
              <YAxis unit="%" />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Taxa de Conversão']}
              />
              <Line 
                type="monotone" 
                dataKey="taxa" 
                stroke="#6366F1" 
                strokeWidth={2}
                dot={{ fill: '#6366F1' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
