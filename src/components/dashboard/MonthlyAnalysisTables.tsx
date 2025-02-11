
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "../ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";

// Dados expandidos para incluir anos anteriores
const allMonthlyData = {
  "2024": [
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
  ],
  "2023": [
    { month: "Janeiro", sales: 32000, transactions: 140, revenue: 68000, expenses: 62000 },
    { month: "Fevereiro", sales: 35000, transactions: 155, revenue: 70000, expenses: 63000 },
    { month: "Março", sales: 38000, transactions: 170, revenue: 73000, expenses: 65000 },
    { month: "Abril", sales: 42000, transactions: 185, revenue: 76000, expenses: 67000 },
    { month: "Maio", sales: 45000, transactions: 195, revenue: 79000, expenses: 68000 },
    { month: "Junho", sales: 48000, transactions: 210, revenue: 82000, expenses: 70000 },
    { month: "Julho", sales: 50000, transactions: 220, revenue: 84000, expenses: 71000 },
    { month: "Agosto", sales: 47000, transactions: 205, revenue: 81000, expenses: 69000 },
    { month: "Setembro", sales: 45000, transactions: 198, revenue: 78000, expenses: 68000 },
    { month: "Outubro", sales: 49000, transactions: 215, revenue: 83000, expenses: 70000 },
    { month: "Novembro", sales: 52000, transactions: 228, revenue: 86000, expenses: 72000 },
    { month: "Dezembro", sales: 54000, transactions: 236, revenue: 89000, expenses: 73000 },
  ],
};

const years = Object.keys(allMonthlyData).sort((a, b) => b.localeCompare(a));

export const MonthlyAnalysisTables = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const monthlyData = allMonthlyData[selectedYear];

  const calculateMarginChange = (currentRevenue: number, currentExpenses: number, prevRevenue: number, prevExpenses: number) => {
    const currentMargin = ((currentRevenue - currentExpenses) / currentRevenue) * 100;
    const prevMargin = ((prevRevenue - prevExpenses) / prevRevenue) * 100;
    return currentMargin - prevMargin;
  };

  const getYearOverYearComparison = (currentData: any, monthIndex: number) => {
    if (!allMonthlyData[Number(selectedYear) - 1]) return null;
    
    const lastYearData = allMonthlyData[Number(selectedYear) - 1][monthIndex];
    if (!lastYearData) return null;

    const salesChange = ((currentData.sales - lastYearData.sales) / lastYearData.sales) * 100;
    const revenueChange = ((currentData.revenue - lastYearData.revenue) / lastYearData.revenue) * 100;
    const expensesChange = ((currentData.expenses - lastYearData.expenses) / lastYearData.expenses) * 100;

    return {
      salesChange,
      revenueChange,
      expensesChange,
      lastYearData
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 text-sm"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
        <h3 className="text-lg font-semibold text-[#6366F1] mb-4">Análise de Vendas Mensal</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead>Mês</TableHead>
                <TableHead>Valor Total</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Ticket Médio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyData.map((month, index) => {
                const comparison = getYearOverYearComparison(month, index);
                const tooltipContent = comparison ? `
                  Comparativo Ano Anterior:
                  Vendas: ${comparison.salesChange >= 0 ? '+' : ''}${comparison.salesChange.toFixed(1)}%
                  Quantidade: ${((month.transactions - comparison.lastYearData.transactions) / comparison.lastYearData.transactions * 100).toFixed(1)}%
                  Ticket Médio: ${(((month.sales / month.transactions) - (comparison.lastYearData.sales / comparison.lastYearData.transactions)) / (comparison.lastYearData.sales / comparison.lastYearData.transactions) * 100).toFixed(1)}%
                ` : 'Dados do ano anterior não disponíveis';

                return (
                  <TableRow key={month.month} title={tooltipContent} className="hover:bg-gray-50/30">
                    <TableCell className="font-medium">{month.month}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>R$ {month.sales.toLocaleString()}</span>
                        {comparison && comparison.salesChange !== 0 && (
                          <span className={`text-xs ${comparison.salesChange > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                            ({comparison.salesChange > 0 ? '+' : ''}{comparison.salesChange.toFixed(1)}%)
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{month.transactions}</TableCell>
                    <TableCell>
                      R$ {Math.round(month.sales / month.transactions).toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

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
    </div>
  );
};
