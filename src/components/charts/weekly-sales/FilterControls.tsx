
import { format } from 'date-fns';
import { timeRanges } from './constants';
import { DateRange } from './types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Calendar } from 'lucide-react';

interface FilterControlsProps {
  dateFilter: 'last7' | 'currentWeek';
  selectedRange: string;
  customDateRange: DateRange;
  onDateFilterChange: (value: 'last7' | 'currentWeek') => void;
  onRangeChange: (value: string) => void;
  onCustomDateChange: (range: DateRange) => void;
}

export const FilterControls = ({
  dateFilter,
  selectedRange,
  customDateRange,
  onDateFilterChange,
  onRangeChange,
  onCustomDateChange
}: FilterControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="last7">Últimos 7 dias</SelectItem>
            <SelectItem value="currentWeek">Semana atual</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={selectedRange} onValueChange={onRangeChange}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Horário" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Todos os horários</SelectItem>
            {timeRanges.map((range) => (
              <SelectItem key={range.id} value={range.id}>{range.label}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-col md:flex-row gap-2">
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="date"
            value={format(customDateRange.start, 'yyyy-MM-dd')}
            onChange={(e) => onCustomDateChange({ ...customDateRange, start: new Date(e.target.value) })}
            className="pl-10 pr-3 py-2 w-full md:w-[150px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <input
            type="date"
            value={format(customDateRange.end, 'yyyy-MM-dd')}
            onChange={(e) => onCustomDateChange({ ...customDateRange, end: new Date(e.target.value) })}
            className="pl-10 pr-3 py-2 w-full md:w-[150px] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
      </div>
    </div>
  );
};
