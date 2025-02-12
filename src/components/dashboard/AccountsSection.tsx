import { AlertTriangle, Clock, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";
import { useState } from "react";
import { OverdueDetailsDialog } from "./OverdueDetailsDialog";
import { DueTodayCard } from "./DueTodayCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const dateRange = `${format(firstDayOfMonth, "dd/MM/yyyy")} até ${format(lastDayOfMonth, "dd/MM/yyyy")}`;

  const getCardStyle = (baseColor: string) => {
    const baseClasses = "p-4 hover:shadow-lg transition-all";
    
    if (cardStyle === "solid") {
      return `${baseClasses} ${baseColor} text-white`;
    }
    
    const gradientMap = {
      "bg-emerald-500": "bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30",
      "bg-rose-500": "bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30",
      "bg-blue-500": "bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30",
      "bg-amber-500": "bg-gradient-to-br from-amber-50 via-amber-100/40 to-amber-50/30"
    };
    
    return `${baseClasses} ${gradientMap[baseColor as keyof typeof gradientMap]} border border-${baseColor.replace('bg-', '')}/20 dark:${baseColor} dark:text-white`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Contas e Previsões</h3>

      <DueTodayCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardStyle("bg-emerald-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Contas a Receber</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-white"}`}>R$ 45.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                Período: {dateRange}
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-emerald-100/70 dark:bg-white/20"}`}>
              <CreditCard className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-rose-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Contas a Pagar</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-white"}`}>R$ 38.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                Período: {dateRange}
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100/70 dark:bg-white/20"}`}>
              <Clock className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-blue-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Saldo Previsto</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-white"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                Período: {dateRange}
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-blue-100/70 dark:bg-white/20"}`}>
              <PiggyBank className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-white"}`} />
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
