
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@radix-ui/react-dialog";
import { DueTodayOrders } from "./DueTodayOrders";
import { OrderCharts } from "./OrderCharts";
import { OrderHeader } from "./components/OrderHeader";
import { OrderCards } from "./components/OrderCards";
import { OrderDetails } from "./components/OrderDetails";
import { mockOrders } from "./data/mockOrders";
import { Order } from "./types/order-metrics";

export const OrderMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<string>("30D");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<{ title: string; orders: Order[]; type: string }>({ 
    title: "", 
    orders: [],
    type: ""
  });

  const handleShowDetails = (title: string, orders: Order[], type: string) => {
    setSelectedOrders({ title, orders, type });
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      <OrderHeader 
        selectedSeller={selectedSeller}
        selectedRange={selectedRange}
        onSellerChange={setSelectedSeller}
        onRangeChange={setSelectedRange}
      />

      <OrderCards 
        data={mockOrders}
        onCardClick={handleShowDetails}
      />

      <DueTodayOrders />

      <OrderCharts />

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedOrders.title}</DialogTitle>
          </DialogHeader>
          <div className={`rounded-lg border p-4 ${
            selectedOrders.type === "created" ? "bg-indigo-50 border-indigo-200" :
            selectedOrders.type === "approved" ? "bg-emerald-50 border-emerald-200" :
            selectedOrders.type === "pending" ? "bg-amber-50 border-amber-200" :
            "bg-rose-50 border-rose-200"
          }`}>
            <div className="text-lg font-semibold mb-2">
              Total: R$ {selectedOrders.orders.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {selectedOrders.orders.length} {selectedOrders.orders.length === 1 ? "pedido" : "pedidos"}
            </div>
          </div>
          <div className="mt-4">
            <OrderDetails orders={selectedOrders.orders} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
