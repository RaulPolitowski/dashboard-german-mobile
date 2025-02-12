
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../ui/table";
import { ScrollArea } from "../../../../ui/scroll-area";

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
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Cliente</TableHead>
                  <TableHead className="w-[250px]">Descrição</TableHead>
                  <TableHead className="w-[150px]">Técnico</TableHead>
                  <TableHead className="w-[120px]">Prazo</TableHead>
                  <TableHead className="text-right w-[120px]">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.client}</TableCell>
                    <TableCell className="max-w-[250px] truncate">{order.description}</TableCell>
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
