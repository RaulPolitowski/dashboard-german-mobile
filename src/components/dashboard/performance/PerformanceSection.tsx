import { Card } from "../../ui/card";
import { SellerPerformanceChart } from "../../charts/SellerPerformanceChart";
import { SellerProductsChart } from "../../charts/SellerProductsChart";

interface PerformanceSectionProps {
  selectedSeller: { id: string; name: string };
  compareSeller: { id: string; name: string } | null;
}

export const PerformanceSection = ({ selectedSeller, compareSeller }: PerformanceSectionProps) => {
  const bestDays = [
    { day: 'Segunda', sales: 7500, percent: 12 },
    { day: 'Terça', sales: 8200, percent: 13 },
    { day: 'Quarta', sales: 9100, percent: 15 },
    { day: 'Quinta', sales: 8900, percent: 14 },
    { day: 'Sexta', sales: 10200, percent: 16 },
    { day: 'Sábado', sales: 12000, percent: 19 },
    { day: 'Domingo', sales: 6800, percent: 11 },
  ];

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
                {bestDays.map((day, index) => (
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
                          {Math.floor(Math.random() * 20 + 10)} vendas
                        </p>
                        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          ({day.percent}%)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
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
                  {bestDays.map((day, index) => (
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
                            {Math.floor(Math.random() * 20 + 10)} vendas
                          </p>
                          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            ({day.percent}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
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
