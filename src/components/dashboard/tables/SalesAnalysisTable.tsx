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
            className="px-3 py-1.5 text-sm border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
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
          className="px-3 py-1.5 text-sm border border-input bg-background text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
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
                <TableRow key={month.month} title={tooltipContent} className="hover:bg-muted/50">
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
  );
};
