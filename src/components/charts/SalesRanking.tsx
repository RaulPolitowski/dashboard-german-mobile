
import { Medal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Checkbox } from "../ui/checkbox";

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

  const handleCheckboxChange = (seller: any, checked: boolean) => {
    if (checked) {
      // Se o vendedor clicado é diferente do selecionado, permitir comparação
      if (seller.id !== selectedSellerId) {
        onCompareSelect(seller);
      }
    } else {
      onCompareSelect(null);
    }
  };

  const isCompareSelected = (sellerId: string) => {
    return sellerId === compareSellerId;
  };

  return (
    <div className="space-y-4">
      {salesData.map((seller, index) => (
        <div
          key={seller.id}
          onClick={() => {
            // Ao clicar no card, apenas seleciona o vendedor se não estiver comparando
            if (!isCompareSelected(seller.id)) {
              onSellerSelect(seller);
              // Limpa a comparação se o vendedor selecionado mudar
              if (compareSellerId) {
                onCompareSelect(null);
              }
            }
          }}
          className={`p-4 rounded-lg bg-gradient-to-r from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 border ${
            selectedSellerId === seller.id ? 'border-[#6366F1] shadow-md' :
            compareSellerId === seller.id ? 'border-emerald-500 shadow-md' :
            'border-[#6366F1]/20'
          } hover:shadow-md transition-all cursor-pointer`}
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
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">{seller.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{seller.transactions} vendas</p>
                </div>
                <Checkbox
                  checked={isCompareSelected(seller.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(seller, checked as boolean)}
                  onClick={(e) => {
                    e.stopPropagation();
                    // No mobile, precisamos garantir que o evento de clique do checkbox funcione
                    if (isMobile) {
                      handleCheckboxChange(seller, !isCompareSelected(seller.id));
                    }
                  }}
                  disabled={!isCompareSelected(seller.id) && compareSellerId !== null && seller.id !== selectedSellerId}
                  className="ml-2"
                />
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
        </div>
      ))}
      <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
        Clique no card para selecionar um vendedor. Marque as caixas de seleção para comparar dois vendedores.
      </p>
    </div>
  );
};
