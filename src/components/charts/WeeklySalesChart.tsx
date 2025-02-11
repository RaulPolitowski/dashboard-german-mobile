
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { Clock, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const timeRanges = [
  { id: '08:00-10:00', label: '08:00 às 10:00', color: 'hsl(220, 91%, 65%)' },
  { id: '10:00-12:00', label: '10:00 às 12:00', color: 'hsl(250, 91%, 65%)' },
  { id: '12:00-15:00', label: '12:00 às 15:00', color: 'hsl(280, 91%, 65%)' },
  { id: '15:00-18:00', label: '15:00 às 18:00', color: 'hsl(310, 91%, 65%)' },
  { id: '18:00-00:00', label: '18:00 às 00:00', color: 'hsl(340, 91%, 65%)' },
];

const data = [
  { 
    day: 'Segunda', 
    '08:00-10:00': { value: 1200, transactions: 15 },
    '10:00-12:00': { value: 2800, transactions: 32 },
    '12:00-15:00': { value: 2100, transactions: 25 },
    '15:00-18:00': { value: 3200, transactions: 38 },
    '18:00-00:00': { value: 1800, transactions: 20 }
  },
  { 
    day: 'Terça', 
    '08:00-10:00': { value: 1500, transactions: 18 },
    '10:00-12:00': { value: 2600, transactions: 30 },
    '12:00-15:00': { value: 2000, transactions: 24 },
    '15:00-18:00': { value: 3000, transactions: 35 },
    '18:00-00:00': { value: 1600, transactions: 19 }
  },
  { 
    day: 'Quarta', 
    '08:00-10:00': { value: 1300, transactions: 16 },
    '10:00-12:00': { value: 2900, transactions: 33 },
    '12:00-15:00': { value: 2200, transactions: 26 },
    '15:00-18:00': { value: 3400, transactions: 40 },
    '18:00-00:00': { value: 1700, transactions: 20 }
  },
  { 
    day: 'Quinta', 
    '08:00-10:00': { value: 1400, transactions: 17 },
    '10:00-12:00': { value: 2700, transactions: 31 },
    '12:00-15:00': { value: 2300, transactions: 27 },
    '15:00-18:00': { value: 3600, transactions: 42 },
    '18:00-00:00': { value: 1900, transactions: 22 }
  },
  { 
    day: 'Sexta', 
    '08:00-10:00': { value: 1600, transactions: 19 },
    '10:00-12:00': { value: 3000, transactions: 35 },
    '12:00-15:00': { value: 2500, transactions: 29 },
    '15:00-18:00': { value: 3800, transactions: 45 },
    '18:00-00:00': { value: 2200, transactions: 26 }
  },
  { 
    day: 'Sábado', 
    '08:00-10:00': { value: 2000, transactions: 24 },
    '10:00-12:00': { value: 3500, transactions: 41 },
    '12:00-15:00': { value: 3000, transactions: 35 },
    '15:00-18:00': { value: 4000, transactions: 47 },
    '18:00-00:00': { value: 2500, transactions: 29 }
  },
  { 
    day: 'Domingo', 
    '08:00-10:00': { value: 1000, transactions: 12 },
    '10:00-12:00': { value: 2000, transactions: 24 },
    '12:00-15:00': { value: 1800, transactions: 21 },
    '15:00-18:00': { value: 2500, transactions: 29 },
    '18:00-00:00': { value: 1300, transactions: 15 }
  },
];

const insights = [
  {
    icon: TrendingUp,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    title: 'Pico de Vendas',
    description: 'Das 15h às 18h concentra maior volume, especialmente sexta e sábado'
  },
  {
    icon: TrendingDown,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    title: 'Menor Movimento',
    description: 'Início da manhã aos domingos apresenta menor fluxo'
  },
  {
    icon: Clock,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    title: 'Horário Nobre',
    description: 'Entre 15h e 18h tem o maior ticket médio de vendas'
  },
  {
    icon: AlertCircle,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
    title: 'Oportunidade',
    description: 'Potencial para promoções das 10h às 12h para aumentar fluxo'
  }
];

export const WeeklySalesChart = () => {
  const [selectedRange, setSelectedRange] = useState('all');
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700 mb-2">{label}</p>
          {selectedRange === 'all' ? (
            <div className="space-y-3">
              {timeRanges.map((range) => {
                const rangeData = data[range.id];
                return (
                  <div key={range.id} className="border-b border-gray-100 pb-2 last:border-0">
                    <p className="text-sm font-medium text-gray-600">{range.label}</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <p className="text-sm text-gray-600">
                        Valor: <span className="font-medium text-[#6366F1]">R$ {rangeData.value.toLocaleString()}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Vendas: <span className="font-medium text-[#6366F1]">{rangeData.transactions}</span>
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      Ticket Médio: <span className="font-medium text-[#6366F1]">
                        R$ {Math.round(rangeData.value / rangeData.transactions).toLocaleString()}
                      </span>
                    </p>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700">Total do Dia</p>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  <p className="text-sm text-gray-600">
                    Valor: <span className="font-medium text-emerald-600">
                      R$ {Object.values(timeRanges.reduce((acc, range) => ({
                        ...acc,
                        value: acc.value + data[range.id].value,
                        transactions: acc.transactions + data[range.id].transactions
                      }), { value: 0, transactions: 0 })).value.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Vendas: <span className="font-medium text-emerald-600">
                      {Object.values(timeRanges.reduce((acc, range) => ({
                        ...acc,
                        value: acc.value + data[range.id].value,
                        transactions: acc.transactions + data[range.id].transactions
                      }), { value: 0, transactions: 0 })).transactions}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Valor Total: <span className="font-medium text-[#6366F1]">
                    R$ {data[selectedRange].value.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Vendas: <span className="font-medium text-[#6366F1]">
                    {data[selectedRange].transactions}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  Ticket Médio: <span className="font-medium text-[#6366F1]">
                    R$ {Math.round(data[selectedRange].value / data[selectedRange].transactions).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
          <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo de horário</p>
        </div>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="mt-2 md:mt-0 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
        >
          <option value="all">Todos os horários</option>
          {timeRanges.map((range) => (
            <option key={range.id} value={range.id}>{range.label}</option>
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
            <Tooltip content={<CustomTooltip />} />
            {selectedRange === 'all' ? (
              timeRanges.map((range) => (
                <Bar
                  key={range.id}
                  dataKey={`${range.id}.value`}
                  name={range.id}
                  fill={range.color}
                  radius={[4, 4, 0, 0]}
                />
              ))
            ) : (
              <Bar
                dataKey={`${selectedRange}.value`}
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
