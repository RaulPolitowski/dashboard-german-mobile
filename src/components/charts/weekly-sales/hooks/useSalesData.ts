
import { useState } from 'react';
import { subDays, startOfWeek, endOfWeek, format, isToday } from 'date-fns';
import { mockData } from '../constants';
import { DateRange } from '../types';

const generateTimeRangeValue = () => {
  const sellers = ['Pedro Oliveira', 'Maria Santos', 'João Silva', 'Ana Costa'];
  return {
    seller: sellers[Math.floor(Math.random() * sellers.length)],
    value: Math.floor(Math.random() * 5000) + 1000
  };
};

const generateDayData = (day: string) => {
  return {
    day,
    '08:00-10:00': generateTimeRangeValue(),
    '10:00-12:00': generateTimeRangeValue(),
    '12:00-15:00': generateTimeRangeValue(),
    '15:00-18:00': generateTimeRangeValue(),
    '18:00-00:00': generateTimeRangeValue(),
  };
};

const generateMockData = () => {
  const weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
  return weekDays.map(day => generateDayData(day));
};

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

  const calculateDayTotal = (dayData: any) => {
    const timeRangeKeys = ['08:00-10:00', '10:00-12:00', '12:00-15:00', '15:00-18:00', '18:00-00:00'];
    return timeRangeKeys.reduce((total, timeRange) => {
      return total + (dayData[timeRange]?.value || 0);
    }, 0);
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
    const generatedData = generateMockData();
    const today = new Date();
    return generatedData.map(day => {
      const date = getDayDate(day.day);
      const isPreview = isToday(new Date(date));
      const performanceData = getBestAndWorstSeller(day);
      const dayTotal = calculateDayTotal(day);
      return {
        ...day,
        day: day.day + (isPreview ? ' (Prévia)' : ''),
        date,
        total: dayTotal,
        bestSeller: performanceData?.best,
        worstSeller: performanceData?.worst
      };
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 7);
  };

  const prepareMobileData = () => {
    const generatedData = generateMockData();
    const today = new Date();
    return generatedData.map(day => {
      const date = getDayDate(day.day);
      const isPreview = isToday(new Date(date));
      const dayTotal = calculateDayTotal(day);
      const performanceData = getBestAndWorstSeller(day);
      
      return {
        name: day.day + (isPreview ? ' (Prévia)' : ''),
        total: dayTotal,
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
