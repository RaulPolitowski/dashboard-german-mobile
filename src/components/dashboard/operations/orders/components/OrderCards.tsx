
import { Card } from "@/components/ui/card";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import { MockOrdersData, Order } from "../types/order-metrics";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { OrderCard } from "./cards/OrderCard";
import { OrderDetailsDialog } from "./cards/OrderDetailsDialog";

interface OrderCardsProps {
  data: MockOrdersData;
  onCardClick: (title: string, orders: Order[], type: string) => void;
}

export const OrderCards = ({ data, onCardClick }: OrderCardsProps) => {
  const createdTotal = data.created.reduce((sum, order) => sum + order.value, 0);
  const approvedTotal = data.approved.reduce((sum, order) => sum + order.value, 0);
  const pendingTotal = data.pending.reduce((sum, order) => sum + order.value, 0);
  const cancelledTotal = data.cancelled.reduce((sum, order) => sum + order.value, 0);
  
  const [selectedOrders, setSelectedOrders] = useState<{ title: string; orders: Order[]; type: string }>({ 
    title: "", 
    orders: [],
    type: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (title: string, orders: Order[], type: "created" | "approved" | "pending" | "cancelled") => {
    setSelectedOrders({ title, orders, type });
    setIsDialogOpen(true);
    onCardClick(title, orders, type);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
        <TooltipProvider delayDuration={200}>
          <OrderCard
            title="Pedidos Criados"
            count={data.created.length}
            value={createdTotal}
            type="created"
            Icon={Package}
            onClick={() => handleCardClick("Pedidos Criados", data.created, "created")}
          />

          <OrderCard
            title="Pedidos Aprovados"
            count={data.approved.length}
            value={approvedTotal}
            type="approved"
            Icon={CheckCircle2}
            onClick={() => handleCardClick("Pedidos Aprovados", data.approved, "approved")}
          />

          <OrderCard
            title="Pedidos Pendentes"
            count={data.pending.length}
            value={pendingTotal}
            type="pending"
            Icon={Clock}
            onClick={() => handleCardClick("Pedidos Pendentes", data.pending, "pending")}
          />

          <OrderCard
            title="Pedidos Cancelados"
            count={data.cancelled.length}
            value={cancelledTotal}
            type="cancelled"
            Icon={XCircle}
            onClick={() => handleCardClick("Pedidos Cancelados", data.cancelled, "cancelled")}
          />
        </TooltipProvider>
      </div>

      <OrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={selectedOrders.title}
        orders={selectedOrders.orders}
        type={selectedOrders.type as "created" | "approved" | "pending" | "cancelled"}
      />
    </>
  );
};
