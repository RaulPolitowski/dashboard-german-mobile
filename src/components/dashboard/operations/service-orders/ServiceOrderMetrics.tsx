import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ServiceOrderHeader } from "./components/ServiceOrderHeader";
import { ServiceOrderCards } from "./components/ServiceOrderCards";
import { ServiceOrderCharts } from "./components/ServiceOrderCharts";
import { ServiceOrderPerformanceIndicators } from "./components/ServiceOrderPerformanceIndicators";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTheme } from '@/hooks/use-theme';
import { Card } from "../../../ui/card";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  deadline: string;
}

export const ServiceOrderMetrics = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedTechnician, setSelectedTechnician] = useState("all");
  const [showEvolutionChart, setShowEvolutionChart] = useState(true);
  const [showPerformanceChart, setShowPerformanceChart] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<{
    title: string;
    orders: ServiceOrder[];
    type: string;
  }>({ title: "", orders: [], type: "" });

  const handleShowDetails = (title: string, orders: ServiceOrder[], type: string) => {
    setSelectedOrders({ title, orders, type });
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      <ServiceOrderHeader
        selectedPeriod={selectedPeriod}
        selectedTechnician={selectedTechnician}
        onPeriodChange={setSelectedPeriod}
        onTechnicianChange={setSelectedTechnician}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ordens Abertas</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>58</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-indigo-900/60 text-indigo-200' : 'bg-indigo-50 text-indigo-600'}`}>
                +12.5%
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
              </div>
              <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>65% do objetivo mensal</span>
            </div>
          </div>
        </Card>

        <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Ordens Finalizadas</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>187</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-emerald-900/60 text-emerald-200' : 'bg-emerald-50 text-emerald-600'}`}>
                +8.2%
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "78%" }}></div>
              </div>
              <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>78% do objetivo mensal</span>
            </div>
          </div>
        </Card>

        <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Tempo Médio</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2.4 dias</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-amber-900/60 text-amber-200' : 'bg-amber-50 text-amber-600'}`}>
                -5.3%
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: "85%" }}></div>
              </div>
              <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>85% do objetivo mensal</span>
            </div>
          </div>
        </Card>

        <Card className={`p-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
          <div className="flex flex-col">
            <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Satisfação do Cliente</span>
            <div className="flex items-end justify-between mt-2">
              <span className={`text-2xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>96.8%</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${isDarkMode ? 'bg-blue-900/60 text-blue-200' : 'bg-blue-50 text-blue-600'}`}>
                +1.2%
              </div>
            </div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "97%" }}></div>
              </div>
              <span className={`text-xs mt-1 block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>97% do objetivo mensal</span>
            </div>
          </div>
        </Card>
      </div>

      <ServiceOrderCards handleOrderClick={handleShowDetails} />
      
      <ServiceOrderCharts
        showEvolutionChart={showEvolutionChart}
        showPerformanceChart={showPerformanceChart}
        onToggleEvolution={() => setShowEvolutionChart(!showEvolutionChart)}
        onTogglePerformance={() => setShowPerformanceChart(!showPerformanceChart)}
      />
      
      <ServiceOrderPerformanceIndicators />

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <div className="flex flex-col gap-4">
            <DialogTitle>{selectedOrders.title}</DialogTitle>
            <div className={`rounded-lg border p-4 ${
              selectedOrders.type === "inProgress" ? "bg-indigo-50 border-indigo-200" :
              selectedOrders.type === "completed" ? "bg-emerald-50 border-emerald-200" :
              "bg-rose-50 border-rose-200"
            }`}>
              <div className="text-lg font-semibold mb-2">
                Total: R$ {selectedOrders.orders.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {selectedOrders.orders.length} {selectedOrders.orders.length === 1 ? "ordem de serviço" : "ordens de serviço"}
              </div>
            </div>
            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Técnico</TableHead>
                    <TableHead>Prazo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedOrders.orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.client}</TableCell>
                      <TableCell>{order.description}</TableCell>
                      <TableCell>{order.technician}</TableCell>
                      <TableCell>{order.deadline}</TableCell>
                      <TableCell className="text-right">
                        R$ {order.value.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
