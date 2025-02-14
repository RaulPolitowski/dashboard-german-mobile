
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SalesDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dayData: any;
}

export const SalesDetailsDialog = ({ isOpen, onClose, dayData }: SalesDetailsDialogProps) => {
  if (!dayData) return null;
  const isMobile = useIsMobile();

  const timeRanges = [
    { time: '08:00-10:00', value: dayData['08:00-10:00']?.value || 0, quantity: 1200 },
    { time: '10:00-12:00', value: dayData['10:00-12:00']?.value || 0, quantity: 2800 },
    { time: '12:00-15:00', value: dayData['12:00-15:00']?.value || 0, quantity: 2100 },
    { time: '15:00-18:00', value: dayData['15:00-18:00']?.value || 0, quantity: 3200 },
    { time: '18:00-00:00', value: dayData['18:00-00:00']?.value || 0, quantity: 1800 },
  ];

  const totalValue = timeRanges.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMobile ? 'w-[calc(100%-32px)] p-0 max-h-[80vh] overflow-auto' : 'max-w-lg w-[calc(100%-2rem)]'} bg-white dark:bg-gray-900 rounded-2xl`}>
        <div className={`${isMobile ? 'p-4' : 'p-6'}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-indigo-600 dark:text-indigo-400`}>
              Vendas do Dia
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Total Card */}
          <div className="mb-6 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl">
            <div className="flex justify-between items-center">
              <span className={`${isMobile ? 'text-base' : 'text-lg'} font-medium text-indigo-600 dark:text-indigo-400`}>
                Total
              </span>
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-indigo-700 dark:text-indigo-300`}>
                R$ {totalValue.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Time Range Cards */}
          <div className="space-y-3">
            {timeRanges.map((range) => (
              <div
                key={range.time}
                className={`${isMobile ? 'p-3' : 'p-4'} bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold text-gray-900 dark:text-gray-100`}>
                        {range.time}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {range.quantity.toLocaleString()} itens
                      </p>
                    </div>
                    <span className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold text-indigo-600 dark:text-indigo-400`}>
                      R$ {range.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
