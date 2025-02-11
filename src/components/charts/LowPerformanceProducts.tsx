
import { Package, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";
import { differenceInDays } from "date-fns";

const lowPerformingProducts = [
  { id: 1, name: "Câmera 360", sales: 5000, lastSale: "2024-01-15", stock: 45 },
  { id: 2, name: "Drone Basic", sales: 8000, lastSale: "2024-02-01", stock: 30 },
  { id: 3, name: "Smart Watch X", sales: 12000, lastSale: "2024-02-15", stock: 25 },
  { id: 4, name: "Projetor Mini", sales: 15000, lastSale: "2024-01-30", stock: 20 },
  { id: 5, name: "Speaker BT", sales: 18000, lastSale: "2024-02-10", stock: 35 },
];

export const LowPerformanceProducts = () => {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-700">Produtos com Baixo Desempenho</h3>
      </div>
      <div className="space-y-4">
        {lowPerformingProducts.map((product) => {
          const daysSinceLastSale = differenceInDays(
            new Date(),
            new Date(product.lastSale)
          );

          return (
            <div
              key={product.id}
              className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-700">{product.name}</p>
                    <p className="text-sm text-gray-500">Em estoque: {product.stock} unidades</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    Vendas: R$ {product.sales.toLocaleString()}
                  </p>
                  <p className="text-sm text-amber-500">
                    Última venda: {daysSinceLastSale} dias atrás
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
