
import { ChartBar, ChevronDown, ChevronUp, TrendingDown, TrendingUp, X } from "lucide-react";
import { Card } from "../ui/card";
import { ExpensesTable } from "./expenses/ExpensesTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState, useMemo } from "react";
import { calculateTotals } from "../charts/CashFlowChart";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";

interface Transaction {
  id: string;
  date: string;
  description: string;
  value: number;
  type: 'inflow' | 'outflow';
}

export const FinancialCharts = () => {
  const [showTransactions, setShowTransactions] = useState(false);
  const [selectedTransactionType, setSelectedTransactionType] = useState<'inflow' | 'outflow' | null>(null);

  const transactions: Transaction[] = [
    { id: '1', date: '2024-02-20', description: 'Venda Produto A', value: 1500, type: 'inflow' as const },
    { id: '2', date: '2024-02-19', description: 'Pagamento Fornecedor', value: 800, type: 'outflow' as const },
    { id: '3', date: '2024-02-18', description: 'Venda Serviço B', value: 2000, type: 'inflow' as const },
    { id: '4', date: '2024-02-17', description: 'Despesas Operacionais', value: 600, type: 'outflow' as const },
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totals = calculateTotals("year");
  const inflow = totals.revenue;
  const outflow = totals.expenses;

  const handleCardClick = (type: 'inflow' | 'outflow') => {
    setSelectedTransactionType(type);
    setShowTransactions(true);
  };

  const filteredTransactions = useMemo(() => {
    if (!selectedTransactionType) return transactions;
    return transactions.filter(t => t.type === selectedTransactionType);
  }, [selectedTransactionType]);

  const total = filteredTransactions.reduce((sum, t) => sum + t.value, 0);

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Fluxo de Caixa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleCardClick('inflow')}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-emerald-700">Entradas</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-600 mt-2">
                  R$ {inflow?.toLocaleString() ?? 0}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ChevronUp className="h-4 w-4 text-emerald-500" />
                  <p className="text-sm text-emerald-600">12% vs mês anterior</p>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => handleCardClick('outflow')}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-rose-500" />
                  <h3 className="font-semibold text-rose-700">Saídas</h3>
                </div>
                <p className="text-2xl font-bold text-rose-600 mt-2">
                  R$ {outflow?.toLocaleString() ?? 0}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <ChevronDown className="h-4 w-4 text-rose-500" />
                  <p className="text-sm text-rose-600">8% vs mês anterior</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Despesas</h3>
          <ExpensesDistributionChart />
        </Card>
        <ExpensesTable />
      </div>

      <Dialog open={showTransactions} onOpenChange={setShowTransactions}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden bg-white dark:bg-gray-900">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className={`text-xl font-bold ${
                selectedTransactionType === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
              }`}>
                {selectedTransactionType === 'inflow' ? 'Entradas' : 'Saídas'}
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowTransactions(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className={`mb-4 p-4 rounded-lg border ${
              selectedTransactionType === 'inflow' 
                ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                : 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800'
            }`}>
              <div className="flex justify-between items-center">
                <p className={`text-sm font-medium ${
                  selectedTransactionType === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
                }`}>Total</p>
                <p className={`text-lg font-bold ${
                  selectedTransactionType === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  R$ {total.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {filteredTransactions.map((transaction) => (
                <div 
                  key={transaction.id} 
                  className="p-4 bg-gray-50 rounded-lg border border-gray-100 dark:bg-gray-800/50 dark:border-gray-700"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                        {transaction.description}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(parseISO(transaction.date), "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${
                      transaction.type === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      R$ {transaction.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
