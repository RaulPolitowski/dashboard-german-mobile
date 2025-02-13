
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { subDays, startOfWeek, endOfWeek, format, isToday } from 'date-fns';
import { FilterControls } from './weekly-sales/FilterControls';
import { timeRanges, mockData } from './weekly-sales/constants';
import { DateRange } from './weekly-sales/types';
import { useIsMobile } from '../../hooks/use-mobile';

interface WeeklySalesChartProps {
  onDayClick?: (date: string) => void;
}

export const WeeklySalesChart = ({ onDayClick }: WeeklySalesChartProps) => {
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

  const getDayDate = (dayName: string) => {
    const today = new Date();
    const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const currentDayIndex = today.getDay();
    const targetDayIndex = weekDays.findIndex(day => day === dayName);
    const diff = targetDayIndex - currentDayIndex;
    
    // Se o dia alvo está à frente do dia atual, subtrai 7 dias para pegar o dia da semana anterior
    const adjustedDiff = diff > 0 ? diff - 7 : diff;
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + adjustedDiff);
    return format(targetDate, 'yyyy-MM-dd');
  };

  // Preparar dados para visualização móvel
  const prepareMobileData = () => {
    const today = new Date();
    return mockData.map(day => {
      const date = getDayDate(day.day);
      const isPreview = isToday(new Date(date));
      
      const dailyTotal = Object.values(day)
        .filter(value => typeof value === 'object' && value?.value)
        .reduce((sum, curr: any) => sum + curr.value, 0);
      
      return {
        name: day.day + (isPreview ? ' (Prévia)' : ''),
        total: dailyTotal,
        date
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7); // Pega apenas os últimos 7 dias
  };

  const handleCardClick = (dayName: string) => {
    if (onDayClick) {
      const rawDayName = dayName.replace(' (Prévia)', '');
      const formattedDate = getDayDate(rawDayName);
      console.log("Clicou no dia:", rawDayName, "Data formatada:", formattedDate);
      onDayClick(formattedDate);
    }
  };

  // Preparar dados para o gráfico
  const prepareChartData = () => {
    const today = new Date();
    return mockData.map(day => {
      const date = getDayDate(day.day);
      const isPreview = isToday(new Date(date));
      return {
        ...day,
        day: day.day + (isPreview ? ' (Prévia)' : ''),
        date
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7); // Pega apenas os últimos 7 dias
  };

  const chartData = prepareChartData();

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
          <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo de horário</p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <FilterControls
            dateFilter={dateFilter}
            selectedRange={selectedRange}
            customDateRange={customDateRange}
            onDateFilterChange={handleDateFilterChange}
            onRangeChange={setSelectedRange}
            onCustomDateChange={setCustomDateRange}
          />
        </div>
      </div>

      {isMobile ? (
        <div className="space-y-3 overflow-x-hidden">
          {prepareMobileData().map((day, index) => (
            <Card 
              key={index} 
              className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/20 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCardClick(day.name)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">{day.name}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total do dia</p>
                </div>
                <div className="text-right">
                  <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                    R$ {day.total.toLocaleString()}
                  </p>
                  {selectedRange !== 'all' && timeRanges.find(range => range.id === selectedRange) && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {timeRanges.find(range => range.id === selectedRange)?.label}
                    </p>
                  )}
                </div>
              </div>
              {selectedRange === 'all' && (
                <div className="mt-3 grid grid-cols-2 gap-2 overflow-x-auto">
                  {timeRanges.map(range => {
                    const value = mockData.find(d => d.day === day.name.replace(' (Prévia)', ''))?.[range.id]?.value || 0;
                    return (
                      <div 
                        key={range.id}
                        className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50"
                      >
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{range.label}</p>
                        <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                          R$ {value.toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart 
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            onClick={(data) => {
              if (data && data.activePayload) {
                handleCardClick(data.activePayload[0].payload.day);
              }
            }}
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
                  cursor="pointer"
                />
              ))
            ) : (
              <Bar
                dataKey={`${selectedRange}.value`}
                fill="#6366F1"
                radius={[4, 4, 0, 0]}
                cursor="pointer"
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};
