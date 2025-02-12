
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  status: string;
  technician: string;
  deadline: string;
}

interface ServiceOrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  orders: ServiceOrder[];
  title: string;
}

export const ServiceOrderDetailsDialog = ({
  isOpen,
  onClose,
  orders,
  title,
}: ServiceOrderDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Técnico</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.client}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.technician}</TableCell>
                  <TableCell>{order.deadline}</TableCell>
                  <TableCell className="text-right">
                    R$ {order.value.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
