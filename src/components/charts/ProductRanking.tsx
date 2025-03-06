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
  { 
    id: 3, 
    name: "Monitor 4K 32'", 
    sales: 156000, 
    units: 65, 
    lastSale: "2024-03-13", 
    salesPercentage: 19.0, 
    lastWeekSales: 8, 
    lastWeekValue: 19200, 
    previousWeekSales: 10,
    previousWeekValue: 24000,
    salesTrend: -20
  },
  { 
    id: 4, 
    name: "Tablet Air Plus", 
    sales: 125000, 
    units: 95, 
    lastSale: "2024-03-12", 
    salesPercentage: 15.2, 
    lastWeekSales: 10, 
    lastWeekValue: 13200,
    previousWeekSales: 8,
    previousWeekValue: 10560,
    salesTrend: 25
  },
  { 
    id: 5, 
    name: "Fone Bluetooth Pro", 
    sales: 98000, 
    units: 180, 
    lastSale: "2024-03-11", 
    salesPercentage: 11.9, 
    lastWeekSales: 22, 
    lastWeekValue: 11660,
    previousWeekSales: 20,
    previousWeekValue: 10600,
    salesTrend: 10
  },
  { 
    id: 6, 
    name: "Mouse Gamer RGB", 
    sales: 85000, 
    units: 150, 
    lastSale: "2024-03-10", 
    salesPercentage: 10.3, 
    lastWeekSales: 18, 
    lastWeekValue: 10200,
    previousWeekSales: 15,
    previousWeekValue: 8500,
    salesTrend: 20
  },
  { 
    id: 7, 
    name: "Teclado Mecânico", 
    sales: 75000, 
    units: 100, 
    lastSale: "2024-03-09", 
    salesPercentage: 9.1, 
    lastWeekSales: 12, 
    lastWeekValue: 9000,
    previousWeekSales: 14,
    previousWeekValue: 10500,
    salesTrend: -14.29
  },
  { 
    id: 8, 
    name: "Webcam HD", 
    sales: 65000, 
    units: 80, 
    lastSale: "2024-03-08", 
    salesPercentage: 7.9, 
    lastWeekSales: 9, 
    lastWeekValue: 7350,
    previousWeekSales: 11,
    previousWeekValue: 8980,
    salesTrend: -18.18
  },
  { 
    id: 9, 
    name: "HD Externo 2TB", 
    sales: 55000, 
    units: 40, 
    lastSale: "2024-03-07", 
    salesPercentage: 6.7, 
    lastWeekSales: 5, 
    lastWeekValue: 6875,
    previousWeekSales: 4,
    previousWeekValue: 5500,
    salesTrend: 25
  },
  { 
    id: 10, 
    name: "Carregador Wireless", 
    sales: 45000, 
    units: 200, 
    lastSale: "2024-03-06", 
    salesPercentage: 5.5, 
    lastWeekSales: 25, 
    lastWeekValue: 5625,
    previousWeekSales: 30,
    previousWeekValue: 6750,
    salesTrend: -16.67
  },
];

const ITEMS_PER_PAGE = 5;

export const ProductRanking = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(productData.length / ITEMS_PER_PAGE);

  const paginatedProducts = productData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatTrend = (trend: number | undefined) => {
    if (trend === undefined || isNaN(trend)) return "0.0";
    if (trend === Infinity) return "+100.0";
    if (trend === -Infinity) return "-100.0";
    return trend.toFixed(1);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-4">Produtos Mais Vendidos</h3>
      <div className="space-y-4">
        {paginatedProducts.map((product, index) => (
          <div
            key={product.id}
            className="p-4 rounded-lg bg-gradient-to-br from-indigo-50/10 to-indigo-100/10 dark:from-indigo-950/50 dark:to-indigo-900/50 border border-indigo-200/20 dark:border-indigo-500/20 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  index === 0 ? "bg-amber-500/20 dark:bg-amber-500/30" :
                  index === 1 ? "bg-gray-400/20 dark:bg-gray-400/30" :
                  index === 2 ? "bg-orange-600/20 dark:bg-orange-600/30" :
                  "bg-blue-500/20 dark:bg-blue-500/30"
                }`}>
                  <Package className={`w-5 h-5 ${
                    index === 0 ? "text-amber-500 dark:text-amber-400" :
                    index === 1 ? "text-gray-400 dark:text-gray-300" :
                    index === 2 ? "text-orange-600 dark:text-orange-400" :
                    "text-blue-500 dark:text-blue-400"
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-700 dark:text-gray-200">{product.name}</p>
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <p>{product.units} unidades vendidas</p>
                    <p>Última venda: {new Date(product.lastSale).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                  R$ {product.sales.toLocaleString()}
                </p>
                <div className="text-sm space-y-1">
                  <div className="flex items-center justify-end gap-1">
                    {(product.salesTrend || 0) > 0 ? (
                      <>
                        <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          +{formatTrend(product.salesTrend)}%
                        </span>
                      </>
                    ) : (
                      <>
                        <TrendingDown className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                        <span className="text-rose-600 dark:text-rose-400 font-medium">
                          {formatTrend(product.salesTrend)}%
                        </span>
                      </>
                    )}
                    <span className="text-gray-500 dark:text-gray-400">vs última semana</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
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
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === i + 1
                ? "bg-indigo-600 dark:bg-indigo-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
