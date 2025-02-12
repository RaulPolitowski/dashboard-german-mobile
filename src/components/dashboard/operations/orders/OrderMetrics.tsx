
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
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
  const [selectedOrders, setSelectedOrders] = useState<{ title: string; orders: Order[] }>({ title: "", orders: [] });

  const handleShowDetails = (title: string, orders: Order[]) => {
    setSelectedOrders({ title, orders });
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
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedOrders.title}</DialogTitle>
          </DialogHeader>
          <OrderDetails title={selectedOrders.title} orders={selectedOrders.orders} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
