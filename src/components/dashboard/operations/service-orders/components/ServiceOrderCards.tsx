
import { useState } from "react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";
import { ServiceOrderGrid } from "./ServiceOrderGrid";
import { ServiceOrderList } from "./ServiceOrderList";
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
    <>
      <ServiceOrderGrid>
        <ServiceOrderList 
          metrics={mockMetrics}
          onCardClick={handleCardClick}
        />
        <DueTodayOrders />
      </ServiceOrderGrid>

      <ServiceOrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
        orders={selectedOrders}
        type={selectedType}
      />
    </>
  );
};
