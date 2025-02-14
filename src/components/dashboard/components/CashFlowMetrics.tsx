
import { ChartBar, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
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

interface CashFlowMetricsProps {
  inflow: number;
  outflow: number;
  result: number;
  transactions: Transaction[];
}

export const CashFlowMetrics = ({ inflow, outflow, result, transactions }: CashFlowMetricsProps) => {
  const [selectedType, setSelectedType] = useState<"inflow" | "outflow" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCardClick = (type: "inflow" | "outflow") => {
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  const filteredTransactions = transactions.filter(t => t.type === selectedType);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200 cursor-pointer hover:bg-emerald-50 transition-colors"
          onClick={() => handleCardClick("inflow")}
        >
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <h3 className="font-semibold text-emerald-700">Entradas</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-600 mt-2">
            R$ {inflow.toLocaleString()}
          </p>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:bg-rose-50 transition-colors"
          onClick={() => handleCardClick("outflow")}
        >
          <div className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-rose-500" />
            <h3 className="font-semibold text-rose-700">Saídas</h3>
          </div>
          <p className="text-2xl font-bold text-rose-600 mt-2">
            R$ {outflow.toLocaleString()}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-200">
          <div className="flex items-center gap-2">
            <ChartBar className="h-5 w-5 text-blue-500" />
            <h3 className="font-semibold text-blue-700">Resultado</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            R$ {result.toLocaleString()}
          </p>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedType === "inflow" ? "Entradas" : "Saídas"} Detalhadas
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(transaction.date), "dd 'de' MMMM 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <p className={`font-bold ${transaction.type === "inflow" ? "text-emerald-600" : "text-rose-600"}`}>
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
