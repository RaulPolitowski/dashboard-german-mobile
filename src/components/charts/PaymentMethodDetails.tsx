
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaymentMethodData } from "./CashFlowChart";

interface PaymentMethodDetailsProps {
  data: PaymentMethodData[];
  period: string;
}

export const PaymentMethodDetails = ({ data, period }: PaymentMethodDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const totalInflow = data.reduce((acc, curr) => acc + curr.inflow, 0);
  const totalOutflow = data.reduce((acc, curr) => acc + curr.outflow, 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-500/20">
          <p className="text-sm text-gray-600">Total de Entradas</p>
          <p className="text-lg font-semibold text-emerald-600">
            R$ {totalInflow.toLocaleString()}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-gradient-to-br from-rose-500/10 to-rose-400/5 border border-rose-500/20">
          <p className="text-sm text-gray-600">Total de Saídas</p>
          <p className="text-lg font-semibold text-rose-600">
            R$ {totalOutflow.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Forma de Pagamento</TableHead>
              <TableHead>Entradas</TableHead>
              <TableHead>Saídas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item.method}>
                <TableCell className="font-medium">{item.method}</TableCell>
                <TableCell>
                  <div className="text-emerald-600">
                    R$ {item.inflow.toLocaleString()}
                    <span className="text-xs text-gray-500 ml-1">
                      ({((item.inflow / totalInflow) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-rose-600">
                    R$ {item.outflow.toLocaleString()}
                    <span className="text-xs text-gray-500 ml-1">
                      ({((item.outflow / totalOutflow) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>
          <span className="text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Próxima
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
