
import { useState } from 'react';
import { Card } from "../ui/card";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import { SalesRanking } from "../charts/SalesRanking";
import { PerformanceSection } from "./performance/PerformanceSection";

export const RankingSection = () => {
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [compareSeller, setCompareSeller] = useState<any>(null);
  const [isPerformanceMinimized, setPerformanceMinimized] = useState(false);

  const sellerInsights = {
    week: { change: 15, value: 42000, previousValue: 36500 },
    month: { change: -5, value: 156000, previousValue: 164200 },
    year: { change: 22, value: 1840000, previousValue: 1508200 }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
              Ranking de Vendedores
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total de vendas: R$ 609.000,00
            </p>
          </div>
          <select className="w-full md:w-auto px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 dark:bg-gray-800 dark:text-gray-200">
            <option value="day">Hoje</option>
            <option value="week">Esta semana</option>
            <option value="month" selected>Este mês</option>
            <option value="year">Este ano</option>
          </select>
        </div>
        <SalesRanking 
          onSellerSelect={setSelectedSeller}
          onCompareSelect={setCompareSeller}
          selectedSellerId={selectedSeller?.id}
          compareSellerId={compareSeller?.id}
        />
      </Card>

      {selectedSeller && (
        !isPerformanceMinimized ? (
          <div className="space-y-4">
            <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#6366F1] dark:text-[#818cf8]">
                  Insights de Performance
                </h3>
                <button 
                  onClick={() => setPerformanceMinimized(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(sellerInsights).map(([period, data]) => (
                  <div key={period} className={`p-4 rounded-lg ${
                    data.change >= 0 
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/20' 
                      : 'bg-rose-500/10 dark:bg-rose-500/20 border-rose-500/20'
                    } border`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
                        {period === 'week' ? 'Semana' : period === 'month' ? 'Mês' : 'Ano'}
                      </span>
                      <div className={`flex items-center ${
                        data.change >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                      }`}>
                        {data.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm font-medium">
                          {data.change >= 0 ? '+' : ''}{data.change}%
                        </span>
                      </div>
                    </div>
                    <p className="text-lg font-bold text-gray-700 dark:text-gray-200">
                      R$ {data.value.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Anterior: R$ {data.previousValue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <PerformanceSection 
              selectedSeller={selectedSeller}
              compareSeller={compareSeller}
            />
          </div>
        ) : (
          <Card 
            className="p-4 cursor-pointer hover:shadow-md transition-all bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20"
            onClick={() => setPerformanceMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Análise de Desempenho
              </h3>
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          </Card>
        )
      )}
    </div>
  );
};
