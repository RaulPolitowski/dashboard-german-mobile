
import { format } from 'date-fns';
import { timeRanges } from './constants';
import { DateRange } from './types';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Button } from '../../ui/button';
import { Calendar } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import { Calendar as CalendarComponent } from '../../ui/calendar';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={dateFilter} onValueChange={onDateFilterChange}>
        <SelectTrigger className="w-[160px] bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
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
        <SelectTrigger className="w-[160px] bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
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

      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-[160px] pl-3 text-left font-normal justify-start",
                isDarkMode 
                  ? "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {format(customDateRange.start, 'dd/MM/yyyy')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={customDateRange.start}
              onSelect={(date) => date && onCustomDateChange({ ...customDateRange, start: date })}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={cn(
                "w-[160px] pl-3 text-left font-normal justify-start",
                isDarkMode 
                  ? "bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100"
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {format(customDateRange.end, 'dd/MM/yyyy')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <CalendarComponent
              mode="single"
              selected={customDateRange.end}
              onSelect={(date) => date && onCustomDateChange({ ...customDateRange, end: date })}
              initialFocus
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
