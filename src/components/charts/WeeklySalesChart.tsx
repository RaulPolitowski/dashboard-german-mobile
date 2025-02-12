import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../ui/card';
import { Clock, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { format, subDays, startOfWeek, endOfWeek } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

interface DateRange {
  start: Date;
  end: Date;
}

export const WeeklySalesChart = () => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [dateFilter, setDateFilter] = useState<'last7' | 'currentWeek'>('last7');
  
  const calculateAverageByWeekday = (start: Date, end: Date) => {
    const weekdayAverages = {
      'Segunda': { total: 0, count: 0 },
      'Terça': { total: 0, count: 0 },
      'Quarta': { total: 0, count: 0 },
      'Quinta': { total: 0, count: 0 },
      'Sexta': { total: 0, count: 0 },
      'Sábado': { total: 0, count: 0 },
      'Domingo': { total: 0, count: 0 }
    };

    data.forEach(day => {
      weekdayAverages[day.day].total += Object.values(day).reduce((acc: number, curr: any) => {
        if (typeof curr === 'object' && curr.value) {
          return acc + curr.value;
        }
        return acc;
      }, 0);
      weekdayAverages[day.day].count++;
    });

    return Object.entries(weekdayAverages).map(([day, values]) => ({
      day,
      average: values.count > 0 ? values.total / values.count : 0
    }));
  };

  const getCurrentWeekData = () => {
    const start = startOfWeek(new Date(), { locale: ptBR });
    const end = endOfWeek(new Date(), { locale: ptBR });
    return calculateAverageByWeekday(start, end);
  };

  const getLast7DaysData = () => {
    const start = subDays(new Date(), 7);
    const end = new Date();
    return calculateAverageByWeekday(start, end);
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
          <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo de horário</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as 'last7' | 'currentWeek')}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
          >
            <option value="last7">Últimos 7 dias</option>
            <option value="currentWeek">Semana atual</option>
          </select>
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
          >
            <option value="all">Todos os horários</option>
            {timeRanges.map((range) => (
              <option key={range.id} value={range.id}>{range.label}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <input
              type="date"
              value={format(customDateRange.start, 'yyyy-MM-dd')}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, start: new Date(e.target.value) }))}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
            />
            <input
              type="date"
              value={format(customDateRange.end, 'yyyy-MM-dd')}
              onChange={(e) => setCustomDateRange(prev => ({ ...prev, end: new Date(e.target.value) }))}
              className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
            />
          </div>
        </div>
      </div>

      {['last7', 'currentWeek'].includes(dateFilter) ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dateFilter === 'last7' ? getLast7DaysData() : getCurrentWeekData()}
              dataKey="average"
              nameKey="day"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={timeRanges[index % timeRanges.length].color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
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
            <Tooltip />
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
      )}
    </Card>
  );
};
