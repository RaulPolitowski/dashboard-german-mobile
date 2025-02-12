import { Package, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";

const productData = [
  { 
    id: 1, 
    name: "Notebook Pro X1", 
    sales: 235000, 
    units: 85, 
    lastSale: "2024-03-15", 
    salesPercentage: 28.5, 
    lastWeekSales: 12, 
    lastWeekValue: 32400,
    previousWeekSales: 8, 
    previousWeekValue: 21600, 
    salesTrend: 50 
  },
  { 
    id: 2, 
    name: "Smartphone Galaxy S21", 
    sales: 198000, 
    units: 120, 
    lastSale: "2024-03-14", 
    salesPercentage: 24.1, 
    lastWeekSales: 15, 
    lastWeekValue: 24750,
    previousWeekSales: 18,
    previousWeekValue: 29700,
    salesTrend: -16.67 
  },
  { id: 3, name: "Monitor 4K 32'", sales: 156000, units: 65, lastSale: "2024-03-13", salesPercentage: 19.0, lastWeekSales: 8, lastWeekValue: 19200 },
  { id: 4, name: "Tablet Air Plus", sales: 125000, units: 95, lastSale: "2024-03-12", salesPercentage: 15.2, lastWeekSales: 10, lastWeekValue: 13200 },
  { id: 5, name: "Fone Bluetooth Pro", sales: 98000, units: 180, lastSale: "2024-03-11", salesPercentage: 11.9, lastWeekSales: 22, lastWeekValue: 11660 },
  { id: 6, name: "Mouse Gamer RGB", sales: 85000, units: 150, lastSale: "2024-03-10", salesPercentage: 10.3, lastWeekSales: 18, lastWeekValue: 10200 },
  { id: 7, name: "Teclado Mecânico", sales: 75000, units: 100, lastSale: "2024-03-09", salesPercentage: 9.1, lastWeekSales: 12, lastWeekValue: 9000 },
  { id: 8, name: "Webcam HD", sales: 65000, units: 80, lastSale: "2024-03-08", salesPercentage: 7.9, lastWeekSales: 9, lastWeekValue: 7350 },
  { id: 9, name: "HD Externo 2TB", sales: 55000, units: 40, lastSale: "2024-03-07", salesPercentage: 6.7, lastWeekSales: 5, lastWeekValue: 6875 },
  { id: 10, name: "Carregador Wireless", sales: 45000, units: 200, lastSale: "2024-03-06", salesPercentage: 5.5, lastWeekSales: 25, lastWeekValue: 5625 },
];

const ITEMS_PER_PAGE = 5;

export const ProductRanking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productData.length / ITEMS_PER_PAGE);

  const paginatedProducts = productData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Produtos Mais Vendidos</h3>
      <div className="space-y-4">
        {paginatedProducts.map((product, index) => (
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
                  <div className="text-sm text-gray-500 space-y-1">
                    <p>{product.units} unidades vendidas</p>
                    <p>Última venda: {new Date(product.lastSale).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#6366F1]">
                  R$ {product.sales.toLocaleString()}
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-end gap-1">
                    {product.salesTrend > 0 ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-emerald-600 font-medium">
                          +{product.salesTrend.toFixed(1)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-rose-500" />
                        <span className="text-rose-600 font-medium">
                          {product.salesTrend.toFixed(1)}%
                        </span>
                      </>
                    )}
                    <span className="text-gray-500">vs última semana</span>
                  </div>
                  <p className="text-gray-500">
                    Últimos 7 dias: {product.lastWeekSales} un. | R$ {product.lastWeekValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};
