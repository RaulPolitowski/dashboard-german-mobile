
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

  const getCardStyle = (baseColor: string, startColor: string, endColor: string) => {
    const baseClasses = "p-4 hover:shadow-lg transition-all";
    
    if (cardStyle === "solid") {
      return `${baseClasses} ${baseColor} text-white`;
    }
    
    return `${baseClasses} bg-gradient-to-br from-${startColor} via-${baseColor}/10 to-${endColor} border border-${baseColor}/20 dark:${baseColor} dark:text-white`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Contas e Previsões</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardStyle("bg-emerald-500", "emerald-50", "emerald-100/50")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Contas a Receber</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-white"}`}>R$ 45.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>Próximos 30 dias</p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-emerald-100 dark:bg-white/20"}`}>
              <CreditCard className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-rose-500", "rose-50", "rose-100/50")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Contas a Pagar</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-white"}`}>R$ 38.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>Próximos 30 dias</p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100 dark:bg-white/20"}`}>
              <Clock className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-blue-500", "blue-50", "blue-100/50")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Saldo Previsto</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-white"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>Final do mês</p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-blue-100 dark:bg-white/20"}`}>
              <PiggyBank className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Card 
          className={`cursor-pointer ${getCardStyle("bg-amber-500", "amber-50", "amber-100/50")}`}
          onClick={() => setShowReceivablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Recebimentos em Atraso</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-amber-600 dark:text-white"}`}>R$ 12.500,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>8 títulos pendentes</p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-amber-100 dark:bg-white/20"}`}>
              <AlertTriangle className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-amber-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card 
          className={`cursor-pointer ${getCardStyle("bg-rose-500", "rose-50", "rose-100/50")}`}
          onClick={() => setShowPayablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Pagamentos em Atraso</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-white"}`}>R$ 8.300,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>5 títulos pendentes</p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100 dark:bg-white/20"}`}>
              <AlertTriangle className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-white"}`} />
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
