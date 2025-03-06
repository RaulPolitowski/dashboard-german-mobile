
import { useState } from "react";
import { DueTodayOrders } from "./DueTodayOrders";
import { OrderCharts } from "./OrderCharts";
import { OrderHeader } from "./components/OrderHeader";
import { OrderCards } from "./components/OrderCards";
import { mockOrders } from "./data/mockOrders";
import { Order } from "./types/order-metrics";
import { OrderDetailsDialog } from "./components/cards/OrderDetailsDialog";

export const OrderMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<string>("current-month");
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

  const handleRangeChange = (value: string) => {
    setSelectedRange(value);
    console.log("Range changed to:", value);
    // Aqui você pode adicionar a lógica para filtrar os dados baseado no novo range
  };

  const handleSellerChange = (value: string) => {
    setSelectedSeller(value);
    console.log("Seller changed to:", value);
    // Aqui você pode adicionar a lógica para filtrar os dados baseado no novo vendedor
  };

  return (
    <div className="space-y-6">
      <OrderHeader 
        selectedSeller={selectedSeller}
        selectedRange={selectedRange}
        onSellerChange={handleSellerChange}
        onRangeChange={handleRangeChange}
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
