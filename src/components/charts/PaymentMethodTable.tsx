
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

const paymentData = [
  { method: 'Cartão de Crédito', amount: 450000, transactions: 850 },
  { method: 'PIX', amount: 320000, transactions: 620 },
  { method: 'Boleto', amount: 180000, transactions: 340 },
  { method: 'Dinheiro', amount: 50000, transactions: 95 },
];

export const PaymentMethodTable = () => {
  const [period, setPeriod] = useState('day');
  const [isMinimized, setIsMinimized] = useState(false);

  const totalAmount = paymentData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTransactions = paymentData.reduce((acc, curr) => acc + curr.transactions, 0);

  return (
    <Card className="p-4">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Detalhamento por Forma de Pagamento</h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Detalhamento por Forma de Pagamento</h3>
            <div className="flex items-center gap-2">
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="day">Hoje</option>
                <option value="week">Esta semana</option>
              </select>
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="dark:text-gray-300">Forma de Pagamento</TableHead>
                  <TableHead className="dark:text-gray-300">Valor Total</TableHead>
                  <TableHead className="dark:text-gray-300">Transações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentData.map((item) => (
                  <TableRow key={item.method}>
                    <TableCell className="dark:text-gray-300">{item.method}</TableCell>
                    <TableCell className="dark:text-gray-300">R$ {item.amount.toLocaleString()}</TableCell>
                    <TableCell className="dark:text-gray-300">{item.transactions}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-400/5 dark:from-blue-500/20 dark:to-blue-400/10 border border-blue-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total em Vendas</p>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                R$ {totalAmount.toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-400/5 dark:from-violet-500/20 dark:to-violet-400/10 border border-violet-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Transações</p>
              <p className="text-xl font-bold text-violet-600 dark:text-violet-400">
                {totalTransactions}
              </p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
