
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "../ui/card";

const paymentData = [
  { method: 'Cartão de Crédito', amount: 450000, transactions: 850 },
  { method: 'PIX', amount: 320000, transactions: 620 },
  { method: 'Boleto', amount: 180000, transactions: 340 },
  { method: 'Dinheiro', amount: 50000, transactions: 95 },
];

export const PaymentMethodTable = () => {
  const [period, setPeriod] = useState('month');

  const totalAmount = paymentData.reduce((acc, curr) => acc + curr.amount, 0);
  const totalTransactions = paymentData.reduce((acc, curr) => acc + curr.transactions, 0);
  const averageTicket = Math.round(totalAmount / totalTransactions);

  return (
    <Card className="p-4">
      <div className="flex justify-end mb-4">
        <select 
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20"
        >
          <option value="day">Hoje</option>
          <option value="month">Este mês</option>
          <option value="year">Este ano</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Forma de Pagamento</TableHead>
              <TableHead>Valor Total</TableHead>
              <TableHead>Transações</TableHead>
              <TableHead>Ticket Médio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentData.map((item) => (
              <TableRow key={item.method}>
                <TableCell>{item.method}</TableCell>
                <TableCell>R$ {item.amount.toLocaleString()}</TableCell>
                <TableCell>{item.transactions}</TableCell>
                <TableCell>
                  R$ {Math.round(item.amount / item.transactions).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-400/5 border border-blue-500/20">
          <p className="text-sm text-gray-600">Total em Vendas</p>
          <p className="text-xl font-bold text-blue-600">
            R$ {totalAmount.toLocaleString()}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-violet-500/10 to-violet-400/5 border border-violet-500/20">
          <p className="text-sm text-gray-600">Total de Transações</p>
          <p className="text-xl font-bold text-violet-600">
            {totalTransactions}
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 border border-emerald-500/20">
          <p className="text-sm text-gray-600">Ticket Médio Geral</p>
          <p className="text-xl font-bold text-emerald-600">
            R$ {averageTicket.toLocaleString()}
          </p>
        </div>
      </div>
    </Card>
  );
};
