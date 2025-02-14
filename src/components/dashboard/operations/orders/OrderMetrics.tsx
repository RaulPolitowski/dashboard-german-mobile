
import { useState } from "react";
import { DueTodayOrders } from "./DueTodayOrders";
import { OrderCharts } from "./OrderCharts";
import { OrderHeader } from "./components/OrderHeader";
import { OrderCards } from "./components/OrderCards";
import { mockOrders } from "./data/mockOrders";
import { Order } from "./types/order-metrics";
import { OrderDetailsDialog } from "./components/cards/OrderDetailsDialog";

export const OrderMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<string>("30D");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<{ 
    title: string; 
    orders: Order[]; 
    type: "created" | "approved" | "pending" | "cancelled" 
  }>({ 
    title: "", 
    orders: [],
    type: "created"
  });

  const handleShowDetails = (title: string, orders: Order[], type: "created" | "approved" | "pending" | "cancelled") => {
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

      <OrderDetailsDialog
        isOpen={showDetails}
        onClose={() => setShowDetails(false)}
        title={selectedOrders.title}
        orders={selectedOrders.orders}
        type={selectedOrders.type}
      />
    </div>
  );
};
