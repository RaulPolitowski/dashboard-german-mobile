import { useState } from "react";
import { Card } from "../../../ui/card";
import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { mockMetrics } from "./data/mockData";
import { useTheme } from "@/hooks/use-theme";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DueTodayOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  time: string;
}

const dueTodayOrders: DueTodayOrder[] = [
  {
    id: "1",
    client: "Empresa ABC",
    description: "Manutenção Servidores",
    value: 12000,
    technician: "João Silva",
    time: "14:00"
  },
  {
    id: "2",
    client: "Tech Solutions",
    description: "Instalação Rede",
    value: 8500,
    technician: "Maria Santos",
    time: "16:30"
  }
];

export const DueTodayOrders = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`p-4 cursor-pointer hover:shadow-lg transition-all ${
              isDarkMode 
                ? 'bg-amber-900/60 border-amber-700/80' 
                : 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200'
            }`}
            onClick={() => setShowDetails(true)}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-amber-300' : 'text-amber-500'}`} />
                  <h3 className={`font-semibold ${isDarkMode ? 'text-amber-200' : 'text-amber-700'}`}>
                    Previstas para Hoje
                  </h3>
                </div>
                <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-amber-100' : 'text-amber-600'}`}>
                  R$ {mockMetrics.dueTodayValue.toLocaleString()}
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-amber-200' : 'text-amber-600'}`}>
                  {mockMetrics.dueTodayCount} ordens
                </p>
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          className={`px-3 py-1.5 rounded-md text-sm z-50 ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
        >
          <p>Clique para ver detalhes das ordens previstas para hoje</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className={`max-w-3xl ${isDarkMode ? 'bg-gray-900 border-gray-800 text-gray-100' : ''}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-gray-100' : ''}>
              Ordens de Serviço Previstas para Hoje
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-auto touch-pan-x">
            <Table>
              <TableHeader>
                <TableRow className={isDarkMode ? 'border-gray-800' : ''}>
                  <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Cliente</TableHead>
                  <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Descrição</TableHead>
                  <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Técnico</TableHead>
                  <TableHead className={isDarkMode ? 'text-gray-300' : ''}>Horário</TableHead>
                  <TableHead className={`text-right ${isDarkMode ? 'text-gray-300' : ''}`}>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dueTodayOrders.map((order) => (
                  <TableRow key={order.id} className={isDarkMode ? 'border-gray-800 hover:bg-gray-800/50' : ''}>
                    <TableCell className={`font-medium ${isDarkMode ? 'text-gray-200' : ''}`}>
                      {order.client}
                    </TableCell>
                    <TableCell className={isDarkMode ? 'text-gray-300' : ''}>
                      {order.description}
                    </TableCell>
                    <TableCell className={isDarkMode ? 'text-gray-300' : ''}>
                      {order.technician}
                    </TableCell>
                    <TableCell className={isDarkMode ? 'text-gray-300' : ''}>
                      {order.time}
                    </TableCell>
                    <TableCell className={`text-right ${isDarkMode ? 'text-gray-300' : ''}`}>
                      R$ {order.value.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
