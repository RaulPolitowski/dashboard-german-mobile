
import { Receipt, Users, Banknote } from "lucide-react";
import { Card } from "../../ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

interface MetricsCardsProps {
  onDailySalesClick: () => void;
  onMonthlySalesClick: () => void;
}

export const MetricsCards = ({ onDailySalesClick, onMonthlySalesClick }: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-blue-500/20 to-blue-400/10 dark:from-blue-500/30 dark:to-blue-400/20 backdrop-blur-sm border border-blue-500/30"
              onClick={onDailySalesClick}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Vendas do Dia</p>
                  <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">R$ 2.500,00</p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">15 vendas hoje</p>
                </div>
                <div className="bg-blue-500/20 dark:bg-blue-500/40 p-3 rounded-full">
                  <Receipt className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
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
  );
};
