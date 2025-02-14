
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface SalesDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  dayData: any;
}

export const SalesDetailsDialog = ({ isOpen, onClose, dayData }: SalesDetailsDialogProps) => {
  if (!dayData) return null;

  const timeRanges = [
    { time: '08:00-10:00', value: dayData['08:00-10:00']?.value || 0, quantity: 1200 },
    { time: '10:00-12:00', value: dayData['10:00-12:00']?.value || 0, quantity: 2800 },
    { time: '12:00-15:00', value: dayData['12:00-15:00']?.value || 0, quantity: 2100 },
    { time: '15:00-18:00', value: dayData['15:00-18:00']?.value || 0, quantity: 3200 },
    { time: '18:00-00:00', value: dayData['18:00-00:00']?.value || 0, quantity: 1800 },
  ];

  const totalValue = timeRanges.reduce((acc, curr) => acc + curr.value, 0);
  const totalQuantity = timeRanges.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] overflow-hidden bg-white dark:bg-gray-900 p-0">
        <div className="p-8 relative">
          {/* Close Button */}
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full h-8 w-8 border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <X className="h-4 w-4 text-gray-500" />
          </Button>

          {/* Title */}
          <DialogTitle className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-12">
            Detalhes de Vendas - {dayData.day}
          </DialogTitle>

          {/* Sales Table */}
          <div className="space-y-6">
            {/* Header */}
            <div className="grid grid-cols-3 gap-8 pb-4 text-base font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div>Horário</div>
              <div>Quantidade</div>
              <div className="text-right">Valor Total</div>
            </div>

            {/* Table Body */}
            <div className="space-y-6">
              {timeRanges.map((range, index) => (
                <div 
                  key={range.time}
                  className="grid grid-cols-3 gap-8 py-4 border-b border-gray-100 dark:border-gray-800 group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {range.time}
                  </div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">
                    {range.quantity.toLocaleString()}
                  </div>
                  <div className="text-lg font-semibold text-right text-primary dark:text-primary-light">
                    R$ {range.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <span className="text-base text-gray-500 dark:text-gray-400">Total</span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {totalQuantity.toLocaleString()}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary dark:text-primary-light">
                    R$ {totalValue.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
