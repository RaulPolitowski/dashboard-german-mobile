
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Order } from "../../types/order-metrics";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  orders: Order[];
  type: "created" | "approved" | "pending" | "cancelled";
}

const ITEMS_PER_PAGE = 5;

export const OrderDetailsDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  orders, 
  type 
}: OrderDetailsDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getTypeStyles = (type: "created" | "approved" | "pending" | "cancelled") => {
    const styles = {
      created: {
        text: "text-indigo-600 dark:text-indigo-400",
        bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800",
      },
      approved: {
        text: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
      },
      pending: {
        text: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800",
      },
      cancelled: {
        text: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800",
      },
    };
    return styles[type];
  };

  const styles = getTypeStyles(type);
  const total = orders.reduce((sum, order) => sum + order.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className={`text-xl font-bold ${styles.text}`}>
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

          <div className={`mb-4 p-4 rounded-lg border ${styles.bg}`}>
            <div className="flex justify-between items-center">
              <p className={`text-sm font-medium ${styles.text}`}>Total</p>
              <p className={`text-lg font-bold ${styles.text}`}>
                R$ {total.toLocaleString()}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {getPaginatedOrders().map((order) => (
                <div 
                  key={order.id} 
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {order.client}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {order.description}
                      </p>
                      {order.seller && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Vendedor: {order.seller}
                        </p>
                      )}
                    </div>
                    <span className={`text-lg font-bold ${styles.text}`}>
                      R$ {order.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4 py-2 border-t">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="flex items-center px-4 text-sm text-gray-600 dark:text-gray-400">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
