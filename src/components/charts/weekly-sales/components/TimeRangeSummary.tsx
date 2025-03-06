import { timeRanges } from "../constants";

interface TimeRangeSummaryProps {
  data: any;
}

export const TimeRangeSummary = ({ data }: TimeRangeSummaryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
      {timeRanges.map((range) => (
        <div 
          key={range.id}
          className="p-4 rounded-lg bg-gradient-to-br from-indigo-50/10 to-indigo-100/10 dark:from-indigo-950/50 dark:to-indigo-900/50 border border-indigo-200/20 dark:border-indigo-500/20 hover:shadow-md transition-all"
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">{range.label}</p>
          <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
            R$ {(data?.[range.id]?.value || 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
