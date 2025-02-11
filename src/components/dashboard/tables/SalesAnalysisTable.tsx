
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Card } from "../../ui/card";
import { MonthlyData } from "../data/monthlyAnalysisData";

type SalesAnalysisTableProps = {
  monthlyData: MonthlyData[];
  selectedYear: string;
  getYearOverYearComparison: (currentData: MonthlyData, monthIndex: number) => any;
};

export const SalesAnalysisTable = ({ 
  monthlyData, 
  selectedYear,
  getYearOverYearComparison 
}: SalesAnalysisTableProps) => {
  return (
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
  );
};
