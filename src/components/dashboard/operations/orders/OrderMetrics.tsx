
import { useState } from "react";
import { Card } from "../../../ui/card";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../ui/select";
import { DueTodayOrders } from "./DueTodayOrders";
import { OrderCharts } from "./OrderCharts";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../ui/table";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

interface OrderDetailsProps {
  title: string;
  orders: Array<{
    id: string;
    client: string;
    value: number;
    description: string;
    seller: string;
    status: string;
    createdAt: string;
  }>;
}

const mockOrders = {
  created: [
    { id: '1', client: 'Cliente A', value: 12500, description: 'Pedido de Produtos X', seller: 'João Silva', status: 'pending', createdAt: '15/03/2024' },
    { id: '2', client: 'Cliente B', value: 8900, description: 'Pedido de Produtos Y', seller: 'Maria Santos', status: 'pending', createdAt: '15/03/2024' },
  ],
  approved: [
    { id: '3', client: 'Cliente C', value: 15600, description: 'Pedido de Produtos Z', seller: 'Pedro Oliveira', status: 'approved', createdAt: '14/03/2024' },
  ],
  pending: [
    { id: '4', client: 'Cliente D', value: 9800, description: 'Pedido de Produtos W', seller: 'Ana Silva', status: 'pending', createdAt: '14/03/2024' },
  ],
  cancelled: [
    { id: '5', client: 'Cliente E', value: 7500, description: 'Pedido de Produtos V', seller: 'Carlos Santos', status: 'cancelled', createdAt: '13/03/2024' },
  ],
};

const OrderDetails = ({ title, orders }: OrderDetailsProps) => (
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.client}</TableCell>
            <TableCell>{order.description}</TableCell>
            <TableCell>{order.seller}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.createdAt}</TableCell>
            <TableCell className="text-right">
              R$ {order.value.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export const OrderMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<{ title: string; orders: any[] }>({ title: "", orders: [] });

  const handleShowDetails = (title: string, orders: any[]) => {
    setSelectedOrders({ title, orders });
    setShowDetails(true);
  };

  const createdTotal = mockOrders.created.reduce((sum, order) => sum + order.value, 0);
  const approvedTotal = mockOrders.approved.reduce((sum, order) => sum + order.value, 0);
  const pendingTotal = mockOrders.pending.reduce((sum, order) => sum + order.value, 0);
  const cancelledTotal = mockOrders.cancelled.reduce((sum, order) => sum + order.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Métricas de Pedidos</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={selectedSeller} onValueChange={setSelectedSeller}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendedores</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Oliveira</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={selectedRange} onValueChange={(value: TimeRange) => setSelectedRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Período</SelectLabel>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    Últimos {range}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => handleShowDetails("Pedidos Criados", mockOrders.created)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-indigo-700">Pedidos Criados</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">{mockOrders.created.length}</p>
              <p className="text-sm text-indigo-600 mt-1">R$ {createdTotal.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => handleShowDetails("Pedidos Aprovados", mockOrders.approved)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-emerald-700">Pedidos Aprovados</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600 mt-2">{mockOrders.approved.length}</p>
              <p className="text-sm text-emerald-600 mt-1">R$ {approvedTotal.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => handleShowDetails("Pedidos Pendentes", mockOrders.pending)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-700">Pedidos Pendentes</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600 mt-2">{mockOrders.pending.length}</p>
              <p className="text-sm text-amber-600 mt-1">R$ {pendingTotal.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:shadow-lg transition-all"
          onClick={() => handleShowDetails("Pedidos Cancelados", mockOrders.cancelled)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold text-rose-700">Pedidos Cancelados</h3>
              </div>
              <p className="text-2xl font-bold text-rose-600 mt-2">{mockOrders.cancelled.length}</p>
              <p className="text-sm text-rose-600 mt-1">R$ {cancelledTotal.toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>

      <DueTodayOrders />

      <OrderCharts />

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedOrders.title}</DialogTitle>
          </DialogHeader>
          <OrderDetails title={selectedOrders.title} orders={selectedOrders.orders} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
