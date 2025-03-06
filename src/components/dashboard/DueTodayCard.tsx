
import { useState } from 'react';
import { Card } from "../ui/card";
import { ArrowUp, ArrowDown, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { useTheme } from "@/hooks/use-theme";

const dueTodayData = {
  receivables: [
    { id: 1, description: "Fatura #1234", value: 5000, dueDate: "2024-03-19", type: "receivable" },
    { id: 2, description: "Fatura #1235", value: 3500, dueDate: "2024-03-19", type: "receivable" },
  ],
  payables: [
    { id: 3, description: "Fornecedor ABC", value: 4200, dueDate: "2024-03-19", type: "payable" },
    { id: 4, description: "Serviço XYZ", value: 1800, dueDate: "2024-03-19", type: "payable" },
  ]
};

export const DueTodayCard = () => {
  const [showDetails, setShowDetails] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const totalReceivables = dueTodayData.receivables.reduce((sum, item) => sum + item.value, 0);
  const totalPayables = dueTodayData.payables.reduce((sum, item) => sum + item.value, 0);
  const balance = totalReceivables - totalPayables;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className={`p-4 cursor-pointer hover:shadow-md transition-all ${
              isDarkMode 
                ? 'bg-[#151b2b] border-[#2d3748]' 
                : 'bg-gradient-to-br from-white/80 to-white/50 border border-[#6366F1]/20'
            }`}
            onClick={() => setShowDetails(true)}
          >
            <div className="flex flex-col space-y-4">
              <h3 className={`text-lg font-semibold ${
                isDarkMode ? 'text-primary' : 'text-[#6366F1]'
              }`}>
                Vencimentos Hoje
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#065f46] text-white' 
                    : 'bg-emerald-500/10 dark:bg-emerald-500/20'
                }`}>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>
                      A Receber
                    </p>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      R$ {totalReceivables.toLocaleString()}
                    </p>
                  </div>
                  <ArrowUp className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-emerald-500'}`} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#9f1239] text-white' 
                    : 'bg-rose-500/10 dark:bg-rose-500/20'
                }`}>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>
                      A Pagar
                    </p>
                    <p className={`text-lg font-bold ${
                      isDarkMode ? 'text-white' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      R$ {totalPayables.toLocaleString()}
                    </p>
                  </div>
                  <ArrowDown className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-rose-500'}`} />
                </div>
                <div className={`flex items-center justify-between p-3 rounded-lg ${
                  isDarkMode 
                    ? 'bg-[#1e3a8a] text-white' 
                    : 'bg-blue-500/10 dark:bg-blue-500/20'
                }`}>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-white/80' : 'text-gray-600 dark:text-gray-300'}`}>
                      Saldo
                    </p>
                    <p className={`text-lg font-bold ${
                      isDarkMode 
                        ? 'text-white' 
                        : balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'
                    }`}>
                      R$ {balance.toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-blue-500'}`} />
                </div>
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent side="top" align="center">
          <p>Clique para ver detalhes dos vencimentos de hoje</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className={`max-w-2xl p-0 overflow-hidden ${isDarkMode ? 'bg-[#151b2b]' : 'bg-white'}`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <DialogTitle className={`text-2xl font-bold ${isDarkMode ? 'text-white' : ''}`}>
                Detalhamento de Vencimentos - Hoje
              </DialogTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setShowDetails(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-[#10b981]' : 'text-emerald-600'
                }`}>
                  A Receber
                </h3>
                <div className="space-y-4">
                  {dueTodayData.receivables.map((item) => (
                    <div 
                      key={item.id} 
                      className={`p-4 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-[#1e2433] border-[#2d3748]' 
                          : 'bg-emerald-50 border-emerald-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className={`text-lg font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.description}
                          </h4>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Vencimento: {item.dueDate}
                          </p>
                        </div>
                        <span className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#10b981]' : 'text-emerald-600'
                        }`}>
                          R$ {item.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-[#ef4444]' : 'text-rose-600'
                }`}>
                  A Pagar
                </h3>
                <div className="space-y-4">
                  {dueTodayData.payables.map((item) => (
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
                          <h4 className={`text-lg font-semibold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                          }`}>
                            {item.description}
                          </h4>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            Vencimento: {item.dueDate}
                          </p>
                        </div>
                        <span className={`text-lg font-bold ${
                          isDarkMode ? 'text-[#ef4444]' : 'text-rose-600'
                        }`}>
                          R$ {item.value.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
