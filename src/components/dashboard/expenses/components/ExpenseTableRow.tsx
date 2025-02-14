
import { TableCell, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Expense } from "../types/expense";
import { ExpenseHistoryTooltip } from "./ExpenseHistoryTooltip";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ExpenseTableRowProps {
  expense: Expense;
  total: number;
  getPercentageChange: (current: number, previous: number) => string;
}

export const ExpenseTableRow = ({ expense, total, getPercentageChange }: ExpenseTableRowProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const isMobile = useIsMobile();
  const percentageOfTotal = (expense.value / total) * 100;
  const lastMonthChange = Number(getPercentageChange(expense.value, expense.previousValues[0].value));

  const historyContent = (
    <ExpenseHistoryTooltip
      currentValue={expense.value}
      previousValues={expense.previousValues}
      getPercentageChange={getPercentageChange}
    />
  );

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{expense.category}</TableCell>
        {isMobile ? (
          <TableCell 
            className="cursor-pointer"
            onClick={() => setShowDetails(true)}
          >
            <div className="flex items-center gap-2">
              <span>R$ {expense.value.toLocaleString()}</span>
              {lastMonthChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-rose-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-emerald-500" />
              )}
            </div>
          </TableCell>
        ) : (
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
                className="w-72 p-3 bg-white"
                sideOffset={5}
                alignOffset={0}
              >
                {historyContent}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TableCell>
          <div className="flex items-center gap-1">
            <span>{lastMonthChange > 0 ? "+" : ""}{lastMonthChange}%</span>
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Histórico de {expense.category}</DialogTitle>
          </DialogHeader>
          {historyContent}
        </DialogContent>
      </Dialog>
    </>
  );
};
