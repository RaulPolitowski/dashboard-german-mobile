
import { useState } from 'react';
import { subDays, startOfWeek, endOfWeek, format, isToday } from 'date-fns';
import { mockData } from '../constants';
import { DateRange } from '../types';

export const useSalesData = () => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDateRange, setCustomDateRange] = useState<DateRange>({
    start: subDays(new Date(), 6),
    end: new Date()
  });
  const [dateFilter, setDateFilter] = useState<'last7' | 'currentWeek'>('last7');

  const calculateDailySales = (dayData: any) => {
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

  return {
    selectedRange,
    setSelectedRange,
    customDateRange,
    setCustomDateRange,
    dateFilter,
    handleDateFilterChange,
    prepareChartData,
    prepareMobileData,
    getDayDate
  };
};
