import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { WeeklySalesChart } from "../../charts/WeeklySalesChart";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";
import { SalesDetailsDialog } from "../../charts/weekly-sales/components/SalesDetailsDialog";

interface WeeklySalesCardProps {
  isMinimized: boolean;
  isInsightsMinimized: boolean;
  onToggleMinimize: () => void;
  onToggleInsights: () => void;
}

export const WeeklySalesCard = ({
  isMinimized,
  isInsightsMinimized,
  onToggleMinimize,
  onToggleInsights
}: WeeklySalesCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDayData, setSelectedDayData] = useState<any>(null);

  // Dados mockados para demonstração
  const totals = {
    totalSales: 345678.90,
    totalTransactions: 1234,
    averageTicket: 280.13,
    bestDay: "Quinta-feira",
    bestTime: "15:00-18:00",
    worstDay: "Domingo",
    worstTime: "08:00-10:00",
    salesByTime: [
      { time: "08:00-10:00", sales: 1200, value: 28500 },
      { time: "10:00-12:00", sales: 2800, value: 45600 },
      { time: "12:00-15:00", sales: 2100, value: 38900 },
      { time: "15:00-18:00", sales: 3200, value: 52300 },
      { time: "18:00-00:00", sales: 1800, value: 31200 }
    ]
  };

  const handleChartClick = (day: string) => {
    // Simular dados do dia selecionado
    const dayData = {
      day,
      "08:00-10:00": { value: 28500 },
      "10:00-12:00": { value: 45600 },
      "12:00-15:00": { value: 38900 },
      "15:00-18:00": { value: 52300 },
      "18:00-00:00": { value: 31200 }
    };
    setSelectedDayData(dayData);
    setShowDetails(true);
  };

  return (
    <Card className="p-4 md:p-6 bg-background/50 dark:bg-gray-900/50 border dark:border-gray-800">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Análise de Vendas por Horário</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição semanal de vendas por intervalo</p>
          </div>
        </div>

        {!isInsightsMinimized && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-400/5 dark:from-indigo-500/20 dark:to-indigo-400/10 border border-indigo-500/20 dark:border-indigo-500/30 hover:shadow-md transition-all">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total em Vendas</p>
                <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                  R$ {totals.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 dark:from-emerald-500/20 dark:to-emerald-400/10 border border-emerald-500/20 dark:border-emerald-500/30 hover:shadow-md transition-all">
                <p className="text-sm text-gray-600 dark:text-gray-300">Total de Transações</p>
                <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {totals.totalTransactions.toLocaleString()}
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-400/5 dark:from-blue-500/20 dark:to-blue-400/10 border border-blue-500/20 dark:border-blue-500/30 hover:shadow-md transition-all">
                <p className="text-sm text-gray-600 dark:text-gray-300">Ticket Médio</p>
                <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  R$ {totals.averageTicket.toLocaleString()}
                </p>
              </div>
            </div>
            <div onClick={() => handleChartClick("Segunda")}>
              <WeeklySalesChart />
            </div>
          </>
        )}

        <SalesDetailsDialog
          isOpen={showDetails}
          onClose={() => setShowDetails(false)}
          dayData={selectedDayData}
        />
      </div>
    </Card>
  );
};
