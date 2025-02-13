import { Receipt, Users, Banknote } from "lucide-react";
import { Card } from "../../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface MetricsCardsProps {
  onDailySalesClick: () => void;
  onMonthlySalesClick: () => void;
}

const todaysSales = [
  { 
    id: 1, 
    time: "09:30", 
    value: 450.00, 
    paymentMethod: "Cartão de Crédito",
    seller: "João Silva",
    client: "Cliente A"
  },
  { 
    id: 2, 
    time: "10:15", 
    value: 280.50, 
    paymentMethod: "PIX",
    seller: "Maria Santos",
    client: "Cliente B"
  },
  { 
    id: 3, 
    time: "11:45", 
    value: 890.00, 
    paymentMethod: "Cartão de Débito",
    seller: "Carlos Oliveira",
    client: "Cliente C"
  },
];

export const MetricsCards = ({ onDailySalesClick, onMonthlySalesClick }: MetricsCardsProps) => {
  const [showDailySales, setShowDailySales] = useState(false);
  const totalDaily = todaysSales.reduce((sum, sale) => sum + sale.value, 0);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-white border-blue-200 dark:from-blue-900/50 dark:to-gray-900"
                onClick={() => setShowDailySales(true)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium mb-1 text-blue-600 dark:text-blue-400">Vendas do Dia</p>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">R$ 2.500,00</p>
                    <p className="text-xs mt-1 text-blue-500 dark:text-blue-400">15 vendas hoje</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <Receipt className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent side="top" align="center">
              <p>Clique para ver detalhes das vendas do dia</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Card 
                className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 dark:from-indigo-500/30 dark:to-indigo-400/20 backdrop-blur-sm border border-indigo-500/30"
                onClick={onMonthlySalesClick}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Vendas do Mês</p>
                    <p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">R$ 45.750,00</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-300">157 vendas no mês</p>
                  </div>
                  <div className="bg-indigo-500/20 dark:bg-indigo-500/40 p-3 rounded-full">
                    <Users className="w-6 h-6 text-indigo-500 dark:text-indigo-400" />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              align="center"
              className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
            >
              <p>Clique para ver detalhes das vendas do mês</p>
            </TooltipContent>
          </Tooltip>

          <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 dark:from-cyan-500/30 dark:to-cyan-400/20 backdrop-blur-sm border border-cyan-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Ticket Médio</p>
                <p className="text-2xl font-bold text-cyan-500 dark:text-cyan-400">R$ 291,40</p>
                <p className="text-xs text-cyan-600 dark:text-cyan-300">+3% vs. mês anterior</p>
              </div>
              <div className="bg-cyan-500/20 dark:bg-cyan-500/40 p-3 rounded-full">
                <Banknote className="w-6 h-6 text-cyan-500 dark:text-cyan-400" />
              </div>
            </div>
          </Card>
        </TooltipProvider>
      </div>

      <Dialog open={showDailySales} onOpenChange={setShowDailySales}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Vendas do Dia
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowDailySales(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total do Dia</p>
                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                  R$ {totalDaily.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {todaysSales.map((sale) => (
                <div 
                  key={sale.id} 
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {sale.client}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {sale.paymentMethod}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {sale.time}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          Vendedor: {sale.seller}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      R$ {sale.value.toLocaleString()}
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
