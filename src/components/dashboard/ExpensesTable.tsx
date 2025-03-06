
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
  { 
    category: "Pessoal", 
    value: 35000, 
    previousValues: [
      { month: "Fevereiro", value: 33000 },
      { month: "Janeiro", value: 32000 },
      { month: "Dezembro", value: 34000 }
    ],
  },
  { 
    category: "Marketing", 
    value: 15000, 
    previousValues: [
      { month: "Fevereiro", value: 16000 },
      { month: "Janeiro", value: 14500 },
      { month: "Dezembro", value: 13000 }
    ],
  },
  { 
    category: "Operacional", 
    value: 25000, 
    previousValues: [
      { month: "Fevereiro", value: 23000 },
      { month: "Janeiro", value: 24000 },
      { month: "Dezembro", value: 22000 }
    ],
  },
  { 
    category: "Infraestrutura", 
    value: 18000, 
    previousValues: [
      { month: "Fevereiro", value: 17500 },
      { month: "Janeiro", value: 17000 },
      { month: "Dezembro", value: 16500 }
    ],
  },
  { 
    category: "Logística", 
    value: 12000,
    previousValues: [
      { month: "Fevereiro", value: 11000 },
      { month: "Janeiro", value: 10500 },
      { month: "Dezembro", value: 11500 }
    ],
  },
  { 
    category: "Tecnologia", 
    value: 8500, 
    previousValues: [
      { month: "Fevereiro", value: 7800 },
      { month: "Janeiro", value: 7500 },
      { month: "Dezembro", value: 7000 }
    ],
  },
  { 
    category: "Manutenção", 
    value: 6500, 
    previousValues: [
      { month: "Fevereiro", value: 6000 },
      { month: "Janeiro", value: 5800 },
      { month: "Dezembro", value: 6200 }
    ],
  },
  { 
    category: "Treinamento", 
    value: 4500, 
    previousValues: [
      { month: "Fevereiro", value: 5000 },
      { month: "Janeiro", value: 4800 },
      { month: "Dezembro", value: 4600 }
    ],
  },
  { 
    category: "Seguros", 
    value: 3800, 
    previousValues: [
      { month: "Fevereiro", value: 3500 },
      { month: "Janeiro", value: 3400 },
      { month: "Dezembro", value: 3300 }
    ],
  },
  { 
    category: "Outros", 
    value: 2700, 
    previousValues: [
      { month: "Fevereiro", value: 2500 },
      { month: "Janeiro", value: 2400 },
      { month: "Dezembro", value: 2300 }
    ],
  }
];

export const ExpensesTable = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const total = expensesData.reduce((sum, item) => sum + item.value, 0);

  const getPercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
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
            Total do Mês Atual: R$ {total.toLocaleString()}
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
              const lastMonthChange = Number(getPercentageChange(item.value, item.previousValues[0].value));

              return (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TableCell className="cursor-help">
                          <div className="flex items-center gap-2">
                            <span>R$ {item.value.toLocaleString()}</span>
                            {lastMonthChange > 0 ? (
                              <TrendingUp className="w-4 h-4 text-rose-500" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-emerald-500" />
                            )}
                          </div>
                        </TableCell>
                      </TooltipTrigger>
                      <TooltipContent 
                        side="right" 
                        className="w-72 p-3"
                        sideOffset={5}
                        alignOffset={0}
                      >
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Histórico Comparativo</h4>
                          <div className="space-y-2">
                            {item.previousValues.map((prev, index) => {
                              const change = Number(getPercentageChange(item.value, prev.value));
                              return (
                                <div key={prev.month} className="flex justify-between items-center text-sm">
                                  <span className="text-gray-600">{prev.month}:</span>
                                  <div className="flex items-center gap-2">
                                    <span>R$ {prev.value.toLocaleString()}</span>
                                    <span className={change > 0 ? "text-rose-500" : "text-emerald-500"}>
                                      {change > 0 ? "+" : ""}{change}%
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="pt-2 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                              Valor atual: <span className="font-semibold">R$ {item.value.toLocaleString()}</span>
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
