
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import { OrderCard } from "./cards/OrderCard";
import { MockOrdersData } from "../types/order-metrics";

interface OrderListProps {
  data: MockOrdersData;
  onCardClick: (title: string, orders: any[], type: "created" | "approved" | "pending" | "cancelled") => void;
}

export const OrderList = ({ data, onCardClick }: OrderListProps) => {
  const createdTotal = data.created.reduce((sum, order) => sum + order.value, 0);
  const approvedTotal = data.approved.reduce((sum, order) => sum + order.value, 0);
  const pendingTotal = data.pending.reduce((sum, order) => sum + order.value, 0);
  const cancelledTotal = data.cancelled.reduce((sum, order) => sum + order.value, 0);

  return (
    <>
      <OrderCard
        title="Pedidos Criados"
        count={data.created.length}
        value={createdTotal}
        type="created"
        Icon={Package}
        onClick={() => onCardClick("Pedidos Criados", data.created, "created")}
      />

      <OrderCard
        title="Pedidos Aprovados"
        count={data.approved.length}
        value={approvedTotal}
        type="approved"
        Icon={CheckCircle2}
        onClick={() => onCardClick("Pedidos Aprovados", data.approved, "approved")}
      />

      <OrderCard
        title="Pedidos Pendentes"
        count={data.pending.length}
        value={pendingTotal}
        type="pending"
        Icon={Clock}
        onClick={() => onCardClick("Pedidos Pendentes", data.pending, "pending")}
      />

      <OrderCard
        title="Pedidos Cancelados"
        count={data.cancelled.length}
        value={cancelledTotal}
        type="cancelled"
        Icon={XCircle}
        onClick={() => onCardClick("Pedidos Cancelados", data.cancelled, "cancelled")}
      />
    </>
  );
};
