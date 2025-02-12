
import { Medal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "../ui/button";

const salesData = [
  { id: '1', name: "João Silva", sales: 156000, transactions: 45, avgTicket: 3466.67 },
  { id: '2', name: "Maria Santos", sales: 142000, transactions: 38, avgTicket: 3736.84 },
  { id: '3', name: "Pedro Oliveira", sales: 128000, transactions: 35, avgTicket: 3657.14 },
  { id: '4', name: "Ana Costa", sales: 98000, transactions: 28, avgTicket: 3500.00 },
  { id: '5', name: "Carlos Souza", sales: 85000, transactions: 25, avgTicket: 3400.00 },
];

interface SalesRankingProps {
  onSellerSelect: (seller: any) => void;
  onCompareSelect: (seller: any) => void;
  selectedSellerId?: string;
  compareSellerId?: string;
}

export const SalesRanking = ({ onSellerSelect, onCompareSelect, selectedSellerId, compareSellerId }: SalesRankingProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      {salesData.map((seller, index) => (
        <div
          key={seller.id}
          className={`p-4 rounded-lg bg-gradient-to-r from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border ${
            selectedSellerId === seller.id ? 'border-[#6366F1] shadow-md' :
            compareSellerId === seller.id ? 'border-emerald-500 shadow-md' :
            'border-[#6366F1]/20'
          } hover:shadow-md transition-all`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${
                index === 0 ? "bg-amber-500/20" :
                index === 1 ? "bg-gray-400/20" :
                index === 2 ? "bg-orange-600/20" :
                "bg-blue-500/20"
              }`}>
                <Medal className={`w-5 h-5 ${
                  index === 0 ? "text-amber-500" :
                  index === 1 ? "text-gray-400" :
                  index === 2 ? "text-orange-600" :
                  "text-blue-500"
                }`} />
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-200">{seller.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{seller.transactions} vendas</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-[#6366F1] dark:text-[#818cf8]">
                R$ {seller.sales.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Ticket médio: R$ {seller.avgTicket.toLocaleString()}
              </p>
            </div>
          </div>
          {isMobile && (
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                className="flex-1 bg-white/50 dark:bg-gray-800/50"
                onClick={() => onSellerSelect(seller)}
              >
                Selecionar
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-white/50 dark:bg-gray-800/50"
                onClick={() => onCompareSelect(seller)}
              >
                Comparar
              </Button>
            </div>
          )}
        </div>
      ))}
      {!isMobile && (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
          Clique para selecionar um vendedor. Clique com botão direito para comparar.
        </p>
      )}
    </div>
  );
};
