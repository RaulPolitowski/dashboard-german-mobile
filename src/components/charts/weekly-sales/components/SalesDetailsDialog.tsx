
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] overflow-hidden bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm border border-gray-100 dark:from-gray-900 dark:to-gray-800/80">
        <DialogHeader className="px-6 pt-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent font-bold">
              Detalhes de Vendas - {dayData.day}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 border border-emerald-100 dark:border-emerald-800/30">
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total de Vendas</p>
              <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                R$ {totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-100 dark:border-blue-800/30">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total de Itens</p>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                {totalQuantity.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">HORÁRIO</div>
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-300">QUANTIDADE</div>
              <div className="text-sm font-semibold text-right text-gray-600 dark:text-gray-300">VALOR TOTAL</div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {timeRanges.map((range, index) => (
                <div 
                  key={range.time}
                  className="grid grid-cols-3 gap-4 p-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="text-base font-medium text-gray-900 dark:text-gray-100">
                    {range.time}
                  </div>
                  <div className="text-base text-gray-600 dark:text-gray-300">
                    {range.quantity.toLocaleString()}
                  </div>
                  <div className="text-base font-semibold text-right text-primary-light dark:text-primary">
                    R$ {range.value.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
