import { useState } from "react";
import { Card } from "../../ui/card";
import { AlertTriangle, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

interface DueTodayBudget {
  id: string;
  client: string;
  value: number;
  description: string;
  seller: string;
}

const dueTodayBudgets: DueTodayBudget[] = [
  { id: "1", client: "Cliente X", value: 15000, description: "Projeto Mobile", seller: "João Silva" },
  { id: "2", client: "Cliente Y", value: 8500, description: "Consultoria", seller: "Maria Santos" },
];

export const DueTodayBudgets = () => {
  const [showDetails, setShowDetails] = useState(false);
  const total = dueTodayBudgets.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setShowDetails(true)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-rose-500" />
                    <h3 className="font-semibold text-rose-700">Orçamentos Vencidos</h3>
                  </div>
                  <p className="text-2xl font-bold text-rose-600 mt-2">8</p>
                  <p className="text-sm text-rose-600 mt-1">R$ 42.000,00</p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos orçamentos vencidos</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Card 
              className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200 cursor-pointer hover:shadow-lg transition-all"
              onClick={() => setShowDetails(true)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-500" />
                    <h3 className="font-semibold text-amber-700">Orçamentos Vencendo Hoje</h3>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mt-2">
                    R$ {total.toLocaleString()}
                  </p>
                  <p className="text-sm text-amber-600 mt-1">
                    {dueTodayBudgets.length} orçamentos
                  </p>
                </div>
              </div>
            </Card>
          </TooltipTrigger>
          <TooltipContent 
            side="top" 
            align="center"
            className="bg-gray-800 text-white px-3 py-1.5 rounded-md text-sm z-50"
          >
            <p>Clique para ver detalhes dos orçamentos vencendo hoje</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Orçamentos Vencendo Hoje</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dueTodayBudgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell className="font-medium">{budget.client}</TableCell>
                  <TableCell>{budget.description}</TableCell>
                  <TableCell>{budget.seller}</TableCell>
                  <TableCell className="text-right">
                    R$ {budget.value.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};
