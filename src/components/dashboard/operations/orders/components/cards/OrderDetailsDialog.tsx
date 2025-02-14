
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Order } from "../../types/order-metrics";

interface OrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  orders: Order[];
  type: "created" | "approved" | "pending" | "cancelled";
}

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

export const OrderDetailsDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  orders, 
  type 
}: OrderDetailsDialogProps) => {
  const styles = getTypeStyles(type);
  const total = orders.reduce((sum, order) => sum + order.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
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

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {orders.map((order) => (
              <div 
                key={order.id} 
                className={`p-4 rounded-lg border ${styles.bg}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{order.client}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{order.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        Data: {order.date}
                      </p>
                      {order.seller && (
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Vendedor: {order.seller}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`text-lg font-bold ${styles.text}`}>
                    R$ {order.value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
