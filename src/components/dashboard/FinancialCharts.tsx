import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useMemo } from "react";
import { calculateTotals } from "../charts/CashFlowChart";
import { PaymentMethodDetails } from "../charts/PaymentMethodDetails";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface TransactionDetail {
  time: string;
  description: string;
  value: number;
  type: "entrada" | "saída";
  method: string;
}

const mockTransactions: TransactionDetail[] = [
  { 
    time: "09:30", 
    description: "Venda #1234",
    value: 1500,
    type: "entrada",
    method: "Cartão de Crédito"
  },
  { 
    time: "10:15", 
    description: "Pagamento Fornecedor",
    value: 3000,
    type: "saída",
    method: "Transferência"
  },
  // Adicione mais transações mock aqui
];

export const FinancialCharts = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");
  
  const totals = useMemo(() => calculateTotals(selectedPeriod), [selectedPeriod]);
  const previousTotals = useMemo(() => {
    switch (selectedPeriod) {
      case "today":
        return calculateTotals("yesterday");
      case "yesterday":
        return calculateTotals("2_days_ago");
      case "last7":
        return calculateTotals("previous_7");
      case "currentMonth":
        return calculateTotals("previous_month");
      default:
        return calculateTotals("yesterday");
    }
  }, [selectedPeriod]);

  const periodLabel = useMemo(() => {
    switch (selectedPeriod) {
      case "today":
        return "Hoje";
      case "yesterday":
        return "Ontem";
      case "last7":
        return "Últimos 7 dias";
      case "currentMonth":
        return "Mês Atual";
      default:
        return "Hoje";
    }
  }, [selectedPeriod]);

  const getComparisonIndicator = (current: number, previous: number) => {
    const diff = current - previous;
    const percentage = previous !== 0 ? (diff / previous) * 100 : 0;
    
    if (diff > 0) {
      return (
        <div className="flex items-center text-emerald-600 text-sm">
          <TrendingUp className="w-4 h-4 mr-1" />
          +{Math.abs(percentage).toFixed(1)}%
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

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        {isMinimized ? (
          <div 
            className="cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Fluxo de Caixa - {periodLabel}
              </h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                  Fluxo de Caixa - {periodLabel}
                </h3>
                <p className="text-sm text-gray-600">
                  Movimentação Financeira: R$ {totals.result.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[180px] bg-white">
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
                <button 
                  onClick={() => setShowTransactions(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ChartBar className="w-5 h-5 text-gray-500" />
                </button>
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
                <p className="text-sm text-gray-600">Entradas</p>
                <p className="text-xl font-semibold text-emerald-600 mt-1">
                  R$ {totals.revenue.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <p className="text-xs text-gray-500 mr-2">
                    Anterior: R$ {previousTotals.revenue.toLocaleString()}
                  </p>
                  {getComparisonIndicator(totals.revenue, previousTotals.revenue)}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30 border border-rose-100">
                <p className="text-sm text-gray-600">Saídas</p>
                <p className="text-xl font-semibold text-rose-600 mt-1">
                  R$ {totals.expenses.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <p className="text-xs text-gray-500 mr-2">
                    Anterior: R$ {previousTotals.expenses.toLocaleString()}
                  </p>
                  {getComparisonIndicator(totals.expenses, previousTotals.expenses)}
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30 border border-blue-100">
                <p className="text-sm text-gray-600">Saldo</p>
                <p className="text-xl font-semibold text-blue-600 mt-1">
                  R$ {totals.result.toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <p className="text-xs text-gray-500 mr-2">
                    Anterior: R$ {previousTotals.result.toLocaleString()}
                  </p>
                  {getComparisonIndicator(totals.result, previousTotals.result)}
                </div>
              </div>
            </div>

            <div className="h-[300px] mt-4">
              <CashFlowChart period={selectedPeriod} />
            </div>
          </>
        )}
      </Card>

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Movimentações - {periodLabel}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions
                  .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
                  .map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.time}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        <span className={transaction.type === "entrada" ? "text-emerald-600" : "text-rose-600"}>
                          {transaction.type === "entrada" ? "Entrada" : "Saída"}
                        </span>
                      </TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell className="text-right">
                        <span className={transaction.type === "entrada" ? "text-emerald-600" : "text-rose-600"}>
                          R$ {transaction.value.toLocaleString()}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
