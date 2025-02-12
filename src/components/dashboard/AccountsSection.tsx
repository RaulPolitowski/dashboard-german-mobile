
import { Clock, CreditCard, PiggyBank } from "lucide-react";
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

  const totalOverdueReceivables = overdueReceivables.reduce((sum, item) => sum + item.value, 0);
  const totalOverduePayables = overduePayables.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Contas e Previsões</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card
          className="p-4 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-red-50 to-white border border-red-200"
          onClick={() => setShowReceivablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1 text-red-600">Contas a Receber em Atraso</p>
              <p className="text-2xl font-bold text-red-700">
                R$ {totalOverdueReceivables.toLocaleString()}
              </p>
              <p className="text-xs mt-1 text-red-500">
                {overdueReceivables.length} faturas em atraso
              </p>
            </div>
            <div className="p-3 rounded-full bg-red-100">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card
          className="p-4 cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br from-amber-50 to-white border border-amber-200"
          onClick={() => setShowPayablesDialog(true)}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1 text-amber-600">Contas a Pagar em Atraso</p>
              <p className="text-2xl font-bold text-amber-700">
                R$ {totalOverduePayables.toLocaleString()}
              </p>
              <p className="text-xs mt-1 text-amber-500">
                {overduePayables.length} faturas em atraso
              </p>
            </div>
            <div className="p-3 rounded-full bg-amber-100">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      <DueTodayCard />

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border border-[#6366F1]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1 text-gray-600 dark:text-white">Contas a Receber</p>
                <p className="text-2xl font-bold text-[#6366F1] dark:text-white">R$ 45.000,00</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-white/90">
                  Período: {dateRange}
                </p>
              </div>
              <div className="p-3 rounded-full bg-[#6366F1]/10 dark:bg-white/20">
                <CreditCard className="w-6 h-6 text-[#6366F1] dark:text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border border-[#6366F1]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1 text-gray-600 dark:text-white">Contas a Pagar</p>
                <p className="text-2xl font-bold text-[#6366F1] dark:text-white">R$ 38.000,00</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-white/90">
                  Período: {dateRange}
                </p>
              </div>
              <div className="p-3 rounded-full bg-[#6366F1]/10 dark:bg-white/20">
                <Clock className="w-6 h-6 text-[#6366F1] dark:text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border border-[#6366F1]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium mb-1 text-gray-600 dark:text-white">Saldo Previsto</p>
                <p className="text-2xl font-bold text-[#6366F1] dark:text-white">R$ 7.000,00</p>
                <p className="text-xs mt-1 text-gray-500 dark:text-white/90">
                  Período: {dateRange}
                </p>
              </div>
              <div className="p-3 rounded-full bg-[#6366F1]/10 dark:bg-white/20">
                <PiggyBank className="w-6 h-6 text-[#6366F1] dark:text-white" />
              </div>
            </div>
          </Card>
        </div>
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
