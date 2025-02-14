
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "../../ui/button";
import { Calendar } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Transaction, DateFilter } from "../types/financial";

interface TransactionsListProps {
  transactions: Transaction[];
  dateFilter: DateFilter;
  currentPage: number;
  totalPages: number;
  onDateFilterChange: (value: DateFilter) => void;
  onPageChange: (page: number) => void;
}

export const TransactionsList = ({
  transactions,
  dateFilter,
  currentPage,
  totalPages,
  onDateFilterChange,
  onPageChange,
}: TransactionsListProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Movimentações</h3>
        <div className="flex gap-2">
          <Select value={dateFilter} onValueChange={onDateFilterChange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="yesterday">Ontem</SelectItem>
                <SelectItem value="last7days">Últimos 7 dias</SelectItem>
                <SelectItem value="currentMonth">Mês atual</SelectItem>
                <SelectItem value="lastMonth">Mês anterior</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id} 
            className={`p-4 rounded-lg border ${
              transaction.type === 'inflow'
                ? 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
                : 'bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  {transaction.description}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
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
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  );
};
