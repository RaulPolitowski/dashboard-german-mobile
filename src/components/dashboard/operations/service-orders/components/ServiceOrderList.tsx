
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { ServiceOrderCard } from "./cards/ServiceOrderCard";

interface ServiceOrderListProps {
  metrics: {
    inProgressCount: number;
    inProgressValue: number;
    delayedCount: number;
    delayedValue: number;
    completedCount: number;
    completedValue: number;
  };
  onCardClick: (type: "inProgress" | "delayed" | "completed") => void;
}

export const ServiceOrderList = ({ metrics, onCardClick }: ServiceOrderListProps) => {
  return (
    <>
      <ServiceOrderCard
        title="Em Andamento"
        count={metrics.inProgressCount}
        value={metrics.inProgressValue}
        type="inProgress"
        Icon={Clock}
        onClick={() => onCardClick("inProgress")}
      />

      <ServiceOrderCard
        title="Atrasadas"
        count={metrics.delayedCount}
        value={metrics.delayedValue}
        type="delayed"
        Icon={AlertTriangle}
        onClick={() => onCardClick("delayed")}
      />

      <ServiceOrderCard
        title="Finalizadas"
        count={metrics.completedCount}
        value={metrics.completedValue}
        type="completed"
        Icon={CheckCircle2}
        onClick={() => onCardClick("completed")}
      />
    </>
  );
};
