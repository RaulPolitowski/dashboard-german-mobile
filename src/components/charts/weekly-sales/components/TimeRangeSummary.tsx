
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
          className="p-4 rounded-lg bg-white border border-gray-200 shadow-sm"
        >
          <p className="text-sm text-gray-600">{range.label}</p>
          <p className="text-lg font-semibold text-gray-900 mt-1">
            R$ {(data?.[range.id]?.value || 0).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};
