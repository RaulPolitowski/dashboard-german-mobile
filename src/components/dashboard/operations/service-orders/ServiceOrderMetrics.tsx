
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ServiceOrderHeader } from "./components/ServiceOrderHeader";
import { ServiceOrderCards } from "./components/ServiceOrderCards";
import { ServiceOrderCharts } from "./components/ServiceOrderCharts";
import { ServiceOrderPerformanceIndicators } from "./components/ServiceOrderPerformanceIndicators";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  deadline: string;
}

export const ServiceOrderMetrics = () => {
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
