
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../ui/card';
import { subDays } from 'date-fns';
import { FilterControls } from './weekly-sales/FilterControls';
import { timeRanges, mockData } from './weekly-sales/constants';
import { getCurrentWeekData, getLast7DaysData } from './weekly-sales/utils';
import { DateRange } from './weekly-sales/types';

export const WeeklySalesChart = () => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: subDays(new Date(), 7),
    end: new Date()
  });
  const [dateFilter, setDateFilter] = useState<'last7' | 'currentWeek'>('last7');

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
          onDateFilterChange={setDateFilter}
          onRangeChange={setSelectedRange}
          onCustomDateChange={setCustomDateRange}
        />
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
              {mockData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={timeRanges[index % timeRanges.length].color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
