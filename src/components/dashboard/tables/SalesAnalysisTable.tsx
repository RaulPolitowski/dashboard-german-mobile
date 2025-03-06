import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card } from "../../ui/card";
import { MonthlyData } from "../data/monthlyAnalysisData";

type SalesAnalysisTableProps = {
  monthlyData: MonthlyData[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  getYearOverYearComparison: (currentData: MonthlyData, monthIndex: number) => any;
};

export const SalesAnalysisTable = ({ 
  monthlyData, 
  selectedYear,
  setSelectedYear,
  getYearOverYearComparison 
}: SalesAnalysisTableProps) => {
  const years = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return year.toString();
  });

  if (!monthlyData || monthlyData.length === 0) {
    return (
      <Card className="bg-background">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Análise de Vendas Mensal</h3>
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 text-sm border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-gray-200 dark:focus:border-blue-500/80 dark:focus:shadow-[0_0_10px_rgba(56,189,248,0.4)] dark:focus:ring-blue-500/50 transition-all"
          >
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="text-center py-4 text-gray-500">
          Não há dados disponíveis para o período selecionado.
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-background">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Análise de Vendas Mensal</h3>
        <select 
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1.5 text-sm border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring dark:bg-blue-900/30 dark:border-blue-700/50 dark:text-gray-200 dark:focus:border-blue-500/80 dark:focus:shadow-[0_0_10px_rgba(56,189,248,0.4)] dark:focus:ring-blue-500/50 transition-all"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50 dark:bg-blue-900/20 dark:border-blue-800/30 dark:text-gray-200 dark:hover:bg-blue-900/30 dark:hover:shadow-[0_0_10px_rgba(56,189,248,0.15)] transition-all">
              <TableHead className="dark:text-blue-300 dark:font-medium">Mês</TableHead>
              <TableHead className="dark:text-blue-300 dark:font-medium">Valor Total</TableHead>
              <TableHead className="dark:text-blue-300 dark:font-medium">Quantidade</TableHead>
              <TableHead className="dark:text-blue-300 dark:font-medium">Ticket Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {monthlyData.map((month, index) => {
              const comparison = getYearOverYearComparison(month, index);
              const tooltipContent = comparison ? `
                Comparativo com ${Number(selectedYear) - 1}:
                
                Vendas:
                ${comparison.salesChange >= 0 ? '+' : ''}${comparison.salesChange.toFixed(1)}%
                Atual: R$ ${month.sales.toLocaleString()}
                Anterior: R$ ${comparison.lastYearData.sales.toLocaleString()}

                Quantidade:
                Atual: ${month.transactions}
                Anterior: ${comparison.lastYearData.transactions}
                Variação: ${((month.transactions - comparison.lastYearData.transactions) / comparison.lastYearData.transactions * 100).toFixed(1)}%

                Ticket Médio:
                Atual: R$ ${Math.round(month.sales / month.transactions).toLocaleString()}
                Anterior: R$ ${Math.round(comparison.lastYearData.sales / comparison.lastYearData.transactions).toLocaleString()}
                Variação: ${(((month.sales / month.transactions) - (comparison.lastYearData.sales / comparison.lastYearData.transactions)) / (comparison.lastYearData.sales / comparison.lastYearData.transactions) * 100).toFixed(1)}%
              ` : 'Dados do ano anterior não disponíveis';

              return (
                <TableRow key={month.month} title={tooltipContent} className="hover:bg-muted/50 dark:border-blue-900/10 dark:hover:bg-blue-900/20 dark:hover:shadow-[0_0_15px_rgba(56,189,248,0.1)] transition-colors">
                  <TableCell className="font-medium dark:text-gray-300">{month.month}</TableCell>
                  <TableCell className="dark:text-gray-300">
                    <div className="flex items-center gap-2">
                      <span>R$ {month.sales.toLocaleString()}</span>
                      {comparison && comparison.salesChange !== 0 && (
                        <span className={`text-xs ${comparison.salesChange > 0 ? 'text-emerald-600 dark:text-emerald-400 dark:drop-shadow-[0_0_2px_rgba(16,185,129,0.4)]' : 'text-rose-600 dark:text-rose-400 dark:drop-shadow-[0_0_2px_rgba(244,63,94,0.4)]'}`}>
                          ({comparison.salesChange > 0 ? '+' : ''}{comparison.salesChange.toFixed(1)}%)
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="dark:text-gray-300">{month.transactions}</TableCell>
                  <TableCell className="dark:text-gray-300">
                    R$ {Math.round(month.sales / month.transactions).toLocaleString()}
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
