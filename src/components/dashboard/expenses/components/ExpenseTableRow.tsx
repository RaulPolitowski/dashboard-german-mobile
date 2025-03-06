
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
      <TableRow className="dark:border-amber-900/10 dark:hover:bg-amber-900/10 dark:hover:shadow-[0_0_10px_rgba(251,191,36,0.1)] transition-colors">
        <TableCell className="font-medium dark:text-gray-300">{expense.category}</TableCell>
        {isMobile ? (
          <TableCell 
            className="cursor-pointer"
            onClick={() => setShowDetails(true)}
          >
            <div className="flex items-center gap-2">
              <span>R$ {expense.value.toLocaleString()}</span>
              {lastMonthChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-rose-500 dark:text-rose-400 dark:drop-shadow-[0_0_2px_rgba(244,63,94,0.4)]" />
              ) : (
                <TrendingDown className="w-4 h-4 text-emerald-500 dark:text-emerald-400 dark:drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]" />
              )}
            </div>
          </TableCell>
        ) : (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <TableCell className="cursor-help dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <span>R$ {expense.value.toLocaleString()}</span>
                    {lastMonthChange > 0 ? (
                      <TrendingUp className="w-4 h-4 text-rose-500 dark:text-rose-400 dark:drop-shadow-[0_0_2px_rgba(244,63,94,0.4)]" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-emerald-500 dark:text-emerald-400 dark:drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]" />
                    )}
                  </div>
                </TableCell>
              </TooltipTrigger>
              <TooltipContent 
                side="right" 
                className="w-72 p-3 bg-white dark:bg-gray-900 dark:border-amber-700/50 dark:text-gray-200"
                sideOffset={5}
                alignOffset={0}
              >
                {historyContent}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TableCell className="dark:text-gray-300">
          <div className="flex items-center gap-1">
            <span className={lastMonthChange > 0 
              ? "dark:text-rose-400 dark:drop-shadow-[0_0_2px_rgba(244,63,94,0.4)]" 
              : "dark:text-emerald-400 dark:drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]"}
            >{lastMonthChange > 0 ? "+" : ""}{lastMonthChange}%</span>
          </div>
        </TableCell>
      </TableRow>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="dark:bg-gradient-to-br dark:from-gray-900/90 dark:to-amber-900/20 dark:border-amber-800/40 dark:shadow-[0_0_15px_rgba(251,191,36,0.15)]">
          <DialogHeader>
            <DialogTitle className="dark:text-amber-100 dark:drop-shadow-[0_0_2px_rgba(251,191,36,0.3)]">Histórico de {expense.category}</DialogTitle>
          </DialogHeader>
          {historyContent}
        </DialogContent>
      </Dialog>
    </>
  );
};
