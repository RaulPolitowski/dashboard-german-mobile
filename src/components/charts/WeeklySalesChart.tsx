
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/card';
import { subDays, startOfWeek, endOfWeek, format, isToday, parseISO } from 'date-fns';
import { FilterControls } from './weekly-sales/FilterControls';
import { timeRanges, mockData } from './weekly-sales/constants';
import { DateRange } from './weekly-sales/types';
import { useIsMobile } from '../../hooks/use-mobile';

interface WeeklySalesChartProps {
  onDayClick?: (date: string) => void;
}

interface DailySalesData {
  seller: string;
  total: number;
}

export const WeeklySalesChart = ({ onDayClick }: WeeklySalesChartProps) => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: subDays(new Date(), 6),
    end: new Date()
  });
  const [dateFilter, setDateFilter] = useState<'last7' | 'currentWeek'>('last7');
  const isMobile = useIsMobile();

  const calculateDailySales = (dayData: any): DailySalesData[] => {
    const sellerSales: { [key: string]: number } = {};
    Object.entries(dayData).forEach(([key, value]: [string, any]) => {
      if (typeof value === 'object' && value?.seller) {
        if (!sellerSales[value.seller]) {
          sellerSales[value.seller] = 0;
        }
        sellerSales[value.seller] += value.value || 0;
      }
    });

    return Object.entries(sellerSales).map(([seller, total]) => ({
      seller,
      total
    }));
  };

  const getBestAndWorstSeller = (dayData: any) => {
    const dailySales = calculateDailySales(dayData);
    if (dailySales.length === 0) return null;

    const sortedSales = [...dailySales].sort((a, b) => b.total - a.total);
    return {
      best: sortedSales[0],
      worst: sortedSales[sortedSales.length - 1]
    };
  };

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
      
      const performanceData = getBestAndWorstSeller(day);
      
      return {
        name: day.day + (isPreview ? ' (Prévia)' : ''),
        total: dailyTotal,
        date,
        bestSeller: performanceData?.best,
        worstSeller: performanceData?.worst
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);
  };

  const handleCardClick = (dayName: string) => {
    if (onDayClick) {
      const rawDayName = dayName.replace(' (Prévia)', '');
      const formattedDate = getDayDate(rawDayName);
      onDayClick(formattedDate);
    }
  };

  // Preparar dados para o gráfico
  const prepareChartData = () => {
    const today = new Date();
    return mockData.map(day => {
      const date = getDayDate(day.day);
      const isPreview = isToday(new Date(date));
      const performanceData = getBestAndWorstSeller(day);
      return {
        ...day,
        day: day.day + (isPreview ? ' (Prévia)' : ''),
        date,
        bestSeller: performanceData?.best,
        worstSeller: performanceData?.worst
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);
  };

  const chartData = prepareChartData();

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Horário</h3>
            <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo</p>
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
                  </div>
                </div>

                {/* Insights de Performance */}
                <div className="mt-3 space-y-2 border-t pt-3">
                  {day.bestSeller && (
                    <div className="text-sm">
                      <span className="text-emerald-600 font-medium">Melhor vendedor:</span>
                      <p className="text-gray-700">
                        {day.bestSeller.seller} - R$ {day.bestSeller.total.toLocaleString()}
                      </p>
                    </div>
                  )}
                  {day.worstSeller && (
                    <div className="text-sm">
                      <span className="text-rose-600 font-medium">Menor desempenho:</span>
                      <p className="text-gray-700">
                        {day.worstSeller.seller} - R$ {day.worstSeller.total.toLocaleString()}
                      </p>
                    </div>
                  )}
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
          <>
            <ResponsiveContainer width="100%" height={300}>
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
                <Tooltip 
                  labelFormatter={(value) => {
                    try {
                      const date = chartData.find(item => item.day === value)?.date;
                      return date ? format(parseISO(date), 'dd/MM/yyyy') : value;
                    } catch (error) {
                      console.error('Error formatting date:', error);
                      return value;
                    }
                  }}
                  formatter={(value) => `R$ ${value.toLocaleString()}`}
                />
                {selectedRange === 'all' ? (
                  timeRanges.map((range) => (
                    <Bar
                      key={range.id}
                      dataKey={`${range.id}.value`}
                      name={range.label}
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
            
            {/* Insights de Performance do Dia */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {chartData[0]?.bestSeller && (
                <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50">
                  <h4 className="font-medium text-emerald-700">Melhor Vendedor do Dia</h4>
                  <p className="text-emerald-600 mt-1">
                    {chartData[0].bestSeller.seller}
                  </p>
                  <p className="text-sm text-emerald-800 mt-1">
                    R$ {chartData[0].bestSeller.total.toLocaleString()}
                  </p>
                </div>
              )}
              {chartData[0]?.worstSeller && (
                <div className="p-4 rounded-lg border border-rose-200 bg-rose-50">
                  <h4 className="font-medium text-rose-700">Menor Desempenho do Dia</h4>
                  <p className="text-rose-600 mt-1">
                    {chartData[0].worstSeller.seller}
                  </p>
                  <p className="text-sm text-rose-800 mt-1">
                    R$ {chartData[0].worstSeller.total.toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Resumo por Horário */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {timeRanges.map((range) => (
                <div 
                  key={range.id}
                  className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
                >
                  <p className="text-sm text-gray-600">{range.label}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    R$ {(chartData[0]?.[range.id]?.value || 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Card>
  );
};
