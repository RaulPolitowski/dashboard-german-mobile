
import { useState } from 'react';
import { Card } from "../ui/card";
import { SalesRanking } from "../charts/SalesRanking";
import { SellerPerformanceChart } from "../charts/SellerPerformanceChart";
import { SellerProductsChart } from "../charts/SellerProductsChart";
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";

export const RankingSection = () => {
  const [selectedSeller, setSelectedSeller] = useState({ id: '1', name: 'João Silva' });
  const [compareSeller, setCompareSeller] = useState<any>(null);
  const [isPerformanceMinimized, setPerformanceMinimized] = useState(false);

  const sellerInsights = {
    week: { change: 15, value: 42000 },
    month: { change: -5, value: 156000 },
    year: { change: 22, value: 1840000 }
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

      {!isPerformanceMinimized ? (
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
                      data.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
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
                </div>
              ))}
            </div>
          </Card>

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
                {['Sábado', 'Sexta', 'Quinta', 'Quarta', 'Terça'].map((day, index) => (
                  <div key={day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1] font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 dark:text-gray-200">{day}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#6366F1]">
                        R$ {(Math.random() * 10000 + 5000).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {Math.floor(Math.random() * 20 + 10)} vendas
                      </p>
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
                  {['Sábado', 'Sexta', 'Quinta', 'Quarta', 'Terça'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#6366F1]/10 text-[#6366F1] font-medium">
                          {index + 1}
                        </div>
                        <span className="text-gray-700 dark:text-gray-200">{day}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-[#6366F1]">
                          R$ {(Math.random() * 10000 + 5000).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {Math.floor(Math.random() * 20 + 10)} vendas
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      ) : (
        <Card 
          className="p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={() => setPerformanceMinimized(false)}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
              Performance de Vendedores
            </h3>
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        </Card>
      )}
    </div>
  );
};
