
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card } from '../ui/card';
import { subDays, startOfWeek, endOfWeek } from 'date-fns';
import { FilterControls } from './weekly-sales/FilterControls';
import { timeRanges, mockData } from './weekly-sales/constants';
import { DateRange } from './weekly-sales/types';
import { useIsMobile } from '../../hooks/use-mobile';

// Cores para o gráfico de pizza no mobile
const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

export const WeeklySalesChart = () => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [dateFilter, setDateFilter] = useState<'last7' | 'currentWeek'>('last7');
  const isMobile = useIsMobile();

  const handleDateFilterChange = (value: 'last7' | 'currentWeek') => {
    setDateFilter(value);
    if (value === 'currentWeek') {
      const now = new Date();
      setCustomDateRange({
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 })
      });
    } else {
      setCustomDateRange({
        start: subDays(new Date(), 6),
        end: new Date()
      });
    }
  };

  // Preparar dados para gráfico de pizza no mobile
  const prepareMobileData = () => {
    return mockData.map(day => {
      const dailyTotal = Object.values(day)
        .filter(value => typeof value === 'object' && value?.value)
        .reduce((sum, curr: any) => sum + curr.value, 0);
      
      return {
        name: day.day,
        value: dailyTotal
      };
    });
  };

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
          <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo de horário</p>
        </div>
        <FilterControls
          dateFilter={dateFilter}
          selectedRange={selectedRange}
          customDateRange={customDateRange}
          onDateFilterChange={handleDateFilterChange}
          onRangeChange={setSelectedRange}
          onCustomDateChange={setCustomDateRange}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        {isMobile ? (
          // Versão mobile: Gráfico de pizza
          <PieChart>
            <Pie
              data={prepareMobileData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, value }) => `${name}: R$ ${(value / 1000).toFixed(1)}k`}
            >
              {prepareMobileData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Valor']}
            />
            <Legend />
          </PieChart>
        ) : (
          // Versão desktop: Gráfico de barras
          <BarChart 
            data={mockData} 
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
        )}
      </ResponsiveContainer>
    </Card>
  );
};
