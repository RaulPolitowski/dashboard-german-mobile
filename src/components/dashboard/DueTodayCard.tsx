
import { useState } from 'react';
import { Card } from "../ui/card";
import { ArrowUp, ArrowDown, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

const dueTodayData = {
  receivables: [
    { id: 1, description: "Fatura #1234", value: 5000, dueDate: "2024-03-20", type: "receivable" },
    { id: 2, description: "Fatura #1235", value: 3500, dueDate: "2024-03-20", type: "receivable" },
  ],
  payables: [
    { id: 3, description: "Fornecedor ABC", value: 4200, dueDate: "2024-03-20", type: "payable" },
    { id: 4, description: "Serviço XYZ", value: 1800, dueDate: "2024-03-20", type: "payable" },
  ]
};

export const DueTodayCard = () => {
  const [showDetails, setShowDetails] = useState(false);

  const totalReceivables = dueTodayData.receivables.reduce((sum, item) => sum + item.value, 0);
  const totalPayables = dueTodayData.payables.reduce((sum, item) => sum + item.value, 0);
  const balance = totalReceivables - totalPayables;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-all bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border border-[#6366F1]/20"
            onClick={() => setShowDetails(true)}
          >
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
                Vencimentos Hoje
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-3 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">A Receber</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      R$ {totalReceivables.toLocaleString()}
                    </p>
                  </div>
                  <ArrowUp className="w-5 h-5 text-emerald-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-rose-500/10 dark:bg-rose-500/20 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">A Pagar</p>
                    <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
                      R$ {totalPayables.toLocaleString()}
                    </p>
                  </div>
                  <ArrowDown className="w-5 h-5 text-rose-500" />
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Saldo</p>
                    <p className={`text-lg font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      R$ {balance.toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-blue-500" />
                </div>
              </div>
            </div>
          </Card>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="center"
          className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
        >
          <p>Clique para ver detalhes dos vencimentos de hoje</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhamento de Vencimentos - Hoje</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-emerald-600 mb-2">A Receber</h4>
              <div className="space-y-2">
                {dueTodayData.receivables.map((item) => (
                  <div key={item.id} className="p-3 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.description}</span>
                      <span className="text-emerald-600">R$ {item.value.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-gray-500">Vencimento: {new Date(item.dueDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-rose-600 mb-2">A Pagar</h4>
              <div className="space-y-2">
                {dueTodayData.payables.map((item) => (
                  <div key={item.id} className="p-3 bg-rose-50/50 dark:bg-rose-950/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.description}</span>
                      <span className="text-rose-600">R$ {item.value.toLocaleString()}</span>
                    </div>
                    <span className="text-sm text-gray-500">Vencimento: {new Date(item.dueDate).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
