
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
                className="p-6 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all bg-gradient-to-br from