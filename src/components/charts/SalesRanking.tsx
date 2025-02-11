
import { Medal } from "lucide-react";

const salesData = [
  { id: 1, name: "João Silva", sales: 156000, transactions: 45 },
  { id: 2, name: "Maria Santos", sales: 142000, transactions: 38 },
  { id: 3, name: "Pedro Oliveira", sales: 128000, transactions: 35 },
  { id: 4, name: "Ana Costa", sales: 98000, transactions: 28 },
  { id: 5, name: "Carlos Souza", sales: 85000, transactions: 25 },
];

export const SalesRanking = () => {
  return (
    <div className="space-y-4">
      {salesData.map((seller, index) => (
        <div
          key={seller.id}
          className="p-4 rounded-lg bg-gradient-to-r from-white/80 to-white/50 border border-[#6366F1]/20 hover:shadow-md transition-all"
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
                <p className="font-medium text-gray-700">{seller.name}</p>
                <p className="text-sm text-gray-500">{seller.transactions} vendas</p>
              </div>
            </div>
            <p className="text-lg font-bold text-[#6366F1]">
              R$ {seller.sales.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
