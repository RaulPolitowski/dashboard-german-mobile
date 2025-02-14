
import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useMemo } from "react";
import { calculateTotals } from "../charts/CashFlowChart";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

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

const generateChartData = (period: string) => {
  let data = [];
  const totals = calculateTotals(period);
  
  switch (period) {
    case "today":
      // Dados horários para hoje
      data = [
        { time: "08:00", receitas: 1200, despesas: 800 },
        { time: "10:00", receitas: 2500, despesas: 1500 },
        { time: "12:00", receitas: 3800, despesas: 2200 },
        { time: "14:00", receitas: 5200, despesas: 3100 },
        { time: "16:00", receitas: 6500, despesas: 3800 },
        { time: "18:00", receitas: totals.revenue, despesas: totals.expenses }
      ];
      break;
    case "yesterday":
      // Dados horários para ontem
      data = [
        { time: "08:00", receitas: 1000, despesas: 600 },
        { time: "10:00", receitas: 2200, despesas: 1300 },
        { time: "12:00", receitas: 3500, despesas: 2000 },
        { time: "14:00", receitas: 4800, despesas: 2800 },
        { time: "16:00", receitas: 6000, despesas: 3500 },
        { time: "18:00", receitas: totals.revenue, despesas: totals.expenses }
      ];
      break;
    case "last7":
      // Dados diários para últimos 7 dias
      data = [
        { time: "Seg", receitas: 15000, despesas: 12000 },
        { time: "Ter", receitas: 14000, despesas: 11000 },
        { time: "Qua", receitas: 16000, despesas: 13000 },
        { time: "Qui", receitas: 15500, despesas: 12500 },
        { time: "Sex", receitas: 17000, despesas: 14000 },
        { time: "Sáb", receitas: 12000, despesas: 9000 },
        { time: "Dom", receitas: 8000, despesas: 5000 }
      ];
      break;
    case "currentMonth":
      // Dados semanais para mês atual
      data = [
        { time: "Semana 1", receitas: 58000, despesas: 52000 },
        { time: "Semana 2", receitas: 62000, despesas: 55000 },
        { time: "Semana 3", receitas: 65000, despesas: 58000 },
        { time: "Semana 4", receitas: 68000, despesas: 62000 }
      ];
      break;
    default:
      data = [];
  }
  
  return data;
};

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

  const chartData = useMemo(() => generateChartData(selectedPeriod), [selectedPeriod]);

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
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$ ${(value / 1000)}k`}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-white p-2 shadow-sm">
                            <div className="grid gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Receitas
                                </span>
                                <span className="font-bold text-emerald-500">
                                  R$ {payload[0].value.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Despesas
                                </span>
                                <span className="font-bold text-rose-500">
                                  R$ {payload[1].value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="receitas" 
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                    name="Receitas"
                  />
                  <Bar 
                    dataKey="despesas" 
                    fill="#F43F5E" 
                    radius={[4, 4, 0, 0]}
                    name="Despesas"
                  />
                </BarChart>
              </ResponsiveContainer>
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
