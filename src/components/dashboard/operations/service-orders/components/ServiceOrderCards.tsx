
import { useState } from "react";
import { Card } from "../../../../ui/card";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../../ui/tooltip";
import { Dialog, DialogContent, DialogTitle } from "../../../../ui/dialog";
import { Button } from "../../../../ui/button";
import { X } from "lucide-react";

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
  const [selectedType, setSelectedType] = useState<string>("");

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
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-indigo-50 to-white border-indigo-200 dark:from-indigo-900/50 dark:to-gray-900"
              onClick={() => handleCardClick("inProgress")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-1 text-indigo-600 dark:text-indigo-400">Em Andamento</p>
                  <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                    R$ {mockMetrics.inProgressValue.toLocaleString()}
                  </p>
                  <p className="text-xs mt-1 text-indigo-500 dark:text-indigo-400">
                    {mockMetrics.inProgressCount} ordens
                  </p>
                </div>
                <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <Clock className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
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
              className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-rose-50 to-white border-rose-200 dark:from-rose-900/50 dark:to-gray-900"
              onClick={() => handleCardClick("delayed")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-1 text-rose-600 dark:text-rose-400">Atrasadas</p>
                  <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">
                    R$ {mockMetrics.delayedValue.toLocaleString()}
                  </p>
                  <p className="text-xs mt-1 text-rose-500 dark:text-rose-400">
                    {mockMetrics.delayedCount} ordens
                  </p>
                </div>
                <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/50">
                  <AlertTriangle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </div>
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
              className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-emerald-50 to-white border-emerald-200 dark:from-emerald-900/50 dark:to-gray-900"
              onClick={() => handleCardClick("completed")}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium mb-1 text-emerald-600 dark:text-emerald-400">Finalizadas</p>
                  <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    R$ {mockMetrics.completedValue.toLocaleString()}
                  </p>
                  <p className="text-xs mt-1 text-emerald-500 dark:text-emerald-400">
                    {mockMetrics.completedCount} ordens
                  </p>
                </div>
                <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes das ordens finalizadas</p>
          </TooltipContent>
        </Tooltip>

        <DueTodayOrders />
      </TooltipProvider>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className={`text-xl font-bold ${
                selectedType === "inProgress" ? "text-indigo-600 dark:text-indigo-400" :
                selectedType === "delayed" ? "text-rose-600 dark:text-rose-400" :
                "text-emerald-600 dark:text-emerald-400"
              }`}>
                {dialogTitle}
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsDialogOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {selectedOrders.map((order) => (
                <div 
                  key={order.id} 
                  className={`p-4 rounded-lg border ${
                    selectedType === "inProgress" ? "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800" :
                    selectedType === "delayed" ? "bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800" :
                    "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{order.client}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Prazo: {order.deadline}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Técnico: {order.technician}
                        </p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${
                      selectedType === "inProgress" ? "text-indigo-600 dark:text-indigo-400" :
                      selectedType === "delayed" ? "text-rose-600 dark:text-rose-400" :
                      "text-emerald-600 dark:text-emerald-400"
                    }`}>
                      R$ {order.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
