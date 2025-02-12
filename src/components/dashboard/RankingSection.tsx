
import { useState } from 'react';
import { Card } from "../ui/card";
import { SalesRanking } from "../charts/SalesRanking";
import { SellerPerformanceChart } from "../charts/SellerPerformanceChart";
import { SellerProductsChart } from "../charts/SellerProductsChart";

export const RankingSection = () => {
  const [selectedSeller, setSelectedSeller] = useState({ id: '1', name: 'João Silva' });

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
        <SalesRanking />
      </Card>

      <SellerPerformanceChart 
        sellerId={selectedSeller.id}
        sellerName={selectedSeller.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SellerProductsChart 
          sellerId={selectedSeller.id}
          sellerName={selectedSeller.name}
        />
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
      </div>
    </div>
  );
};
