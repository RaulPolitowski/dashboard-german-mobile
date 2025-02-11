
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card } from "../ui/card";

const paymentData = [
  { method: 'Cartão de Crédito', amount: 450000, transactions: 850 },
  { method: 'PIX', amount: 320000, transactions: 620 },
  { method: 'Boleto', amount: 180000, transactions: 340 },
  { method: 'Dinheiro', amount: 50000, transactions: 95 },
];

export const PaymentMethodTable = () => {
  return (
    <Card className="p-4">
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
    </Card>
  );
};
