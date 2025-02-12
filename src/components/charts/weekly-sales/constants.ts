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
    '08:00-10:00': { value: 1200, transactions: 15 },
    '10:00-12:00': { value: 2800, transactions: 32 },
    '12:00-15:00': { value: 2100, transactions: 25 },
    '15:00-18:00': { value: 3200, transactions: 38 },
    '18:00-00:00': { value: 1800, transactions: 20 }
  },
  { 
    day: 'Terça', 
    '08:00-10:00': { value: 1500, transactions: 18 },
    '10:00-12:00': { value: 2600, transactions: 30 },
    '12:00-15:00': { value: 2000, transactions: 24 },
    '15:00-18:00': { value: 3000, transactions: 35 },
    '18:00-00:00': { value: 1600, transactions: 19 }
  },
  { 
    day: 'Quarta', 
    '08:00-10:00': { value: 1300, transactions: 16 },
    '10:00-12:00': { value: 2900, transactions: 33 },
    '12:00-15:00': { value: 2200, transactions: 26 },
    '15:00-18:00': { value: 3400, transactions: 40 },
    '18:00-00:00': { value: 1700, transactions: 20 }
  },
  { 
    day: 'Quinta', 
    '08:00-10:00': { value: 1400, transactions: 17 },
    '10:00-12:00': { value: 2700, transactions: 31 },
    '12:00-15:00': { value: 2300, transactions: 27 },
    '15:00-18:00': { value: 3600, transactions: 42 },
    '18:00-00:00': { value: 1900, transactions: 22 }
  },
  { 
    day: 'Sexta', 
    '08:00-10:00': { value: 1600, transactions: 19 },
    '10:00-12:00': { value: 3000, transactions: 35 },
    '12:00-15:00': { value: 2500, transactions: 29 },
    '15:00-18:00': { value: 3800, transactions: 45 },
    '18:00-00:00': { value: 2200, transactions: 26 }
  },
  { 
    day: 'Sábado', 
    '08:00-10:00': { value: 2000, transactions: 24 },
    '10:00-12:00': { value: 3500, transactions: 41 },
    '12:00-15:00': { value: 3000, transactions: 35 },
    '15:00-18:00': { value: 4000, transactions: 47 },
    '18:00-00:00': { value: 2500, transactions: 29 }
  },
  { 
    day: 'Domingo', 
    '08:00-10:00': { value: 1000, transactions: 12 },
    '10:00-12:00': { value: 2000, transactions: 24 },
    '12:00-15:00': { value: 1800, transactions: 21 },
    '15:00-18:00': { value: 2500, transactions: 29 },
    '18:00-00:00': { value: 1300, transactions: 15 }
  },
];
