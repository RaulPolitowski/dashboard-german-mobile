
import { Card } from "../../ui/card";
import { SalesRanking } from "../../charts/SalesRanking";

interface RankingCardProps {
  onSellerSelect: (seller: any) => void;
  onCompareSelect: (seller: any) => void;
  selectedSellerId?: string;
  compareSellerId?: string;
}

export const RankingCard = ({ onSellerSelect, onCompareSelect, selectedSellerId, compareSellerId }: RankingCardProps) => {
  return (
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
        onSellerSelect={onSellerSelect}
        onCompareSelect={onCompareSelect}
        selectedSellerId={selectedSellerId}
        compareSellerId={compareSellerId}
      />
    </Card>
  );
};
