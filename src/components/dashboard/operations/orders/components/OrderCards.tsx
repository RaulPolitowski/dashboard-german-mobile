
import { Card } from "@/components/ui/card";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import { MockOrdersData, Order } from "../types/order-metrics";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface OrderCardsProps {
  data: MockOrdersData;
  onCardClick: (title: string, orders: Order[], type: string) => void;
}

export const OrderCards = ({ data, onCardClick }: OrderCardsProps) => {
  const createdTotal = data.created.reduce((sum, order) => sum + order.value, 0);
  const approvedTotal = data.approved.reduce((sum, order) => sum + order.value, 0);
  const pendingTotal = data.pending.reduce((sum, order) => sum + order.value, 0);
  const cancelledTotal = data.cancelled.reduce((sum, order) => sum + order.value, 0);
  const [selectedOrders, setSelectedOrders] = useState<{ title: string; orders: Order[]; type: string }>({ 
    title: "", 
    orders: [],
    type: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (title: string, orders: Order[], type: string) => {
    setSelectedOrders({ title, orders, type });
    setIsDialogOpen(true);
    onCardClick(title, orders, type);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-indigo-50 to-white border-indigo-200 dark:from-indigo-900/50 dark:to-gray-900"
                onClick={() => handleCardClick("Pedidos Criados", data.created, "created")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1 text-indigo-600 dark:text-indigo-400">Pedidos Criados</p>
                    <p className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                      {data.created.length}
                    </p>
                    <p className="text-xs mt-1 text-indigo-500 dark:text-indigo-400">
                      R$ {createdTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                    <Package className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
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
                className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-emerald-50 to-white border-emerald-200 dark:from-emerald-900/50 dark:to-gray-900"
                onClick={() => handleCardClick("Pedidos Aprovados", data.approved, "approved")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1 text-emerald-600 dark:text-emerald-400">Pedidos Aprovados</p>
                    <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                      {data.approved.length}
                    </p>
                    <p className="text-xs mt-1 text-emerald-500 dark:text-emerald-400">
                      R$ {approvedTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/50">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
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
                className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-amber-50 to-white border-amber-200 dark:from-amber-900/50 dark:to-gray-900"
                onClick={() => handleCardClick("Pedidos Pendentes", data.pending, "pending")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1 text-amber-600 dark:text-amber-400">Pedidos Pendentes</p>
                    <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                      {data.pending.length}
                    </p>
                    <p className="text-xs mt-1 text-amber-500 dark:text-amber-400">
                      R$ {pendingTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/50">
                    <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </div>
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
                className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from-rose-50 to-white border-rose-200 dark:from-rose-900/50 dark:to-gray-900"
                onClick={() => handleCardClick("Pedidos Cancelados", data.cancelled, "cancelled")}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1 text-rose-600 dark:text-rose-400">Pedidos Cancelados</p>
                    <p className="text-2xl font-bold text-rose-700 dark:text-rose-300">
                      {data.cancelled.length}
                    </p>
                    <p className="text-xs mt-1 text-rose-500 dark:text-rose-400">
                      R$ {cancelledTotal.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-rose-100 dark:bg-rose-900/50">
                    <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>Clique para ver detalhes dos pedidos cancelados</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className={`text-xl font-bold ${
                selectedOrders.type === "created" ? "text-indigo-600 dark:text-indigo-400" :
                selectedOrders.type === "approved" ? "text-emerald-600 dark:text-emerald-400" :
                selectedOrders.type === "pending" ? "text-amber-600 dark:text-amber-400" :
                "text-rose-600 dark:text-rose-400"
              }`}>
                {selectedOrders.title}
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
              {selectedOrders.orders.map((order) => (
                <div 
                  key={order.id} 
                  className={`p-4 rounded-lg border ${
                    selectedOrders.type === "created" ? "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800" :
                    selectedOrders.type === "approved" ? "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800" :
                    selectedOrders.type === "pending" ? "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800" :
                    "bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">{order.client}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{order.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Data: {order.date}
                        </p>
                        {order.seller && (
                          <p className="text-xs text-gray-400 dark:text-gray-500">
                            Vendedor: {order.seller}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${
                      selectedOrders.type === "created" ? "text-indigo-600 dark:text-indigo-400" :
                      selectedOrders.type === "approved" ? "text-emerald-600 dark:text-emerald-400" :
                      selectedOrders.type === "pending" ? "text-amber-600 dark:text-amber-400" :
                      "text-rose-600 dark:text-rose-400"
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
    </>
  );
};
