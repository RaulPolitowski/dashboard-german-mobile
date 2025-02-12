
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { subDays, startOfWeek, endOfWeek } from 'date-fns';
import { FilterControls } from './weekly-sales/FilterControls';
import { timeRanges, mockData } from './weekly-sales/constants';
import { DateRange } from './weekly-sales/types';
import { useIsMobile } from '../../hooks/use-mobile';

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
        start: startOfWeek(now, { weekStartsOn: 1 }), // Segunda-feira
        end: endOfWeek(now, { weekStartsOn: 1 }) // Domingo
      });
    } else {
      setCustomDateRange({
        start: subDays(new Date(), 6),
        end: new Date()
      });
    }
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

      <ResponsiveContainer width="100%" height={isMobile ? 400 : 300}>
        <BarChart 
          data={mockData} 
          margin={isMobile ? { top: 20, right: 10, left: 10, bottom: 100 } : { top: 20, right: 30, left: 20, bottom: 5 }}
          layout={isMobile ? "vertical" : "horizontal"}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
          <XAxis 
            dataKey="day" 
            type={isMobile ? "number" : "category"}
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            interval={0}
            angle={isMobile ? -65 : 0}
            textAnchor={isMobile ? "end" : "middle"}
            height={isMobile ? 120 : 30}
            tickMargin={isMobile ? 25 : 5}
          />
          <YAxis 
            tick={{ fill: '#6b7280' }}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `R$ ${(value / 1000)}k`}
            width={isMobile ? 60 : 40}
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
    </Card>
  );
};
