
import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesTable } from "./ExpensesTable";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { calculateTotals } from "../charts/CashFlowChart";
import { PaymentMethodDetails } from "../charts/PaymentMethodDetails";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const FinancialCharts = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");
  
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

  const formatSelectedDateFull = (date: string | null) => {
    if (!date) return "Hoje";
    try {
      const parsedDate = parseISO(date);
      const weekDay = format(parsedDate, "EEEE", { locale: ptBR });
      const capitalizedWeekDay = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
      const formattedDate = format(parsedDate, "dd/MM/yyyy");
      return `${capitalizedWeekDay}, ${formattedDate}`;
    } catch (e) {
      console.error("Erro ao formatar data:", e);
      return "Hoje";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          {isMinimized ? (
            <div 
              className="cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Fluxo de Caixa - Prévia do Dia
                </h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">
                    Fluxo de Caixa - Prévia do Dia
                  </h3>
                  <p className="text-sm text-gray-600">
                    Movimentação Financeira: R$ {currentTotals.result.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="today">Hoje</SelectItem>
                        <SelectItem value="yesterday">Ontem</SelectItem>
                        <SelectItem value="last7">Últimos 7 dias</SelectItem>
                        <SelectItem value="currentMonth">Mês Atual</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ChartBar 
                    className="w-4 h-4 md:w-5 md:h-5 text-gray-500 cursor-pointer"
                    onClick={() => {
                      setSelectedDate(null);
                      setShowDetails(true);
                    }}
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
                <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30 border border-emerald-100">
                  <p className="text-sm text-gray-600">Entradas de Hoje</p>
                  <p className="text-xl font-semibold text-emerald-600 mt-1">
                    R$ {currentTotals.revenue.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-xs text-gray-500 mr-2">
                      Ontem: R$ {yesterdayTotals.revenue.toLocaleString()}
                    </p>
                    {getComparisonIndicator(currentTotals.revenue, yesterdayTotals.revenue)}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30 border border-rose-100">
                  <p className="text-sm text-gray-600">Saídas de Hoje</p>
                  <p className="text-xl font-semibold text-rose-600 mt-1">
                    R$ {currentTotals.expenses.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-xs text-gray-500 mr-2">
                      Ontem: R$ {yesterdayTotals.expenses.toLocaleString()}
                    </p>
                    {getComparisonIndicator(currentTotals.expenses, yesterdayTotals.expenses)}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30 border border-blue-100">
                  <p className="text-sm text-gray-600">Saldo de Hoje</p>
                  <p className="text-xl font-semibold text-blue-600 mt-1">
                    R$ {currentTotals.result.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <p className="text-xs text-gray-500 mr-2">
                      Ontem: R$ {yesterdayTotals.result.toLocaleString()}
                    </p>
                    {getComparisonIndicator(currentTotals.result, yesterdayTotals.result)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Histórico dos últimos 7 dias</p>
                <CashFlowChart period={selectedPeriod} />
              </div>
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
            <DialogTitle className="text-xl">
              Detalhamento Financeiro - {formatSelectedDateFull(selectedDate)}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <PaymentMethodDetails 
              data={selectedDayTotals.paymentMethods}
              period={selectedDate || selectedPeriod}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
