import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card } from "../../ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { MonthlyData } from "../data/monthlyAnalysisData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

type FinancialAnalysisTableProps = {
  monthlyData: MonthlyData[];
  calculateMarginChange: (currentRevenue: number, currentExpenses: number, prevRevenue: number, prevExpenses: number) => number;
  getYearOverYearComparison: (currentData: MonthlyData, monthIndex: number) => any;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

export const FinancialAnalysisTable = ({ 
  monthlyData, 
  calculateMarginChange,
  getYearOverYearComparison,
  selectedYear,
  setSelectedYear
}: FinancialAnalysisTableProps) => {
  const years = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return year.toString();
  });

  return (
    <Card className="bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Análise Financeira Mensal</h3>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Selecione o ano" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
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
              const resultChange = comparison ? 
                ((result - (comparison.lastYearData.revenue - comparison.lastYearData.expenses)) / 
                Math.abs(comparison.lastYearData.revenue - comparison.lastYearData.expenses) * 100) : 0;

              const tooltipContent = comparison ? `
                Comparativo com ${Number(selectedYear) - 1}:
                
                Receita:
                ${comparison.revenueChange >= 0 ? '+' : ''}${comparison.revenueChange.toFixed(1)}%
                Atual: R$ ${month.revenue.toLocaleString()}
                Anterior: R$ ${comparison.lastYearData.revenue.toLocaleString()}

                Despesas:
                ${comparison.expensesChange >= 0 ? '+' : ''}${comparison.expensesChange.toFixed(1)}%
                Atual: R$ ${month.expenses.toLocaleString()}
                Anterior: R$ ${comparison.lastYearData.expenses.toLocaleString()}

                Resultado:
                Atual: R$ ${result.toLocaleString()}
                Anterior: R$ ${(comparison.lastYearData.revenue - comparison.lastYearData.expenses).toLocaleString()}
                Variação: ${resultChange >= 0 ? '+' : ''}${resultChange.toFixed(1)}%
                ${resultChange >= 0 ? '✅ Resultado superior ao ano anterior' : '⚠️ Resultado inferior ao ano anterior'}
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
