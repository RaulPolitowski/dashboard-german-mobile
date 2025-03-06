
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "../../ui/scroll-area";
import { useTheme } from "@/hooks/use-theme";

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

const ITEMS_PER_PAGE = 5;

export const SalesDialogs = ({ 
  showDailySales, 
  showMonthlySales, 
  onDailySalesClose, 
  onMonthlySalesClose, 
  todaysSales 
}: SalesDialogsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
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

  const getPaginatedData = (data: Sale[]) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const renderPagination = (totalItems: number) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return totalPages > 1 ? (
      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={isDarkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : ""}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className={`flex items-center px-4 text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={isDarkMode ? "border-gray-700 bg-gray-800 hover:bg-gray-700" : ""}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    ) : null;
  };

  const renderSalesDialog = (
    isOpen: boolean,
    onClose: () => void,
    title: string,
    sales: Sale[],
    total: number
  ) => {
    const paginatedSales = getPaginatedData(sales);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={`max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-0 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white'}`}>
          <div className="p-6 flex-1 overflow-hidden flex flex-col">
            <DialogHeader>
              <div className="flex items-center justify-between mb-6">
                <DialogTitle className={`text-xl font-bold ${isDarkMode ? 'text-purple-300' : 'text-blue-600'}`}>{title}</DialogTitle>
                <Button variant="ghost" size="icon" onClick={onClose} className={isDarkMode ? "hover:bg-gray-800" : ""}>
                  <X className={`h-5 w-5 ${isDarkMode ? "text-gray-400" : ""}`} />
                </Button>
              </div>
            </DialogHeader>

            <div className={`p-4 ${isDarkMode ? 'bg-purple-900/20 border-purple-800/30' : 'bg-blue-50 border-blue-100'} rounded-lg border mb-4`}>
              <div className="flex justify-between items-center">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-purple-300' : 'text-blue-600'}`}>Total</p>
                <p className={`text-lg font-bold ${isDarkMode ? 'text-purple-200' : 'text-blue-700'}`}>R$ {total.toLocaleString()}</p>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="space-y-3">
                {paginatedSales.map((sale) => (
                  <div key={sale.id} className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-100'} rounded-lg border ${isDarkMode ? 'glassmorphism' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`text-base font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                          {format(new Date(sale.datetime), "HH:mm")}
                        </h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{sale.paymentMethod}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Vendedor: {sale.seller}</p>
                      </div>
                      <span className={`text-lg font-bold ${isDarkMode ? 'text-purple-300' : 'text-blue-600'}`}>
                        R$ {sale.value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {renderPagination(sales.length)}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

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
