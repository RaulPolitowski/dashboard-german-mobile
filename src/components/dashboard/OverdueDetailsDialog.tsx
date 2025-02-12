
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

interface OverdueItem {
  id: string;
  date: string;
  value: number;
  entity: string;
  description: string;
}

interface OverdueDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "payable" | "receivable";
  items: OverdueItem[];
}

export const OverdueDetailsDialog = ({
  isOpen,
  onClose,
  type,
  items,
}: OverdueDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {type === "payable" ? "Pagamentos em Atraso" : "Recebimentos em Atraso"}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>{type === "payable" ? "Credor" : "Devedor"}</TableHead>
                <TableHead>Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>R$ {item.value.toLocaleString()}</TableCell>
                  <TableCell>{item.entity}</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};
