import { Card } from "../../ui/card";
import { SellerPerformanceChart } from "../../charts/SellerPerformanceChart";
import { SellerProductsChart } from "../../charts/SellerProductsChart";

interface PerformanceSectionProps {
  selectedSeller: { id: string; name: string };
  compareSeller: { id: string; name: string } | null;
}

interface DayPerformance {
  day: string;
  sales: number;
  previousDaySales: number;
  transactions: number;
}

export const PerformanceSection = ({ selectedSeller, compareSeller }: PerformanceSectionProps) => {
  const calculatePercentChange = (current: number, previous: number): string => {
    if (previous === 0) {
      return current > 0 ? "+100" : "0";
    }
    const change = ((current - previous) / previous) * 100;
    return change > 0 ? `+${change.toFixed(1)}` : change.toFixed(1);
  };

  const getBestDays = (sellerId: string): DayPerformance[] => {
    const rawData: DayPerformance[] = [
      { day: 'Segunda', sales: 7500, previousDaySales: 6800, transactions: 15 },
      { day: 'Terça', sales: 8200, previousDaySales: 7500, transactions: 18 },
      { day: 'Quarta', sales: 9100, previousDaySales: 8200, transactions: 20 },
      { day: 'Quinta', sales: 8900, previousDaySales: 9100, transactions: 19 },
      { day: 'Sexta', sales: 10200, previousDaySales: 8900, transactions: 22 },
      { day: 'Sábado', sales: 12000, previousDaySales: 10200, transactions: 25 },
      { day: 'Domingo', sales: 6800, previousDaySales: 12000, transactions: 12 },
    ];

    return [...rawData].sort((a, b) => b.sales - a.sales);
  };

  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#6366F1] dark:text-[#818cf8] mb-1">
            Análise de Desempenho
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Visão geral do desempenho e vendas por produto
          </p>
        </div>

        <div className="space-y-6">
          {/* Performance Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SellerPerformanceChart 
              sellerId={selectedSeller.id}
              sellerName={selectedSeller.name}
            />
            {compareSeller && (
              <SellerPerformanceChart 
                sellerId={compareSeller.id}
                sellerName={compareSeller.name}
              />
            )}
          </div>

          {/* Best Days Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
                    Melhores Dias
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Performance por dia da semana - {selectedSeller.name}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {getBestDays(selectedSeller.id).map((day, index) => {
                  const percentChange = calculatePercentChange(day.sales, day.previousDaySales);
                  return (
                    <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818cf8] font-medium">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">{day.day}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#6366F1] dark:text-[#818cf8]">
                          R$ {day.sales.toLocaleString()}
                        </p>
                        <div className="flex items-center justify-end gap-1">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {day.transactions} vendas
                          </p>
                          <span className={`text-xs font-medium ${
                            Number(percentChange) >= 0 
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            ({percentChange}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
            {compareSeller && (
              <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
                      Melhores Dias
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Performance por dia da semana - {compareSeller.name}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  {getBestDays(compareSeller.id).map((day, index) => {
                    const percentChange = calculatePercentChange(day.sales, day.previousDaySales);
                    return (
                      <div key={day.day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1] dark:text-[#818cf8] font-medium">
                            {index + 1}
                          </div>
                          <span className="text-gray-700 dark:text-gray-200">{day.day}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-[#6366F1] dark:text-[#818cf8]">
                            R$ {day.sales.toLocaleString()}
                          </p>
                          <div className="flex items-center justify-end gap-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {day.transactions} vendas
                            </p>
                            <span className={`text-xs font-medium ${
                              Number(percentChange) >= 0 
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}>
                              ({percentChange}%)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* Products Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SellerProductsChart 
              sellerId={selectedSeller.id}
              sellerName={selectedSeller.name}
            />
            {compareSeller && (
              <SellerProductsChart 
                sellerId={compareSeller.id}
                sellerName={compareSeller.name}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};
