
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => onCardClick("Pedidos Criados", data.created)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-indigo-500" />
                    <h3 className="font-semibold text-indigo-700">Pedidos Criados</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mt-2">{data.created.length}</p>
                  <p className="text-sm text-indigo-600 mt-1">R$ {createdTotal.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos pedidos criados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => onCardClick("Pedidos Aprovados", data.approved)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-semibold text-emerald-700">Pedidos Aprovados</h3>
                  </div>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">{data.approved.length}</p>
                  <p className="text-sm text-emerald-600 mt-1">R$ {approvedTotal.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos pedidos aprovados</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => onCardClick("Pedidos Pendentes", data.pending)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-amber-700">Pedidos Pendentes</h3>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mt-2">{data.pending.length}</p>
                  <p className="text-sm text-amber-600 mt-1">R$ {pendingTotal.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos pedidos pendentes</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => onCardClick("Pedidos Cancelados", data.cancelled)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-rose-500" />
                    <h3 className="font-semibold text-rose-700">Pedidos Cancelados</h3>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-2">{data.cancelled.length}</p>
                  <p className="text-sm text-rose-600 mt-1">R$ {cancelledTotal.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos pedidos cancelados</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
