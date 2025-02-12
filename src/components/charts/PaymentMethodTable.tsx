
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import type { PaymentMethodData } from "./CashFlowChart";

interface PaymentMethodTableProps {
  data: PaymentMethodData[];
  period: string;
}

export const PaymentMethodTable = ({ data, period }: PaymentMethodTableProps) => {
  const totalInflow = data.reduce((acc, curr) => acc + curr.inflow, 0);
  const totalOutflow = data.reduce((acc, curr) => acc + curr.outflow, 0);
  const totalInflowTransactions = data.reduce((acc, curr) => acc + curr.inflowTransactions, 0);
  const totalOutflowTransactions = data.reduce((acc, curr) => acc + curr.outflowTransactions, 0);

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Detalhamento por Forma de Pagamento</h3>
        <p className="text-sm text-gray-600">
          {period === 'week' ? 'Semana atual' : 
           period === '3' ? 'Últimos 3 meses' :
           period === '6' ? 'Últimos 6 meses' :
           period === '12' ? 'Último ano' : 'Ano atual'}
        </p>
      </div>

      <div className="overflow-auto touch-pan-x max-h-[300px]">
        <Table>
          <TableHeader className="sticky top-0 bg-white dark:bg-gray-900">
            <TableRow>
              <TableHead className="w-[180px]">Forma de Pagamento</TableHead>
              <TableHead>Entradas</TableHead>
              <TableHead>Saídas</TableHead>
              <TableHead className="text-center">Trans.</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.method}>
                <TableCell className="font-medium">{item.method}</TableCell>
                <TableCell className="text-emerald-600">
                  R$ {item.inflow.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((item.inflow / totalInflow) * 100).toFixed(1)}%)
                  </span>
                </TableCell>
                <TableCell className="text-rose-600">
                  R$ {item.outflow.toLocaleString()}
                  <span className="text-xs text-gray-500 ml-1">
                    ({((item.outflow / totalOutflow) * 100).toFixed(1)}%)
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-emerald-600">+{item.inflowTransactions}</span>
                  {" / "}
                  <span className="text-rose-600">-{item.outflowTransactions}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-500/20">
          <p className="text-sm text-gray-600">Total de Entradas</p>
          <p className="text-lg font-semibold text-emerald-600">
            R$ {totalInflow.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {totalInflowTransactions} transações
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-rose-500/10 to-rose-400/5 border border-rose-500/20">
          <p className="text-sm text-gray-600">Total de Saídas</p>
          <p className="text-lg font-semibold text-rose-600">
            R$ {totalOutflow.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {totalOutflowTransactions} transações
          </p>
        </div>
      </div>
    </div>
  );
};
