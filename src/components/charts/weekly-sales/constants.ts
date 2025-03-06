
import { TimeRange } from './types';

export const timeRanges: TimeRange[] = [
  { id: '08:00-10:00', label: '08:00 às 10:00', color: 'hsl(220, 91%, 65%)' },
  { id: '10:00-12:00', label: '10:00 às 12:00', color: 'hsl(250, 91%, 65%)' },
  { id: '12:00-15:00', label: '12:00 às 15:00', color: 'hsl(280, 91%, 65%)' },
  { id: '15:00-18:00', label: '15:00 às 18:00', color: 'hsl(310, 91%, 65%)' },
  { id: '18:00-00:00', label: '18:00 às 00:00', color: 'hsl(340, 91%, 65%)' },
];

export const mockData = [
  { 
    day: 'Segunda', 
    '08:00-10:00': { value: 1200, transactions: 15, seller: 'João Silva' },
    '10:00-12:00': { value: 2800, transactions: 32, seller: 'Maria Santos' },
    '12:00-15:00': { value: 2100, transactions: 25, seller: 'João Silva' },
    '15:00-18:00': { value: 3200, transactions: 38, seller: 'Pedro Oliveira' },
    '18:00-00:00': { value: 1800, transactions: 20, seller: 'Maria Santos' }
  },
  { 
    day: 'Terça', 
    '08:00-10:00': { value: 1500, transactions: 18, seller: 'Pedro Oliveira' },
    '10:00-12:00': { value: 2600, transactions: 30, seller: 'João Silva' },
    '12:00-15:00': { value: 2000, transactions: 24, seller: 'Maria Santos' },
    '15:00-18:00': { value: 3000, transactions: 35, seller: 'João Silva' },
    '18:00-00:00': { value: 1600, transactions: 19, seller: 'Pedro Oliveira' }
  },
  { 
    day: 'Quarta', 
    '08:00-10:00': { value: 1300, transactions: 16, seller: 'Maria Santos' },
    '10:00-12:00': { value: 2900, transactions: 33, seller: 'Pedro Oliveira' },
    '12:00-15:00': { value: 2200, transactions: 26, seller: 'João Silva' },
    '15:00-18:00': { value: 3400, transactions: 40, seller: 'Maria Santos' },
    '18:00-00:00': { value: 1700, transactions: 20, seller: 'João Silva' }
  },
  { 
    day: 'Quinta', 
    '08:00-10:00': { value: 1400, transactions: 17, seller: 'Pedro Oliveira' },
    '10:00-12:00': { value: 2700, transactions: 31, seller: 'Maria Santos' },
    '12:00-15:00': { value: 2300, transactions: 27, seller: 'Pedro Oliveira' },
    '15:00-18:00': { value: 3600, transactions: 42, seller: 'João Silva' },
    '18:00-00:00': { value: 1900, transactions: 22, seller: 'Maria Santos' }
  },
  { 
    day: 'Sexta', 
    '08:00-10:00': { value: 1600, transactions: 19, seller: 'João Silva' },
    '10:00-12:00': { value: 3000, transactions: 35, seller: 'Pedro Oliveira' },
    '12:00-15:00': { value: 2500, transactions: 29, seller: 'Maria Santos' },
    '15:00-18:00': { value: 3800, transactions: 45, seller: 'Pedro Oliveira' },
    '18:00-00:00': { value: 2200, transactions: 26, seller: 'João Silva' }
  },
  { 
    day: 'Sábado', 
    '08:00-10:00': { value: 2000, transactions: 24, seller: 'Maria Santos' },
    '10:00-12:00': { value: 3500, transactions: 41, seller: 'João Silva' },
    '12:00-15:00': { value: 3000, transactions: 35, seller: 'Pedro Oliveira' },
    '15:00-18:00': { value: 4000, transactions: 47, seller: 'Maria Santos' },
    '18:00-00:00': { value: 2500, transactions: 29, seller: 'João Silva' }
  },
  { 
    day: 'Domingo', 
    '08:00-10:00': { value: 1000, transactions: 12, seller: 'Pedro Oliveira' },
    '10:00-12:00': { value: 2000, transactions: 24, seller: 'Maria Santos' },
    '12:00-15:00': { value: 1800, transactions: 21, seller: 'João Silva' },
    '15:00-18:00': { value: 2500, transactions: 29, seller: 'Pedro Oliveira' },
    '18:00-00:00': { value: 1300, transactions: 15, seller: 'Maria Santos' }
  },
];
