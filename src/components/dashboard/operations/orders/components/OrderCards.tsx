
import { Card } from "@/components/ui/card";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import { MockOrdersData, Order } from "../types/order-metrics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface OrderCardsProps {
  data: MockOrdersData;
  onCardClick: (title: string, orders: Order[], type: string) => void;
}

export const OrderCards = ({ data, onCardClick }: OrderCardsProps) => {
  const createdTotal = data.created.reduce((sum, order) => sum + order.value, 0);
  const approvedTotal = data.approved.reduce((sum, order) => sum + order.value, 0);
  const pendingTotal = data.pending.reduce((sum, order) => sum + order.value, 0);
  const cancelledTotal = data.cancelled.reduce((sum, order) => sum + order.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-indigo-50 to-white border-indigo-100"
              onClick={() => onCardClick("Pedidos Criados", data.created, "created")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg group-hover:bg-indigo-200 transition-colors">
                    <Package className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-indigo-700">Pedidos Criados</h3>
                </div>
                <p className="text-3xl font-bold text-indigo-600 mb-2">{data.created.length}</p>
                <p className="text-sm font-medium text-indigo-500">
                  R$ {createdTotal.toLocaleString()}
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes dos pedidos criados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-emerald-50 to-white border-emerald-100"
              onClick={() => onCardClick("Pedidos Aprovados", data.approved, "approved")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-emerald-700">Pedidos Aprovados</h3>
                </div>
                <p className="text-3xl font-bold text-emerald-600 mb-2">{data.approved.length}</p>
                <p className="text-sm font-medium text-emerald-500">
                  R$ {approvedTotal.toLocaleString()}
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes dos pedidos aprovados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-amber-50 to-white border-amber-100"
              onClick={() => onCardClick("Pedidos Pendentes", data.pending, "pending")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg group-hover:bg-amber-200 transition-colors">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-amber-700">Pedidos Pendentes</h3>
                </div>
                <p className="text-3xl font-bold text-amber-600 mb-2">{data.pending.length}</p>
                <p className="text-sm font-medium text-amber-500">
                  R$ {pendingTotal.toLocaleString()}
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes dos pedidos pendentes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-6 relative overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-gradient-to-br from-rose-50 to-white border-rose-100"
              onClick={() => onCardClick("Pedidos Cancelados", data.cancelled, "cancelled")}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-rose-100 rounded-lg group-hover:bg-rose-200 transition-colors">
                    <XCircle className="h-6 w-6 text-rose-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-rose-700">Pedidos Cancelados</h3>
                </div>
                <p className="text-3xl font-bold text-rose-600 mb-2">{data.cancelled.length}</p>
                <p className="text-sm font-medium text-rose-500">
                  R$ {cancelledTotal.toLocaleString()}
                </p>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <p>Clique para ver detalhes dos pedidos cancelados</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
