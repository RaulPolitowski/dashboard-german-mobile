
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
    const timeRangeKeys = ['08:00-10:00', '10:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-00:00'];
    
    timeRangeKeys.forEach(timeRange => {
      const data = dayData[timeRange];
      if (data?.seller && data?.value) {
        if (!sellerSales[data.seller]) {
          sellerSales[data.seller] = 0;
        }
        sellerSales[data.seller] += data.value;
      }
    });

    return Object.entries(sellerSales).map(([seller, total]) => ({
      seller,
      total
    }));
  };

  const calculateOverallPerformance = (data: any[]) => {
    const sellerTotals: { [key: string]: number } = {};
    let periodTotal = 0;

    data.forEach(day => {
      const dailySales = calculateDailySales(day);
      dailySales.forEach(({ seller, total }) => {
        if (!sellerTotals[seller]) {
          sellerTotals[seller] = 0;
        }
        sellerTotals[seller] += total;
        periodTotal += total;
      });
    });

    const sortedSellers = Object.entries(sellerTotals)
      .map(([seller, total]) => ({ seller, total }))
      .sort((a, b) => b.total - a.total);

    return {
      bestSellerOverall: sortedSellers[0],
      worstSellerOverall: sortedSellers[sortedSellers.length - 1],
      totalPeriod: periodTotal
    };
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
      const dailyTotal = Object.entries(day)
        .filter(([key]) => key !== 'day')
        .reduce((sum, [_, timeRange]: [string, any]) => {
          return sum + (timeRange?.value || 0);
        }, 0);
      
      const performanceData = getBestAndWorstSeller(day);
      
      return {
        name: day.day + (isPreview ? ' (Prévia)' : ''),
        total: dailyTotal,
        date,
        bestSeller: performanceData?.best,
        worstSeller: performanceData?.worst,
        ...day
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
    calculateOverallPerformance,
    getDayDate
  };
};
