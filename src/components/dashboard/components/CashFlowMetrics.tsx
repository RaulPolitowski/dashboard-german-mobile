
import { ChartBar, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useState } from "react";
import { Transaction } from "../types/financial";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "@/hooks/use-theme";

interface CashFlowMetricsProps {
  inflow: number;
  outflow: number;
  result: number;
  transactions: Transaction[];
}

export const CashFlowMetrics = ({ inflow, outflow, result, transactions }: CashFlowMetricsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#10b981] text-white border-[#059669]'
              : 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 hover:bg-emerald-50'
          }`}
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-emerald-500'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-emerald-700'}`}>Entradas</h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-emerald-600'} mt-2`}>
            R$ {inflow.toLocaleString()}
          </p>
        </Card>

        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#ef4444] text-white border-[#dc2626]'
              : 'bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 hover:bg-rose-50'
          }`}
          onClick={() => setIsDialogOpen(true)}
        >
          <div className="flex items-center gap-2">
            <TrendingDown className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-rose-500'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-rose-700'}`}>Saídas</h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-rose-600'} mt-2`}>
            R$ {outflow.toLocaleString()}
          </p>
        </Card>

        <Card 
          className={`p-4 ${
            isDarkMode 
              ? 'bg-[#3b82f6] text-white border-[#2563eb]'
              : 'bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <ChartBar className={`h-5 w-5 ${isDarkMode ? 'text-white' : 'text-blue-500'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>Resultado</h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'} mt-2`}>
            R$ {result.toLocaleString()}
          </p>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`max-w-2xl ${isDarkMode ? 'bg-[#151b2b] border-[#2d3748]' : ''}`}>
          <DialogHeader>
            <DialogTitle className={isDarkMode ? 'text-gray-200' : ''}>Movimentações</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  isDarkMode ? 'bg-[#1e2433]' : 'bg-gray-50'
                }`}
              >
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-gray-200' : ''}`}>{transaction.description}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {format(new Date(transaction.date), "dd 'de' MMMM 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <p className={`font-bold ${
                  transaction.type === "inflow" 
                    ? (isDarkMode ? 'text-[#10b981]' : 'text-emerald-600') 
                    : (isDarkMode ? 'text-[#ef4444]' : 'text-rose-600')
                }`}>
                  R$ {transaction.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
