
import { Card } from "../../../ui/card";
import { timeRanges } from "../constants";

interface MobileViewProps {
  data: any[];
  selectedRange: string;
  onCardClick: (dayName: string) => void;
}

export const MobileView = ({ data, selectedRange, onCardClick }: MobileViewProps) => {
  return (
    <div className="space-y-3 overflow-x-hidden">
      {data.map((day, index) => (
        <Card 
          key={index} 
          className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100/50 dark:from-indigo-900/20 dark:to-indigo-800/20 cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onCardClick(day.name)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm">{day.name}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Total do dia</p>
            </div>
            <div className="text-right">
              <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">
                R$ {day.total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-3 space-y-2 border-t pt-3">
            {day.bestSeller && (
              <div className="text-sm">
                <span className="text-emerald-600 font-medium">Melhor vendedor:</span>
                <p className="text-gray-700">
                  {day.bestSeller.seller} - R$ {day.bestSeller.total.toLocaleString()}
                </p>
              </div>
            )}
            {day.worstSeller && (
              <div className="text-sm">
                <span className="text-rose-600 font-medium">Menor desempenho:</span>
                <p className="text-gray-700">
                  {day.worstSeller.seller} - R$ {day.worstSeller.total.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {selectedRange === 'all' && (
            <div className="mt-3 grid grid-cols-2 gap-2 overflow-x-auto">
              {timeRanges.map(range => (
                <div 
                  key={range.id}
                  className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50"
                >
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{range.label}</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    R$ {(day[range.id]?.value || 0).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};
