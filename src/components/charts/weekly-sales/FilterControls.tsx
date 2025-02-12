
import { format } from 'date-fns';
import { timeRanges } from './constants';
import { DateRange } from './types';

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
      <select
        value={dateFilter}
        onChange={(e) => onDateFilterChange(e.target.value as 'last7' | 'currentWeek')}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
      >
        <option value="last7">Últimos 7 dias</option>
        <option value="currentWeek">Semana atual</option>
      </select>
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
      >
        <option value="all">Todos os horários</option>
        {timeRanges.map((range) => (
          <option key={range.id} value={range.id}>{range.label}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="date"
          value={format(customDateRange.start, 'yyyy-MM-dd')}
          onChange={(e) => onCustomDateChange({ ...customDateRange, start: new Date(e.target.value) })}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
        />
        <input
          type="date"
          value={format(customDateRange.end, 'yyyy-MM-dd')}
          onChange={(e) => onCustomDateChange({ ...customDateRange, end: new Date(e.target.value) })}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
        />
      </div>
    </div>
  );
};
