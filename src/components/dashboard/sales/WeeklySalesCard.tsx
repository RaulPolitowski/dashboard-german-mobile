
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../../ui/card";
import { WeeklySalesChart } from "../../charts/WeeklySalesChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useState } from "react";

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
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

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
    setSelectedDay(day);
    setShowDetails(true);
  };

  return (
    <Card className="p-4 md:p-6">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={onToggleMinimize}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Análise de Vendas por Dia e Horário</h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Análise de Vendas por Dia e Horário</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição semanal de vendas por intervalo de horário</p>
            </div>
            <button 
              onClick={onToggleMinimize}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          {!isInsightsMinimized && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-50 via-indigo-100/40 to-indigo-50/30 border border-indigo-100">
                  <p className="text-sm text-gray-600">Total em Vendas</p>
                  <p className="text-lg font-semibold text-indigo-600">
                    R$ {totals.totalSales.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30 border border-emerald-100">
                  <p className="text-sm text-gray-600">Total de Transações</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    {totals.totalTransactions.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30 border border-blue-100">
                  <p className="text-sm text-gray-600">Ticket Médio</p>
                  <p className="text-lg font-semibold text-blue-600">
                    R$ {totals.averageTicket.toLocaleString()}
                  </p>
                </div>
              </div>
              <div onClick={() => handleChartClick("Segunda")}>
                <WeeklySalesChart />
              </div>
            </>
          )}

          <div className="mt-4">
            <div 
              className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
              onClick={onToggleInsights}
            >
              <h4 className="font-medium text-gray-700 dark:text-gray-200">Insights</h4>
              {isInsightsMinimized ? (
                <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </div>
            {!isInsightsMinimized && (
              <div className="mt-2 space-y-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-300">Melhores Períodos</h5>
                    <div className="text-sm">
                      <p className="text-gray-700 dark:text-gray-200">
                        • Melhor dia: <span className="font-medium text-emerald-600 dark:text-emerald-400">{totals.bestDay}</span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        • Melhor horário: <span className="font-medium text-emerald-600 dark:text-emerald-400">{totals.bestTime}</span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-600 dark:text-gray-300">Períodos para Melhorar</h5>
                    <div className="text-sm">
                      <p className="text-gray-700 dark:text-gray-200">
                        • Dia mais fraco: <span className="font-medium text-rose-600 dark:text-rose-400">{totals.worstDay}</span>
                      </p>
                      <p className="text-gray-700 dark:text-gray-200">
                        • Horário mais fraco: <span className="font-medium text-rose-600 dark:text-rose-400">{totals.worstTime}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Detalhes de Vendas - {selectedDay}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Horário
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantidade
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Valor Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {totals.salesByTime.map((timeSlot) => (
                        <tr key={timeSlot.time}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {timeSlot.time}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {timeSlot.sales.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            R$ {timeSlot.value.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Card>
  );
};
