
import { useState } from "react";
import { Card } from "../../../ui/card";
import { Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";
import { mockMetrics } from "./data/mockData";

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

  return (
    <>
      <Card 
        className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200 cursor-pointer hover:shadow-lg transition-all"
        onClick={() => setShowDetails(true)}
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-amber-700">Previstas para Hoje</h3>
            </div>
            <p className="text-2xl font-bold text-amber-600 mt-2">
              R$ {mockMetrics.dueTodayValue.toLocaleString()}
            </p>
            <p className="text-sm text-amber-600 mt-1">
              {mockMetrics.dueTodayCount} ordens
            </p>
          </div>
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ordens de Serviço Previstas para Hoje</DialogTitle>
          </DialogHeader>
          <div className="overflow-auto touch-pan-x">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Técnico</TableHead>
                  <TableHead>Horário</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dueTodayOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.client}</TableCell>
                    <TableCell>{order.description}</TableCell>
                    <TableCell>{order.technician}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell className="text-right">
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
