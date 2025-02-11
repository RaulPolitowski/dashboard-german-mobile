
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "../ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

const monthlyData = [
  { month: "Janeiro", sales: 35000, transactions: 150, revenue: 72000, expenses: 65000 },
  { month: "Fevereiro", sales: 38000, transactions: 165, revenue: 75000, expenses: 66000 },
  { month: "Março", sales: 42000, transactions: 180, revenue: 78000, expenses: 68000 },
  { month: "Abril", sales: 45750, transactions: 195, revenue: 82000, expenses: 70000 },
  { month: "Maio", sales: 48000, transactions: 205, revenue: 85000, expenses: 71000 },
  { month: "Junho", sales: 52000, transactions: 220, revenue: 88000, expenses: 73000 },
  { month: "Julho", sales: 54000, transactions: 230, revenue: 90000, expenses: 74000 },
  { month: "Agosto", sales: 51000, transactions: 215, revenue: 87000, expenses: 72000 },
  { month: "Setembro", sales: 49000, transactions: 208, revenue: 84000, expenses: 71000 },
  { month: "Outubro", sales: 53000, transactions: 225, revenue: 89000, expenses: 73000 },
  { month: "Novembro", sales: 56000, transactions: 238, revenue: 92000, expenses: 75000 },
  { month: "Dezembro", sales: 58000, transactions: 246, revenue: 95000, expenses: 76000 },
];

export const MonthlyAnalysisTables = () => {
  const calculateMarginChange = (currentRevenue: number, currentExpenses: number, prevRevenue: number, prevExpenses: number) => {
    const currentMargin = ((currentRevenue - currentExpenses) / currentRevenue) * 100;
    const prevMargin = ((prevRevenue - prevExpenses) / prevRevenue) * 100;
    return currentMargin - prevMargin;
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Análise de Vendas Mensal</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mês</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((month) => (
                <TableRow key={month.month}>
                  <TableCell className="font-medium">{month.month}</TableCell>
                  <TableCell>R$ {month.sales.toLocaleString()}</TableCell>
                  <TableCell>{month.transactions}</TableCell>
                  <TableCell>
                    R$ {Math.round(month.sales / month.transactions).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Análise Financeira Mensal</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
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

                return (
                  <TableRow key={month.month}>
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell>R$ {month.revenue.toLocaleString()}</TableCell>
                    <TableCell>R$ {month.expenses.toLocaleString()}</TableCell>
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
    </div>
  );
};
