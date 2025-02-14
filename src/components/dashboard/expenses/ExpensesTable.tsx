
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { expensesData } from "./data/expensesData";
import { ExpenseTableRow } from "./components/ExpenseTableRow";

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
            {expensesData.map((expense) => (
              <ExpenseTableRow
                key={expense.category}
                expense={expense}
                total={total}
                getPercentageChange={getPercentageChange}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
