
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface ServiceOrder {
  id: string;
  client: string;
  description: string;
  value: number;
  technician: string;
  deadline: string;
}

interface ServiceOrderDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  orders: ServiceOrder[];
  type: "inProgress" | "delayed" | "completed";
}

const getTypeStyles = (type: "inProgress" | "delayed" | "completed") => {
  const styles = {
    inProgress: {
      text: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800",
    },
    delayed: {
      text: "text-rose-600 dark:text-rose-400",
      bg: "bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800",
    },
    completed: {
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
    },
  };
  return styles[type];
};

export const ServiceOrderDetailsDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  orders, 
  type 
}: ServiceOrderDetailsDialogProps) => {
  const styles = getTypeStyles(type);
  const total = orders.reduce((sum, order) => sum + order.value, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <div className="flex flex-col gap-4">
          <DialogTitle>{title}</DialogTitle>
          <div className={`rounded-lg border p-4 ${styles.bg}`}>
            <div className="text-lg font-semibold mb-2">
              Total: R$ {total.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              {orders.length} {orders.length === 1 ? "ordem de serviço" : "ordens de serviço"}
            </div>
          </div>
          <div className="mt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
