
export interface Transaction {
  id: string;
  date: string;
  description: string;
  value: number;
  type: 'inflow' | 'outflow';
}

export type DateFilter = 'today' | 'yesterday' | 'last7days' | 'currentMonth' | 'lastMonth';
