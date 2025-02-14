
import { TableCell, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Expense } from "../types/expense";
import { ExpenseHistoryTooltip } from "./ExpenseHistoryTooltip";

interface ExpenseTableRowProps {
  expense: Expense;
  total: number;
  getPercentageChange: (current: number, previous: number) => string;
}

export const ExpenseTableRow = ({ expense, total, getPercentageChange }: ExpenseTableRowProps) => {
  const percentageOfTotal = (expense.value / total) * 100;
  const lastMonthChange = Number(getPercentageChange(expense.value, expense.previousValues[0].value));

  return (
    <TableRow>
      <TableCell className="font-medium">{expense.category}</TableCell>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <TableCell className="cursor-help">
              <div className="flex items-center gap-2">
                <span>R$ {expense.value.toLocaleString()}</span>
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
            <ExpenseHistoryTooltip
              currentValue={expense.value}
              previousValues={expense.previousValues}
              getPercentageChange={getPercentageChange}
            />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TableCell>{percentageOfTotal.toFixed(1)}%</TableCell>
    </TableRow>
  );
};
