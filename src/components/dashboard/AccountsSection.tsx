
import { Clock, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { DueTodayCard } from "./DueTodayCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

const overdueReceivables = [
  { id: "1", date: "2024-02-10", value: 3500, entity: "Cliente A", description: "Fatura 001", seller: "João Silva" },
  { id: "2", date: "2024-02-12", value: 4200, entity: "Cliente B", description: "Fatura 002", seller: "Maria Santos" },
];

const overduePayables = [
  { id: "1", date: "2024-02-15", value: 2800, entity: "Fornecedor X", description: "NF 123", seller: "João Silva" },
  { id: "2", date: "2024-02-18", value: 3100, entity: "Fornecedor Y", description: "NF 124", seller: "Maria Santos" },
];

export const AccountsSection = () => {
  const { cardStyle } = useCardStyle();
  const [showReceivablesDialog, setShowReceivablesDialog] = useState(false);
  const [showPayablesDialog, setShowPayablesDialog] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  const dateRange = `${format(firstDayOfMonth, "dd/MM/yyyy")} até ${format(lastDayOfMonth, "dd/MM/yyyy")}`;

  const totalOverdueReceivables = overdueReceivables.reduce((sum, item) => sum + item.value, 0);
  const totalOverduePayables = overduePayables.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-6">
      <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Contas e Previsões</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={`p-4 cursor-pointer hover:shadow-lg transition-all ${
                  isDarkMode 
                    ? 'bg-[#581c87] text-white border-purple-900' 
                    : 'bg-gradient-to-br from-rose-50 to-white border border-rose-200'
                }`}
                onClick={() => setShowReceivablesDialog(true)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-white/90' : 'text-rose-600'
                    }`}>
                      Contas a Receber em Atraso
                    </p>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-rose-700'
                    }`}>
                      R$ {totalOverdueReceivables.toLocaleString()}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-white/70' : 'text-rose-500'
                    }`}>
                      {overdueReceivables.length} faturas em atraso
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    isDarkMode ? 'bg-purple-800/50' : 'bg-rose-100'
                  }`}>
                    <Clock className={`w-6 h-6 ${
                      isDarkMode ? 'text-white' : 'text-rose-600'
                    }`} />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clique para ver detalhes das contas a receber em atraso</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Card
                className={`p-4 cursor-pointer hover:shadow-lg transition-all ${
                  isDarkMode 
                    ? 'bg-[#7c2d12] text-white border-amber-900' 
                    : 'bg-gradient-to-br from-amber-50 to-white border border-amber-200'
                }`}
                onClick={() => setShowPayablesDialog(true)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium mb-1 ${
                      isDarkMode ? 'text-white/90' : 'text-amber-600'
                    }`}>
                      Contas a Pagar em Atraso
                    </p>
                    <p className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-amber-700'
                    }`}>
                      R$ {totalOverduePayables.toLocaleString()}
                    </p>
                    <p className={`text-xs mt-1 ${
                      isDarkMode ? 'text-white/70' : 'text-amber-500'
                    }`}>
                      {overduePayables.length} faturas em atraso
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    isDarkMode ? 'bg-amber-800/50' : 'bg-amber-100'
                  }`}>
                    <Clock className={`w-6 h-6 ${
                      isDarkMode ? 'text-white' : 'text-amber-600'
                    }`} />
                  </div>
                </div>
              </Card>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clique para ver detalhes das contas a pagar em atraso</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <DueTodayCard />

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className={`p-4 hover:shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#1e293b] text-white border-[#334155]' 
              : 'bg-gradient-to-br from-indigo-50 to-white border border-indigo-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-white/90' : 'text-indigo-600'
                }`}>
                  Contas a Receber
                </p>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-indigo-700'
                }`}>
                  R$ 45.000,00
                </p>
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-white/70' : 'text-indigo-500'
                }`}>
                  Período: {dateRange}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-[#334155]' : 'bg-indigo-100'
              }`}>
                <CreditCard className={`w-6 h-6 ${
                  isDarkMode ? 'text-white' : 'text-indigo-600'
                }`} />
              </div>
            </div>
          </Card>

          <Card className={`p-4 hover:shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#1e293b] text-white border-[#334155]' 
              : 'bg-gradient-to-br from-blue-50 to-white border border-blue-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-white/90' : 'text-blue-600'
                }`}>
                  Contas a Pagar
                </p>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-blue-700'
                }`}>
                  R$ 38.000,00
                </p>
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-white/70' : 'text-blue-500'
                }`}>
                  Período: {dateRange}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-[#334155]' : 'bg-blue-100'
              }`}>
                <Clock className={`w-6 h-6 ${
                  isDarkMode ? 'text-white' : 'text-blue-600'
                }`} />
              </div>
            </div>
          </Card>

          <Card className={`p-4 hover:shadow-lg transition-all ${
            isDarkMode 
              ? 'bg-[#1e293b] text-white border-[#334155]' 
              : 'bg-gradient-to-br from-emerald-50 to-white border border-emerald-200'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-white/90' : 'text-emerald-600'
                }`}>
                  Saldo Previsto
                </p>
                <p className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-emerald-700'
                }`}>
                  R$ 7.000,00
                </p>
                <p className={`text-xs mt-1 ${
                  isDarkMode ? 'text-white/70' : 'text-emerald-500'
                }`}>
                  Período: {dateRange}
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                isDarkMode ? 'bg-[#334155]' : 'bg-emerald-100'
              }`}>
                <PiggyBank className={`w-6 h-6 ${
                  isDarkMode ? 'text-white' : 'text-emerald-600'
                }`} />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Dialog para Contas a Receber em Atraso */}
      <Dialog open={showReceivablesDialog} onOpenChange={setShowReceivablesDialog}>
        <DialogContent className={`max-w-2xl p-0 overflow-hidden ${
          isDarkMode ? 'bg-[#151b2b] border-[#2d3748]' : 'bg-white'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className={`text-xl font-bold ${
                isDarkMode ? 'text-[#10b981]' : 'text-rose-600'
              }`}>
                Contas a Receber em Atraso
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowReceivablesDialog(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {overdueReceivables.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-[#1e2433] border-[#2d3748]' 
                      : 'bg-rose-50 border-rose-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-base font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.entity}
                      </h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      } mt-1`}>
                        Vencimento: {item.date}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#10b981]' : 'text-rose-600'
                    }`}>
                      R$ {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog para Contas a Pagar em Atraso */}
      <Dialog open={showPayablesDialog} onOpenChange={setShowPayablesDialog}>
        <DialogContent className={`max-w-2xl p-0 overflow-hidden ${
          isDarkMode ? 'bg-[#151b2b] border-[#2d3748]' : 'bg-white'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <DialogTitle className={`text-xl font-bold ${
                isDarkMode ? 'text-[#ef4444]' : 'text-amber-600'
              }`}>
                Contas a Pagar em Atraso
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowPayablesDialog(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {overduePayables.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-[#1e2433] border-[#2d3748]' 
                      : 'bg-amber-50 border-amber-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-base font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.entity}
                      </h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      } mt-1`}>
                        Vencimento: {item.date}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${
                      isDarkMode ? 'text-[#ef4444]' : 'text-amber-600'
                    }`}>
                      R$ {item.value.toLocaleString()}
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
