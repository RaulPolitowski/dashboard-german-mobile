import { Card } from "../../../ui/card";

interface SellerData {
  seller: string;
  total: number;
}

interface OverallInsightsProps {
  bestSellerOverall?: SellerData;
  worstSellerOverall?: SellerData;
  totalPeriod: number;
}

export const OverallInsights = ({ bestSellerOverall, worstSellerOverall, totalPeriod }: OverallInsightsProps) => {
  if (!bestSellerOverall || !worstSellerOverall) return null;

  return (
    <div className="mt-4">
      <Card className="p-4 bg-gradient-to-r from-blue-50/10 to-indigo-50/10 dark:from-blue-950/50 dark:to-indigo-950/50 border border-indigo-100/20 dark:border-indigo-500/20">
        <h4 className="font-medium text-gray-700 dark:text-gray-100">Desempenho Geral - Últimos 7 dias</h4>
        <div className="mt-2 space-y-2">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Volume Total de Vendas</p>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
              R$ {totalPeriod.toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400">Melhor Vendedor</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {bestSellerOverall.seller}
              </p>
              <p className="text-sm text-emerald-700 dark:text-emerald-500">
                R$ {bestSellerOverall.total.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-rose-600 dark:text-rose-400">Menor Desempenho</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {worstSellerOverall.seller}
              </p>
              <p className="text-sm text-rose-700 dark:text-rose-500">
                R$ {worstSellerOverall.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
