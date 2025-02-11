
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card } from "../../ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MonthlyData } from "../data/monthlyAnalysisData";

type FinancialAnalysisTableProps = {
  monthlyData: MonthlyData[];
  calculateMarginChange: (currentRevenue: number, currentExpenses: number, prevRevenue: number, prevExpenses: number) => number;
  getYearOverYearComparison: (currentData: MonthlyData, monthIndex: number) => any;
};

export const FinancialAnalysisTable = ({ 
  monthlyData, 
  calculateMarginChange,
  getYearOverYearComparison 
}: FinancialAnalysisTableProps) => {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
      <h3 className="text-lg font-semibold text-[#6366F1] mb-4">Análise Financeira Mensal</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead>Mês</TableHead>
              <TableHead>Receita</TableHead>
              <TableHead>Despesa</TableHead>
              <TableHead>Resultado</TableHead>
              <TableHead>Margem vs. Mês Anterior</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.map((month, index) => {
              const result = month.revenue - month.expenses;
              const marginChange = index > 0 
                ? calculateMarginChange(
                    month.revenue, 
                    month.expenses, 
                    monthlyData[index - 1].revenue, 
                    monthlyData[index - 1].expenses
                  )
                : 0;
              
              const comparison = getYearOverYearComparison(month, index);
              const tooltipContent = comparison ? `
                Comparativo Ano Anterior:
                Receita: ${comparison.revenueChange >= 0 ? '+' : ''}${comparison.revenueChange.toFixed(1)}%
                Despesas: ${comparison.expensesChange >= 0 ? '+' : ''}${comparison.expensesChange.toFixed(1)}%
                Resultado: ${((result - (comparison.lastYearData.revenue - comparison.lastYearData.expenses)) / Math.abs(comparison.lastYearData.revenue - comparison.lastYearData.expenses) * 100).toFixed(1)}%
              ` : 'Dados do ano anterior não disponíveis';

              return (
                <TableRow key={month.month} title={tooltipContent} className="hover:bg-gray-50/30">
                  <TableCell className="font-medium">{month.month}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>R$ {month.revenue.toLocaleString()}</span>
                      {comparison && comparison.revenueChange !== 0 && (
                        <span className={`text-xs ${comparison.revenueChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ({comparison.revenueChange > 0 ? '+' : ''}{comparison.revenueChange.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>R$ {month.expenses.toLocaleString()}</span>
                      {comparison && comparison.expensesChange !== 0 && (
                        <span className={`text-xs ${comparison.expensesChange < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          ({comparison.expensesChange > 0 ? '+' : ''}{comparison.expensesChange.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={result >= 0 ? "text-emerald-600" : "text-rose-600"}>
                    R$ {result.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {marginChange !== 0 && (
                        marginChange > 0 ? (
                          <ArrowUp className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-rose-500" />
                        )
                      )}
                      <span className={
                        marginChange > 0 
                          ? "text-emerald-600" 
                          : marginChange < 0 
                            ? "text-rose-600" 
                            : "text-gray-600"
                      }>
                        {marginChange !== 0 ? `${Math.abs(marginChange).toFixed(1)}%` : "-"}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
