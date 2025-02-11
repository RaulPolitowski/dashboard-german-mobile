
import { Card } from "../ui/card";
import { SalesRanking } from "../charts/SalesRanking";
import { ProductRanking } from "../charts/ProductRanking";
import { LowPerformanceProducts } from "../charts/LowPerformanceProducts";

export const RankingSection = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Ranking de Vendedores</h3>
              <p className="text-sm text-gray-500">Total de vendas: R$ 609.000,00</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
                <option value="day">Hoje</option>
                <option value="month" selected>Este mês</option>
                <option value="year">Este ano</option>
              </select>
            </div>
          </div>
          <SalesRanking />
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Ranking de Produtos</h3>
              <p className="text-sm text-gray-500">Total de vendas: R$ 812.000,00</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
                <option value="day">Hoje</option>
                <option value="month" selected>Este mês</option>
                <option value="year">Este ano</option>
              </select>
            </div>
          </div>
          <ProductRanking />
        </Card>
      </div>

      <LowPerformanceProducts />
    </div>
  );
};
