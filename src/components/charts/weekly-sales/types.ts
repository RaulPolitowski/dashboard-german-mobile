
export interface TimeRange {
  id: string;
  label: string;
  color: string;
}

export interface DayData {
  day: string;
  [key: string]: any;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface WeeklyAverages {
  day: string;
  average: number;
}
