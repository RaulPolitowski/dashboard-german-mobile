
import { Package } from "lucide-react";

const productData = [
  { id: 1, name: "Notebook Pro X1", sales: 235000, units: 85 },
  { id: 2, name: "Smartphone Galaxy S21", sales: 198000, units: 120 },
  { id: 3, name: "Monitor 4K 32'", sales: 156000, units: 65 },
  { id: 4, name: "Tablet Air Plus", sales: 125000, units: 95 },
  { id: 5, name: "Fone Bluetooth Pro", sales: 98000, units: 180 },
];

export const ProductRanking = () => {
  return (
    <div className="space-y-4">
      {productData.map((product, index) => (
        <div
          key={product.id}
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
                <Package className={`w-5 h-5 ${
                  index === 0 ? "text-amber-500" :
                  index === 1 ? "text-gray-400" :
                  index === 2 ? "text-orange-600" :
                  "text-blue-500"
                }`} />
              </div>
              <div>
                <p className="font-medium text-gray-700">{product.name}</p>
                <p className="text-sm text-gray-500">{product.units} unidades</p>
              </div>
            </div>
            <p className="text-lg font-bold text-[#6366F1]">
              R$ {product.sales.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
