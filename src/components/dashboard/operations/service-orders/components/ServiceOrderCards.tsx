
import { useState } from "react";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ServiceOrderCard } from "./cards/ServiceOrderCard";
import { ServiceOrderDetailsDialog } from "./cards/ServiceOrderDetailsDialog";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  deadline: string;
}

interface ServiceOrderCardsProps {
  handleOrderClick: (title: string, orders: ServiceOrder[], type: string) => void;
}

const mockOrders = {
  inProgress: [
    { id: "1", client: "Empresa A", description: "Manutenção Preventiva", value: 5000, status: "Em Andamento", technician: "João Silva", deadline: "2024-03-25" },
    { id: "2", client: "Empresa B", description: "Instalação de Equipamento", value: 8000, status: "Em Andamento", technician: "Maria Santos", deadline: "2024-03-28" },
  ],
  delayed: [
    { id: "3", client: "Empresa C", description: "Reparo Emergencial", value: 3500, status: "Atrasada", technician: "Pedro Costa", deadline: "2024-03-15" },
    { id: "4", client: "Empresa D", description: "Manutenção Corretiva", value: 4200, status: "Atrasada", technician: "Ana Oliveira", deadline: "2024-03-18" },
  ],
  completed: [
    { id: "5", client: "Empresa E", description: "Instalação de Sistema", value: 12000, status: "Finalizada", technician: "Carlos Santos", deadline: "2024-03-20" },
    { id: "6", client: "Empresa F", description: "Configuração de Rede", value: 6500, status: "Finalizada", technician: "Mariana Silva", deadline: "2024-03-22" },
  ],
};

export const ServiceOrderCards = ({ handleOrderClick }: ServiceOrderCardsProps) => {
  const [selectedOrders, setSelectedOrders] = useState<typeof mockOrders.inProgress>([]);
  const [dialogTitle, setDialogTitle] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<"inProgress" | "delayed" | "completed">("inProgress");

  const handleCardClick = (type: "inProgress" | "delayed" | "completed") => {
    const titles = {
      inProgress: "Ordens em Andamento",
      delayed: "Ordens Atrasadas",
      completed: "Ordens Finalizadas",
    };
    setSelectedOrders(mockOrders[type]);
    setDialogTitle(titles[type]);
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
      <TooltipProvider delayDuration={200}>
        <ServiceOrderCard
          title="Em Andamento"
          count={mockMetrics.inProgressCount}
          value={mockMetrics.inProgressValue}
          type="inProgress"
          Icon={Clock}
          onClick={() => handleCardClick("inProgress")}
        />

        <ServiceOrderCard
          title="Atrasadas"
          count={mockMetrics.delayedCount}
          value={mockMetrics.delayedValue}
          type="delayed"
          Icon={AlertTriangle}
          onClick={() => handleCardClick("delayed")}
        />

        <ServiceOrderCard
          title="Finalizadas"
          count={mockMetrics.completedCount}
          value={mockMetrics.completedValue}
          type="completed"
          Icon={CheckCircle2}
          onClick={() => handleCardClick("completed")}
        />

        <DueTodayOrders />
      </TooltipProvider>

      <ServiceOrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
        orders={selectedOrders}
        type={selectedType}
      />
    </div>
  );
};
