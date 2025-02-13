
import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesTable } from "./ExpensesTable";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { calculateTotals } from "../charts/CashFlowChart";
import { PaymentMethodDetails } from "../charts/PaymentMethodDetails";
import { WeeklySalesChart } from "../charts/WeeklySalesChart";
import { format } from "date-fns";

export const FinancialCharts = () => {
  const [period, setPeriod] = useState("day");
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Calcular totais do dia atual e anterior
  const currentTotals = calculateTotals("day");
  const yesterdayTotals = calculateTotals("yesterday");
  
  // Se houver uma data selecionada, calcular os totais daquele dia
  const selectedDayTotals = selectedDate ? calculateTotals(selectedDate) : currentTotals;

  const getComparisonIndicator = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = previous !== 0 ? (diff / previous) * 100 : 0;
    
    if (diff > 0) {
      return (
        <div className="flex items-center text-emerald-600 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          {Math.abs(percentage).toFixed(1)}%
        </div>
      );
    } else if (diff < 0) {
      return (
        <div className="flex items-center text-rose-600 text-sm">
          <TrendingDown className="w-4 h-4 mr-1" />
          {Math.abs(percentage).toFixed(1)}%
        </div>
      );
    }
    return null;
  };

  const handleDayClick = (date: string) => {
    setSelectedDate(date);
    setShowDetails(true);
  };

  return (
    <div className="space-y-6">
      <WeeklySalesChart onDayClick={handleDayClick} />
      
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          {isMinimized ? (
            <div 
              className="cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Fluxo de Caixa
                  {selectedDate && ` - ${format(new Date(selectedDate), "dd/MM/yyyy")}`}
                </h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    Fluxo de Caixa
                    {selectedDate && ` - ${format(new Date(selectedDate), "dd/MM/yyyy")}`}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Movimentação Financeira: R$ {selectedDayTotals.result.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <ChartBar 
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer"
                    onClick={() => setShowDetails(true)}
                  />
                  <button 
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30 border border-emerald-100">
                  <p className="text-sm text-gray-600">Movimentações de Entrada</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    R$ {selectedDayTotals.revenue.toLocaleString()}
                  </p>
                  {!selectedDate && (
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-500 mr-2">
                        Ontem: R$ {yesterdayTotals.revenue.toLocaleString()}
                      </p>
                      {getComparisonIndicator(currentTotals.revenue, yesterdayTotals.revenue)}
                    </div>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30 border border-rose-100">
                  <p className="text-sm text-gray-600">Movimentações de Saída</p>
                  <p className="text-lg font-semibold text-rose-600">
                    R$ {selectedDayTotals.expenses.toLocaleString()}
                  </p>
                  {!selectedDate && (
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-500 mr-2">
                        Ontem: R$ {yesterdayTotals.expenses.toLocaleString()}
                      </p>
                      {getComparisonIndicator(currentTotals.expenses, yesterdayTotals.expenses)}
                    </div>
                  )}
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30 border border-blue-100">
                  <p className="text-sm text-gray-600">Saldo do Período</p>
                  <p className="text-lg font-semibold text-blue-600">
                    R$ {selectedDayTotals.result.toLocaleString()}
                  </p>
                  {!selectedDate && (
                    <div className="flex items-center mt-1">
                      <p className="text-xs text-gray-500 mr-2">
                        Ontem: R$ {yesterdayTotals.result.toLocaleString()}
                      </p>
                      {getComparisonIndicator(currentTotals.result, yesterdayTotals.result)}
                    </div>
                  )}
                </div>
              </div>

              <CashFlowChart period="7" />
            </>
          )}
        </Card>
      </div>

      <ExpensesTable />

      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Despesas</h3>
        <div className="h-[300px]">
          <ExpensesDistributionChart />
        </div>
      </Card>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {selectedDate ? 
                `Detalhamento do dia ${format(new Date(selectedDate), "dd/MM/yyyy")}` : 
                "Detalhamento do dia atual"
              }
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <PaymentMethodDetails 
              data={selectedDate ? calculateTotals(selectedDate).paymentMethods : currentTotals.paymentMethods} 
              period={selectedDate || "day"} 
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
