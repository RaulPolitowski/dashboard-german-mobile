
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";

interface OverdueDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "overdue" | "lost" | "generated" | "approved" | "receivable" | "payable";
  items: Array<{
    id: string;
    date: string;
    value: number;
    entity: string;
    description: string;
    seller: string;
  }>;
}

const ITEMS_PER_PAGE = 5;

export const OverdueDetailsDialog = ({ isOpen, onClose, type, items }: OverdueDetailsDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
      case "receivable":
        return "Contas a Receber";
      case "payable":
        return "Contas a Pagar";
      default:
        return "";
    }
  };

  const getStylesByType = () => {
    if (isDarkMode) {
      switch (type) {
        case "overdue":
          return {
            bg: "bg-[#1e2433] border-[#2d3748]",
            text: "text-rose-400",
            textDark: "text-rose-300",
          };
        case "lost":
          return {
            bg: "bg-[#1e2433] border-[#2d3748]",
            text: "text-rose-400",
            textDark: "text-rose-300",
          };
        case "generated":
          return {
            bg: "bg-[#1e2433] border-[#2d3748]",
            text: "text-indigo-400",
            textDark: "text-indigo-300",
          };
        case "approved":
          return {
            bg: "bg-[#1e2433] border-[#2d3748]",
            text: "text-emerald-400",
            textDark: "text-emerald-300",
          };
        default:
          return {
            bg: "bg-[#1e2433] border-[#2d3748]",
            text: "text-blue-400",
            textDark: "text-blue-300",
          };
      }
    } else {
      switch (type) {
        case "overdue":
          return {
            bg: "bg-rose-50 border-rose-100",
            text: "text-rose-600",
            textDark: "text-rose-700",
          };
        case "lost":
          return {
            bg: "bg-rose-50 border-rose-100",
            text: "text-rose-600",
            textDark: "text-rose-700",
          };
        case "generated":
          return {
            bg: "bg-indigo-50 border-indigo-100",
            text: "text-indigo-600",
            textDark: "text-indigo-700",
          };
        case "approved":
          return {
            bg: "bg-emerald-50 border-emerald-100",
            text: "text-emerald-600",
            textDark: "text-emerald-700",
          };
        default:
          return {
            bg: "bg-blue-50 border-blue-100",
            text: "text-blue-600",
            textDark: "text-blue-700",
          };
      }
    }
  };

  const getPaginatedItems = () => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return items.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const styles = getStylesByType();
  const total = items.reduce((sum, item) => sum + item.value, 0);
  const paginatedItems = getPaginatedItems();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-xl w-[calc(100%-2rem)] max-h-[90vh] overflow-hidden flex flex-col p-0 ${
        isDarkMode ? 'bg-[#151b2b] border-[#2d3748]' : ''
      }`}>
        <div className="p-6 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className={`text-xl font-bold ${styles.text}`}>
              {getTitleByType()}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className={`p-4 ${styles.bg} rounded-lg border mb-4`}>
            <div className="flex justify-between items-center">
              <p className={`text-sm font-medium ${styles.text}`}>Total</p>
              <p className={`text-lg font-bold ${styles.textDark}`}>
                R$ {total.toLocaleString()}
              </p>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-3">
              {paginatedItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-[#1e2433] border-[#2d3748]' : 'bg-gray-50 border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className={`text-base font-semibold ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.entity}
                      </h4>
                      <p className={`text-sm ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.description}
                      </p>
                      <p className={`text-xs ${
                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                      }`}>
                        Vendedor: {item.seller}
                      </p>
                    </div>
                    <span className={`text-lg font-bold ${styles.text}`}>
                      R$ {item.value.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {totalPages > 1 && (
            <div className={`flex justify-center gap-2 mt-4 py-2 ${
              isDarkMode ? 'border-t border-[#2d3748]' : 'border-t'
            }`}>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className={`flex items-center px-4 text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
