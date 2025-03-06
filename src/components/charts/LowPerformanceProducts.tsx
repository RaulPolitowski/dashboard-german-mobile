import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "../ui/card";
import { differenceInDays } from "date-fns";
import { useState } from "react";

const lowPerformingProducts = [
  { 
    id: 1, 
    name: "Câmera 360", 
    sales: 5000, 
    lastSale: "2024-01-15", 
    stock: 45, 
    lastWeekSales: 0, 
    lastWeekValue: 0,
    previousWeekSales: 1,
    previousWeekValue: 500,
    salesTrend: -100 
  },
  { 
    id: 2, 
    name: "Drone Basic", 
    sales: 8000, 
    lastSale: "2024-02-01", 
    stock: 30, 
    lastWeekSales: 1, 
    lastWeekValue: 800,
    previousWeekSales: 0,
    previousWeekValue: 0,
    salesTrend: Infinity 
  },
  { 
    id: 3, 
    name: "Smart Watch X", 
    sales: 12000, 
    lastSale: "2024-02-15", 
    stock: 25, 
    lastWeekSales: 2, 
    lastWeekValue: 1200,
    previousWeekSales: 3,
    previousWeekValue: 1800,
    salesTrend: -33.33
  },
  { 
    id: 4, 
    name: "Projetor Mini", 
    sales: 15000, 
    lastSale: "2024-01-30", 
    stock: 20, 
    lastWeekSales: 1, 
    lastWeekValue: 1500,
    previousWeekSales: 2,
    previousWeekValue: 3000,
    salesTrend: -50
  },
  { 
    id: 5, 
    name: "Speaker BT", 
    sales: 18000, 
    lastSale: "2024-02-10", 
    stock: 35, 
    lastWeekSales: 2, 
    lastWeekValue: 1800,
    previousWeekSales: 1,
    previousWeekValue: 900,
    salesTrend: 100
  },
  { 
    id: 6, 
    name: "Mouse Pad RGB", 
    sales: 4000, 
    lastSale: "2024-01-20", 
    stock: 50, 
    lastWeekSales: 0, 
    lastWeekValue: 0,
    previousWeekSales: 1,
    previousWeekValue: 400,
    salesTrend: -100
  },
  { 
    id: 7, 
    name: "Webcam Basic", 
    sales: 6000, 
    lastSale: "2024-01-25", 
    stock: 40, 
    lastWeekSales: 1, 
    lastWeekValue: 600,
    previousWeekSales: 0,
    previousWeekValue: 0,
    salesTrend: Infinity
  },
  { 
    id: 8, 
    name: "Headset Gamer", 
    sales: 9000, 
    lastSale: "2024-02-05", 
    stock: 28, 
    lastWeekSales: 1, 
    lastWeekValue: 900,
    previousWeekSales: 2,
    previousWeekValue: 1800,
    salesTrend: -50
  },
  { 
    id: 9, 
    name: "Teclado Básico", 
    sales: 7000, 
    lastSale: "2024-01-28", 
    stock: 55, 
    lastWeekSales: 0, 
    lastWeekValue: 0,
    previousWeekSales: 1,
    previousWeekValue: 700,
    salesTrend: -100
  },
  { 
    id: 10, 
    name: "Hub USB", 
    sales: 5500, 
    lastSale: "2024-02-08", 
    stock: 42, 
    lastWeekSales: 1, 
    lastWeekValue: 550,
    previousWeekSales: 1,
    previousWeekValue: 550,
    salesTrend: 0
  },
];

const ITEMS_PER_PAGE = 5;

export const LowPerformanceProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(lowPerformingProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = lowPerformingProducts.slice(
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
    <Card className="p-4 bg-background/50 dark:bg-gray-900/50 border dark:border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-amber-500 dark:text-amber-400" />
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Produtos com Baixo Desempenho</h3>
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
              className="p-4 rounded-lg bg-gradient-to-br from-amber-50/10 to-amber-100/10 dark:from-amber-950/50 dark:to-amber-900/50 border border-amber-200/20 dark:border-amber-500/20 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                  <div>
                    <p className="font-medium text-gray-700 dark:text-gray-200">{product.name}</p>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">Em estoque: {product.stock} unidades</p>
                      <p className="text-amber-600 dark:text-amber-400">
                        Última venda: {daysSinceLastSale} dias atrás
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total: R$ {product.sales.toLocaleString()}
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
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded transition-colors ${
              currentPage === i + 1
                ? "bg-amber-600 dark:bg-amber-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </Card>
  );
};
