
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  deadline: string;
}

interface ServiceOrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ServiceOrder[];
  title: string;
  type: "inProgress" | "delayed" | "completed";
}

const ITEMS_PER_PAGE = 5;

export const ServiceOrderDetailsDialog = ({
  isOpen,
  onClose,
  orders,
  title,
  type,
}: ServiceOrderDetailsDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ITEMS_PER_PAGE);

  const getPaginatedOrders = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const getStyles = () => {
    switch (type) {
      case "inProgress":
        return {
          bg: "bg-indigo-50 border-indigo-100",
          text: "text-indigo-600",
          textDark: "text-indigo-700",
        };
      case "delayed":
        return {
          bg: "bg-rose-50 border-rose-100",
          text: "text-rose-600",
          textDark: "text-rose-700",
        };
      case "completed":
        return {
          bg: "bg-emerald-50 border-emerald-100",
          text: "text-emerald-600",
          textDark: "text-emerald-700",
        };
    }
  };

  const styles = getStyles();
  const total = orders.reduce((sum, order) => sum + order.value, 0);
  const paginatedOrders = getPaginatedOrders();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className={`text-xl font-bold ${styles.text}`}>
              {title}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className={`p-4 ${styles.bg} rounded-lg border mb-4`}>
            <div className="flex justify-between items-center">
              <p className={`text-sm font-medium ${styles.text}`}>Total</p>
              <p className={`text-lg font-bold ${styles.textDark}`}>
                R$ {total.toLocaleString()}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {paginatedOrders.map((order) => (
                <div key={order.id} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        {order.client}
                      </h4>
                      <p className="text-sm text-gray-500">{order.description}</p>
                      <p className="text-xs text-gray-400">Técnico: {order.technician}</p>
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
              <span className="flex items-center px-4 text-sm text-gray-600">
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
