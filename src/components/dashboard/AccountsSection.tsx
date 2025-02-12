
import { AlertTriangle, Clock, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";
import { useState } from "react";
import { OverdueDetailsDialog } from "./OverdueDetailsDialog";

const overdueReceivables = [
  { id: "1", date: "2024-02-10", value: 3500, entity: "Cliente A", description: "Fatura 001" },
  { id: "2", date: "2024-02-12", value: 4200, entity: "Cliente B", description: "Fatura 002" },
];

const overduePayables = [
  { id: "1", date: "2024-02-15", value: 2800, entity: "Fornecedor X", description: "NF 123" },
  { id: "2", date: "2024-02-18", value: 3100, entity: "Fornecedor Y", description: "NF 124" },
];

export const AccountsSection = () => {
  const { cardStyle } = useCardStyle();
  const [showReceivablesDialog, setShowReceivablesDialog] = useState(false);
  const [showPayablesDialog, setShowPayablesDialog] = useState(false);

  const getCardClassName = (baseColor: string) => {
    const baseClasses = "p-4 hover:shadow-lg transition-all cursor-pointer";
    const darkClasses = `dark:bg-${baseColor} dark:border-0`;
    
    if (cardStyle === "solid") {
      return `${baseClasses} bg-${baseColor} text-white ${darkClasses}`;
    }
    return `${baseClasses} bg-white dark:bg-gray-800 bg-gradient-to-br from-${baseColor}/20 via-${baseColor}/10 to-transparent border border-${baseColor}/30`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Contas e Previsões</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardClassName("emerald-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Contas a Receber</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`}>R$ 45.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>Próximos 30 dias</p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full"}>
              <CreditCard className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-emerald-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("rose-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Contas a Pagar</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-rose-400"}`}>R$ 38.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>Próximos 30 dias</p>
            </div>
            <div className={`${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100 dark:bg-rose-900/30"} p-3 rounded-full`}>
              <Clock className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-rose-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("blue-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Saldo Previsto</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>Final do mês</p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full"}>
              <PiggyBank className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-blue-400"}`} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Card 
          className={getCardClassName("amber-500")}
          onClick={() => setShowReceivablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Recebimentos em Atraso</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-amber-600 dark:text-amber-400"}`}>R$ 12.500,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>8 títulos pendentes</p>
            </div>
            <div className={`${cardStyle === "solid" ? "bg-white/20" : "bg-amber-100 dark:bg-amber-900/30"} p-3 rounded-full`}>
              <AlertTriangle className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-amber-500 dark:text-amber-400"}`} />
            </div>
          </div>
        </Card>

        <Card 
          className={getCardClassName("rose-500")}
          onClick={() => setShowPayablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Pagamentos em Atraso</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-rose-400"}`}>R$ 8.300,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>5 títulos pendentes</p>
            </div>
            <div className={`${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100 dark:bg-rose-900/30"} p-3 rounded-full`}>
              <AlertTriangle className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-rose-400"}`} />
            </div>
          </div>
        </Card>
      </div>

      <OverdueDetailsDialog
        isOpen={showReceivablesDialog}
        onClose={() => setShowReceivablesDialog(false)}
        type="receivable"
        items={overdueReceivables}
      />

      <OverdueDetailsDialog
        isOpen={showPayablesDialog}
        onClose={() => setShowPayablesDialog(false)}
        type="payable"
        items={overduePayables}
      />
    </div>
  );
};
