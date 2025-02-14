
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Transaction } from "../types/financial";
import { useState, useMemo } from "react";

interface TransactionsListProps {
  transactions: Transaction[];
}

export const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return transactions.slice(startIndex, startIndex + itemsPerPage);
  }, [transactions, currentPage]);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="space-y-4">
      {paginatedTransactions.map((transaction) => (
        <div 
          key={transaction.id} 
          className={`p-4 rounded-lg border ${
            transaction.type === 'inflow'
              ? 'bg-emerald-50 border-emerald-100'
              : 'bg-rose-50 border-rose-100'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-base font-semibold text-gray-900">
                {transaction.description}
              </h4>
              <p className="text-sm text-gray-500">
                {format(parseISO(transaction.date), "dd 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
            <span className={`text-lg font-bold ${
              transaction.type === 'inflow' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              R$ {transaction.value.toLocaleString()}
            </span>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="flex items-center px-4 text-sm text-gray-600">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
