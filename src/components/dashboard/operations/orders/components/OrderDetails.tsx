
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { OrderDetailsProps } from "../types/order-metrics";

export const OrderDetails = ({ orders }: OrderDetailsProps) => (
  <div>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Vendedor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Data</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.client}</TableCell>
            <TableCell>{order.description}</TableCell>
            <TableCell>{order.seller}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>{order.createdAt}</TableCell>
            <TableCell className="text-right">
              R$ {order.value.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);
