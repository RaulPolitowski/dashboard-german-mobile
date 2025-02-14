
import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
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
  const [showDetails, setShowDetails] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<"entrada" | "saída" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<string>("today");
  
  const currentTotals = calculateTotals("day");
  const yesterdayTotals = calculateTotals("yesterday");
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

  const filteredTransactions = mockTransactions.filter(
    transaction => !selectedTransactionType || transaction.type === selectedTransactionType
  );

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
                <div 
                  className="p-4 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30 border border-emerald-100 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setSelectedTransactionType("entrada");
                    setShowTransactions(true);
                  }}
                >
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
                <div 
                  className="p-4 rounded-lg bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30 border border-rose-100 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setSelectedTransactionType("saída");
                    setShowTransactions(true);
                  }}
                >
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
                <CashFlowChart period={selectedPeriod} />
              </div>
            </>
          )}
        </Card>
      </div>

      <ExpensesTable />

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

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedTransactionType === "entrada" ? "Entradas" : "Saídas"} de Hoje
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
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
