
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { X } from "lucide-react";

interface Sale {
  id: number;
  datetime: string;
  value: number;
  paymentMethod: string;
  seller: string;
}

interface SalesDialogsProps {
  showDailySales: boolean;
  showMonthlySales: boolean;
  onDailySalesClose: () => void;
  onMonthlySalesClose: () => void;
  todaysSales: Sale[];
}

export const SalesDialogs = ({ 
  showDailySales, 
  showMonthlySales, 
  onDailySalesClose, 
  onMonthlySalesClose, 
  todaysSales 
}: SalesDialogsProps) => {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  const monthSales = [
    ...todaysSales,
    { 
      id: 4, 
      datetime: "2024-02-19T14:30:00", 
      value: 750.00, 
      paymentMethod: "Cartão de Crédito",
      seller: "Ana Paula"
    },
    { 
      id: 5, 
      datetime: "2024-02-18T16:45:00", 
      value: 1200.00, 
      paymentMethod: "PIX",
      seller: "Pedro Santos"
    }
  ];

  const renderSalesDialog = (
    isOpen: boolean,
    onClose: () => void,
    title: string,
    sales: Sale[],
    total: number
  ) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <DialogTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {title}
            </DialogTitle>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                R$ {total.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {sales.map((sale) => (
              <div 
                key={sale.id} 
                className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {format(new Date(sale.datetime), "dd/MM/yyyy HH:mm")}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {sale.paymentMethod}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Vendedor: {sale.seller}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    R$ {sale.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <>
      {renderSalesDialog(
        showDailySales,
        onDailySalesClose,
        "Vendas do Dia",
        todaysSales,
        todaysSales.reduce((sum, sale) => sum + sale.value, 0)
      )}
      {renderSalesDialog(
        showMonthlySales,
        onMonthlySalesClose,
        `Vendas de ${currentMonth}`,
        monthSales,
        monthSales.reduce((sum, sale) => sum + sale.value, 0)
      )}
    </>
  );
};
