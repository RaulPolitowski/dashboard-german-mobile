
import { startOfWeek, endOfWeek, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockData } from './constants';
import { WeeklyAverages } from './types';

export const calculateAverageByWeekday = (start: Date, end: Date): WeeklyAverages[] => {
  const weekdayAverages = {
    'Segunda': { total: 0, count: 0 },
    'Terça': { total: 0, count: 0 },
    'Quarta': { total: 0, count: 0 },
    'Quinta': { total: 0, count: 0 },
    'Sexta': { total: 0, count: 0 },
    'Sábado': { total: 0, count: 0 },
    'Domingo': { total: 0, count: 0 }
  };

  mockData.forEach(day => {
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

export const getCurrentWeekData = (): WeeklyAverages[] => {
  const start = startOfWeek(new Date(), { locale: ptBR });
  const end = endOfWeek(new Date(), { locale: ptBR });
  return calculateAverageByWeekday(start, end);
};

export const getLast7DaysData = (): WeeklyAverages[] => {
  const start = subDays(new Date(), 7);
  const end = new Date();
  return calculateAverageByWeekday(start, end);
};
