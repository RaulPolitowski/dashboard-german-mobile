
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-0">
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-2xl font-bold text-[#9b87f5]">
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

          <div className="mb-4 p-4 rounded-lg bg-[#F1F0FB] border border-[#D6BCFA]">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-[#7E69AB]">Total</p>
              <p className="text-xl font-bold text-[#9b87f5]">
                R$ {orders.reduce((sum, order) => sum + order.value, 0).toLocaleString()}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {getPaginatedOrders().map((order) => (
                <div 
                  key={order.id} 
                  className="p-4 rounded-lg bg-white border border-gray-100"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900">
                        {order.client}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {order.description}
                      </p>
                      {order.seller && (
                        <p className="text-xs text-[#C8C8C9]">
                          Vendedor: {order.seller}
                        </p>
                      )}
                    </div>
                    <span className="text-lg font-bold text-[#9b87f5]">
                      R$ {order.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-gray-100">
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
