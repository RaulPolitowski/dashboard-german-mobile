
import { ServiceOrder, ServiceOrderMetrics } from "../types/serviceOrder";

export const mockServiceOrders: ServiceOrder[] = [
  {
    id: "1",
    description: "Manutenção Preventiva",
    client: "Empresa ABC",
    value: 2500,
    status: "in_progress",
    technician: "João Silva",
    startDate: new Date("2024-03-15"),
    dueDate: new Date("2024-03-20"),
    type: "Manutenção"
  },
  {
    id: "2",
    description: "Instalação de Equipamento",
    client: "Empresa XYZ",
    value: 4800,
    status: "delayed",
    technician: "Maria Santos",
    startDate: new Date("2024-03-10"),
    dueDate: new Date("2024-03-14"),
    type: "Instalação"
  },
  {
    id: "3",
    description: "Reparo em Servidor",
    client: "Tech Solutions",
    value: 3200,
    status: "completed",
    technician: "Pedro Oliveira",
    startDate: new Date("2024-03-12"),
    dueDate: new Date("2024-03-15"),
    completedDate: new Date("2024-03-15"),
    type: "Reparo"
  }
];

export const mockMetrics: ServiceOrderMetrics = {
  totalCount: 45,
  totalValue: 156000,
  inProgressCount: 18,
  inProgressValue: 68000,
  delayedCount: 5,
  delayedValue: 22000,
  completedCount: 22,
  completedValue: 66000,
  dueTodayCount: 8,
  dueTodayValue: 28000,
  averageCompletionTime: 3.5,
  onTimeDeliveryRate: 92
};

