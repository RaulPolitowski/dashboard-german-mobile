
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const handleCardClick = (type: "inProgress" | "delayed" | "completed") => {
    const titles = {
      inProgress: "Ordens em Andamento",
      delayed: "Ordens Atrasadas",
      completed: "Ordens Finalizadas",
    };
    setSelectedOrders(mockOrders[type]);
    setDialogTitle(titles[type]);
    setIsDialogOpen(true);
    handleOrderClick(titles[type], mockOrders[type], type);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-indigo-50 to-white border-indigo-100"
              onClick={() => handleCardClick("inProgress")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                    <Clock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-indigo-700">Em Andamento</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600 mb-2">
                  R$ {mockMetrics.inProgressValue.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-indigo-500">
                  {mockMetrics.inProgressCount} ordens
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes das ordens em andamento</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-rose-50 to-white border-rose-100"
              onClick={() => handleCardClick("delayed")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                    <AlertTriangle className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-rose-700">Atrasadas</h3>
                </div>
                <p className="text-3xl font-bold text-rose-600 mb-2">
                  R$ {mockMetrics.delayedValue.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-rose-500">
                  {mockMetrics.delayedCount} ordens
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes das ordens atrasadas</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
              onClick={() => handleCardClick("completed")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-emerald-700">Finalizadas</h3>
                </div>
                <p className="text-3xl font-bold text-emerald-600 mb-2">
                  R$ {mockMetrics.completedValue.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-emerald-500">
                  {mockMetrics.completedCount} ordens
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes das ordens finalizadas</p>
          </TooltipContent>
        </Tooltip>

        <DueTodayOrders />
      </TooltipProvider>
    </div>
  );
};
