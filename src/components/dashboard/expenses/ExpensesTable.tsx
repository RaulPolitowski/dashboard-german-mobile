
import { useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { expensesData } from "./data/expensesData";
import { ExpenseTableRow } from "./components/ExpenseTableRow";
import { useTheme } from "@/hooks/use-theme";

export const ExpensesTable = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const total = expensesData.reduce((sum, item) => sum + item.value, 0);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const getPercentageChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  if (isMinimized) {
    return (
      <div 
        className={`p-4 cursor-pointer rounded-lg hover:shadow-md transition-all ${
          isDarkMode 
            ? 'bg-gradient-to-br from-dashboard-card to-dashboard-cardAlt border border-dashboard-border/50 shadow-card-glow hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]' 
            : 'bg-white shadow'
        }`}
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center justify-between">
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-900'}`}>
            Distribuição de Despesas
          </h3>
          <ChevronDown className={`w-5 h-5 ${
            isDarkMode ? 'text-primary animate-pulse-glow' : 'text-gray-500'
          }`} />
        </div>
      </div>
    );
  }

  return (
    <Card className={`p-4 rounded-lg ${
      isDarkMode 
        ? 'bg-gradient-to-br from-dashboard-card to-dashboard-cardAlt border-dashboard-border/50 shadow-card-glow' 
        : 'bg-white shadow'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-base font-semibold ${isDarkMode ? 'text-gray-200 drop-shadow-sm' : 'text-gray-900'}`}>
            Distribuição de Despesas
          </h3>
          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Total do Mês Atual: R$ {total.toLocaleString()}
          </p>
        </div>
        <button 
          onClick={() => setIsMinimized(true)}
          className={`p-2 ${
            isDarkMode 
              ? 'hover:bg-dashboard-hover/50 text-primary hover:text-primary-glow hover:shadow-neon' 
              : 'hover:bg-gray-100'
          } rounded-full transition-all duration-300`}
        >
          <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-primary' : 'text-gray-500'}`} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table className={isDarkMode ? 'table-container rounded-md overflow-hidden' : ''}>
          <TableHeader>
            <TableRow>
              <TableHead className={isDarkMode ? 'text-gray-300 font-medium' : ''}>Categoria</TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300 font-medium' : ''}>Valor Atual</TableHead>
              <TableHead className={isDarkMode ? 'text-gray-300 font-medium' : ''}>% do Total</TableHead>
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
