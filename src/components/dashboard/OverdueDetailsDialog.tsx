import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Card } from "../ui/card";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "../../hooks/use-mobile";

interface OverdueItem {
  id: string;
  date: string;
  value: number;
  entity: string;
  description: string;
  seller: string;
}

interface OverdueDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "payable" | "receivable" | "overdue" | "lost";
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
  const isMobile = useIsMobile();
  
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getDialogTitle = () => {
    switch (type) {
      case "payable":
        return "Pagamentos em Atraso";
      case "receivable":
        return "Recebimentos em Atraso";
      case "overdue":
        return "Orçamentos Vencidos";
      case "lost":
        return "Orçamentos Perdidos";
      default:
        return "Detalhes";
    }
  };

  const getBgColorClass = () => {
    switch (type) {
      case "payable":
        return "from-rose-50 to-rose-100/50 dark:from-rose-900/20 dark:to-rose-800/20";
      case "receivable":
        return "from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20";
      case "overdue":
      case "lost":
        return "from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/20";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>
        <div className="overflow-auto touch-pan-x flex-1">
          {isMobile ? (
            <div className="space-y-3 p-2">
              {paginatedItems.map((item) => (
                <Card 
                  key={item.id} 
                  className={`p-4 bg-gradient-to-r ${getBgColorClass()}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {item.entity}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-bold ${
                        type === "receivable" 
                          ? "text-emerald-600 dark:text-emerald-400" 
                          : "text-rose-600 dark:text-rose-400"
                      }`}>
                        R$ {item.value.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Venc: {new Date(item.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Vendedor</p>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {item.seller}
                      </p>
                    </div>
                    <div className="p-2 rounded-md bg-white/50 dark:bg-gray-800/50">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Status</p>
                      <p className="font-medium text-rose-600 dark:text-rose-400">
                        {Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 3600 * 24))} dias
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">Data</TableHead>
                  <TableHead className="w-32">Valor</TableHead>
                  <TableHead className="min-w-[200px]">
                    {type === "payable" ? "Credor" : "Cliente"}
                  </TableHead>
                  <TableHead className="min-w-[200px]">Descrição</TableHead>
                  <TableHead className="min-w-[150px]">Vendedor</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.map((item) => {
                  const daysOverdue = Math.floor((new Date().getTime() - new Date(item.date).getTime()) / (1000 * 3600 * 24));
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="whitespace-nowrap">
                        {new Date(item.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        R$ {item.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]" title={item.entity}>
                        {item.entity}
                      </TableCell>
                      <TableCell className="truncate max-w-[200px]" title={item.description}>
                        {item.description}
                      </TableCell>
                      <TableCell>{item.seller}</TableCell>
                      <TableCell>
                        {type === "lost" ? (
                          <span className="text-rose-600 font-medium">Perdido</span>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-rose-600 font-medium text-lg">
                              {daysOverdue} dias
                            </span>
                            <span className="text-sm text-rose-500">vencido</span>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                )}
              </TableBody>
            </Table>
          )}
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
