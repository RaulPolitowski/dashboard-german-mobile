
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {type === "payable" ? "Pagamentos em Atraso" : "Recebimentos em Atraso"}
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto flex-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">Data</TableHead>
                <TableHead className="w-32">Valor</TableHead>
                <TableHead className="min-w-[200px]">{type === "payable" ? "Credor" : "Devedor"}</TableHead>
                <TableHead className="min-w-[200px]">Descrição</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</TableCell>
                  <TableCell className="whitespace-nowrap">R$ {item.value.toLocaleString()}</TableCell>
                  <TableCell className="truncate max-w-[200px]" title={item.entity}>
                    {item.entity}
                  </TableCell>
                  <TableCell className="truncate max-w-[200px]" title={item.description}>
                    {item.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-4 border-t pt-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
