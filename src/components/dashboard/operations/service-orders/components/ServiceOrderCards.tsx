import { useState } from "react";
import { Card } from "../../../../ui/card";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";
import { ServiceOrderDetailsDialog } from "./ServiceOrderDetailsDialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../ui/tooltip";

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

export const ServiceOrderCards = () => {
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
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleCardClick("inProgress")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-indigo-500" />
                      <h3 className="font-semibold text-indigo-700">Em Andamento</h3>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600 mt-2">
                      R$ {mockMetrics.inProgressValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-indigo-600 mt-1">
                      {mockMetrics.inProgressCount} ordens
                    </p>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              align="center"
              className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
            >
              <p>Clique para ver detalhes das ordens em andamento</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleCardClick("delayed")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-rose-500" />
                      <h3 className="font-semibold text-rose-700">Atrasadas</h3>
                    </div>
                    <p className="text-2xl font-bold text-rose-600 mt-2">
                      R$ {mockMetrics.delayedValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-rose-600 mt-1">
                      {mockMetrics.delayedCount} ordens
                    </p>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              align="center"
              className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
            >
              <p>Clique para ver detalhes das ordens atrasadas</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleCardClick("completed")}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      <h3 className="font-semibold text-emerald-700">Finalizadas</h3>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">
                      R$ {mockMetrics.completedValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-emerald-600 mt-1">
                      {mockMetrics.completedCount} ordens
                    </p>
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              align="center"
              className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
            >
              <p>Clique para ver detalhes das ordens finalizadas</p>
            </TooltipContent>
          </Tooltip>

          <DueTodayOrders />
        </TooltipProvider>
      </div>

      <ServiceOrderDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        orders={selectedOrders}
        title={dialogTitle}
      />
    </>
  );
};
