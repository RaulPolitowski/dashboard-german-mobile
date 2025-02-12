
import { Package, AlertTriangle } from "lucide-react";
import { Card } from "../ui/card";
import { differenceInDays } from "date-fns";
import { useState } from "react";

const lowPerformingProducts = [
  { id: 1, name: "Câmera 360", sales: 5000, lastSale: "2024-01-15", stock: 45, lastWeekSales: 0, lastWeekValue: 0, salesPercentage: 0.6 },
  { id: 2, name: "Drone Basic", sales: 8000, lastSale: "2024-02-01", stock: 30, lastWeekSales: 1, lastWeekValue: 800, salesPercentage: 1.0 },
  { id: 3, name: "Smart Watch X", sales: 12000, lastSale: "2024-02-15", stock: 25, lastWeekSales: 2, lastWeekValue: 1200, salesPercentage: 1.5 },
  { id: 4, name: "Projetor Mini", sales: 15000, lastSale: "2024-01-30", stock: 20, lastWeekSales: 1, lastWeekValue: 1500, salesPercentage: 1.8 },
  { id: 5, name: "Speaker BT", sales: 18000, lastSale: "2024-02-10", stock: 35, lastWeekSales: 2, lastWeekValue: 1800, salesPercentage: 2.2 },
  { id: 6, name: "Mouse Pad RGB", sales: 4000, lastSale: "2024-01-20", stock: 50, lastWeekSales: 0, lastWeekValue: 0, salesPercentage: 0.5 },
  { id: 7, name: "Webcam Basic", sales: 6000, lastSale: "2024-01-25", stock: 40, lastWeekSales: 1, lastWeekValue: 600, salesPercentage: 0.7 },
  { id: 8, name: "Headset Gamer", sales: 9000, lastSale: "2024-02-05", stock: 28, lastWeekSales: 1, lastWeekValue: 900, salesPercentage: 1.1 },
  { id: 9, name: "Teclado Básico", sales: 7000, lastSale: "2024-01-28", stock: 55, lastWeekSales: 0, lastWeekValue: 0, salesPercentage: 0.9 },
  { id: 10, name: "Hub USB", sales: 5500, lastSale: "2024-02-08", stock: 42, lastWeekSales: 1, lastWeekValue: 550, salesPercentage: 0.7 },
];

const ITEMS_PER_PAGE = 5;

export const LowPerformanceProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(lowPerformingProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = lowPerformingProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-500" />
        <h3 className="text-lg font-semibold text-gray-700">Produtos com Baixo Desempenho</h3>
      </div>
      <div className="space-y-4">
        {paginatedProducts.map((product) => {
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
                    <div className="text-sm space-y-1">
                      <p className="text-gray-500">Em estoque: {product.stock} unidades</p>
                      <p className="text-amber-500">
                        Última venda: {daysSinceLastSale} dias atrás
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600">
                    Total: R$ {product.sales.toLocaleString()}
                  </p>
                  <div className="text-sm space-y-1">
                    <p className="text-red-500">
                      {product.salesPercentage}% das vendas
                    </p>
                    <p className="text-gray-500">
                      Últimos 7 dias: {product.lastWeekSales} un. | R$ {product.lastWeekValue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? "bg-[#6366F1] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Card>
  );
};
