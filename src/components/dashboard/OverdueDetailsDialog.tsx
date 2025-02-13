import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";

interface OverdueDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "overdue" | "lost" | "generated" | "approved";
  items: Array<{
    id: string;
    date: string;
    value: number;
    entity: string;
    description: string;
    seller: string;
  }>;
}

export const OverdueDetailsDialog = ({ isOpen, onClose, type, items }: OverdueDetailsDialogProps) => {
  const getTitleByType = () => {
    switch (type) {
      case "overdue":
        return "Orçamentos Vencidos";
      case "lost":
        return "Orçamentos Perdidos";
      case "generated":
        return "Orçamentos Gerados";
      case "approved":
        return "Orçamentos Aprovados";
      default:
        return "";
    }
  };

  const getHeaderColorByType = () => {
    switch (type) {
      case "overdue":
        return "bg-rose-50 border-rose-200";
      case "lost":
        return "bg-rose-50 border-rose-200";
      case "generated":
        return "bg-indigo-50 border-indigo-200";
      case "approved":
        return "bg-emerald-50 border-emerald-200";
      default:
        return "";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{getTitleByType()}</DialogTitle>
        </DialogHeader>
        <div className={`rounded-lg border p-4 ${getHeaderColorByType()}`}>
          <div className="text-lg font-semibold mb-2">
            Total: R$ {items.reduce((sum, item) => sum + item.value, 0).toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {items.length} {items.length === 1 ? "orçamento" : "orçamentos"}
          </div>
        </div>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Vendedor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.entity}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.seller}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                    R$ {item.value.toLocaleString()}
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
