
import { useState } from "react";
import { MockOrdersData, Order } from "../types/order-metrics";
import { OrderGrid } from "./OrderGrid";
import { OrderList } from "./OrderList";
import { OrderDetailsDialog } from "./cards/OrderDetailsDialog";

interface OrderCardsProps {
  data: MockOrdersData;
  onCardClick: (title: string, orders: Order[], type: "created" | "approved" | "pending" | "cancelled") => void;
}

export const OrderCards = ({ data, onCardClick }: OrderCardsProps) => {
  const [selectedOrders, setSelectedOrders] = useState<{ 
    title: string; 
    orders: Order[]; 
    type: "created" | "approved" | "pending" | "cancelled" 
  }>({ 
    title: "", 
    orders: [],
    type: "created"
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (title: string, orders: Order[], type: "created" | "approved" | "pending" | "cancelled") => {
    setSelectedOrders({ title, orders, type });
    setIsDialogOpen(true);
    onCardClick(title, orders, type);
  };

  return (
    <>
      <OrderGrid>
        <OrderList data={data} onCardClick={handleCardClick} />
      </OrderGrid>

      <OrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={selectedOrders.title}
        orders={selectedOrders.orders}
        type={selectedOrders.type}
      />
    </>
  );
};
