
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { Clock, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const data = [
  { day: 'Segunda', '08:00': 1200, '12:00': 2800, '15:00': 2100, '18:00': 3200, '21:00': 1800 },
  { day: 'Terça', '08:00': 1500, '12:00': 2600, '15:00': 2000, '18:00': 3000, '21:00': 1600 },
  { day: 'Quarta', '08:00': 1300, '12:00': 2900, '15:00': 2200, '18:00': 3400, '21:00': 1700 },
  { day: 'Quinta', '08:00': 1400, '12:00': 2700, '15:00': 2300, '18:00': 3600, '21:00': 1900 },
  { day: 'Sexta', '08:00': 1600, '12:00': 3000, '15:00': 2500, '18:00': 3800, '21:00': 2200 },
  { day: 'Sábado', '08:00': 2000, '12:00': 3500, '15:00': 3000, '18:00': 4000, '21:00': 2500 },
  { day: 'Domingo', '08:00': 1000, '12:00': 2000, '15:00': 1800, '18:00': 2500, '21:00': 1300 },
];

const insights = [
  {
    icon: TrendingUp,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: 'Pico de Vendas',
    description: 'Maior movimento às 18h, especialmente aos sábados'
  },
  {
    icon: TrendingDown,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: 'Menor Movimento',
    description: 'Início da manhã aos domingos tem menor fluxo'
  },
  {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    title: 'Horário Nobre',
    description: 'Entre 17h e 19h concentra 35% das vendas diárias'
  },
  {
    icon: AlertCircle,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    title: 'Oportunidade',
    description: 'Potencial para promoções no período da tarde'
  }
];

export const WeeklySalesChart = () => {
  const [selectedHour, setSelectedHour] = useState('all');
  
  const hours = ['08:00', '12:00', '15:00', '18:00', '21:00'];
  
  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
          <p className="text-sm text-gray-500">Distribuição semanal de vendas por horário</p>
        </div>
        <select
          value={selectedHour}
          onChange={(e) => setSelectedHour(e.target.value)}
          className="mt-2 md:mt-0 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
        >
          <option value="all">Todos os horários</option>
          {hours.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
            <XAxis 
              dataKey="day" 
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
            {selectedHour === 'all' ? (
              hours.map((hour, index) => (
                <Bar
                  key={hour}
                  dataKey={hour}
                  fill={`hsl(${220 + (index * 30)}, 91%, 65%)`}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey={selectedHour}
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${insight.bgColor} border ${insight.borderColor}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${insight.bgColor}`}>
                <insight.icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-700">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
