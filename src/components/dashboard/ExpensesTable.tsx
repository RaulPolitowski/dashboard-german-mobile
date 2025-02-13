import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const expensesData = [
  { category: "Pessoal", value: 35000, previousValues: [33000, 32000, 34000] },
  { category: "Marketing", value: 15000, previousValues: [16000, 14500, 13000] },
  { category: "Operacional", value: 25000, previousValues: [23000, 24000, 22000] },
  { category: "Infraestrutura", value: 18000, previousValues: [17500, 17000, 16500] },
  { category: "Logística", value: 12000, previousValues: [11000, 10500, 11500] },
  { category: "Tecnologia", value: 8500, previousValues: [7800, 7500, 7000] },
  { category: "Manutenção", value: 6500, previousValues: [6000, 5800, 6200] },
  { category: "Treinamento", value: 4500, previousValues: [5000, 4800, 4600] },
  { category: "Seguros", value: 3800, previousValues: [3500, 3400, 3300] },
  { category: "Outros", value: 2700, previousValues: [2500, 2400, 2300] }
];

export const ExpensesTable = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const total = expensesData.reduce((sum, item) => sum + item.value, 0);

  const getVariation = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: change,
      isPositive: change >= 0
    };
  };

  if (isMinimized) {
    return (
      <div 
        className="p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-all"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Distribuição de Despesas</h3>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <Card className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Distribuição de Despesas</h3>
          <p className="text-sm text-gray-600">
            Total: R$ {total.toLocaleString()}
          </p>
        </div>
        <button 
          onClick={() => setIsMinimized(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronUp className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Valor Atual</TableHead>
              <TableHead>% do Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesData.map((item) => {
              const percentageOfTotal = (item.value / total) * 100;
              const lastMonthVariation = getVariation(item.value, item.previousValues[0]);
              const twoMonthsVariation = getVariation(item.value, item.previousValues[1]);
              const threeMonthsVariation = getVariation(item.value, item.previousValues[2]);

              return (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableCell className="cursor-help">
                          <div className="flex items-center gap-2">
                            <span>R$ {item.value.toLocaleString()}</span>
                            {lastMonthVariation.isPositive ? (
                              <TrendingUp className="w-4 h-4 text-rose-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </TableCell>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="w-64 p-3"
                        sideOffset={5}
                        alignOffset={0}
                      >
                        <div className="space-y-2">
                          <h4 className="font-semibold">Histórico de Variação</h4>
                          <div className="space-y-1">
                            <p className="text-sm flex justify-between">
                              <span>Último mês:</span>
                              <span className={lastMonthVariation.isPositive ? "text-rose-500" : "text-emerald-500"}>
                                {lastMonthVariation.isPositive ? "+" : ""}{lastMonthVariation.value.toFixed(1)}%
                                (R$ {item.previousValues[0].toLocaleString()})
                              </span>
                            </p>
                            <p className="text-sm flex justify-between">
                              <span>2 meses atrás:</span>
                              <span className={twoMonthsVariation.isPositive ? "text-rose-500" : "text-emerald-500"}>
                                {twoMonthsVariation.isPositive ? "+" : ""}{twoMonthsVariation.value.toFixed(1)}%
                                (R$ {item.previousValues[1].toLocaleString()})
                              </span>
                            </p>
                            <p className="text-sm flex justify-between">
                              <span>3 meses atrás:</span>
                              <span className={threeMonthsVariation.isPositive ? "text-rose-500" : "text-emerald-500"}>
                                {threeMonthsVariation.isPositive ? "+" : ""}{threeMonthsVariation.value.toFixed(1)}%
                                (R$ {item.previousValues[2].toLocaleString()})
                              </span>
                            </p>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TableCell>{percentageOfTotal.toFixed(1)}%</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
