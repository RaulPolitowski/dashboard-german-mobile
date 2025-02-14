
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
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100">
        <h4 className="font-medium text-gray-700">Desempenho Geral - Últimos 7 dias</h4>
        <div className="mt-2 space-y-2">
          <div>
            <p className="text-sm text-gray-600">Volume Total de Vendas</p>
            <p className="text-lg font-semibold text-indigo-600">
              R$ {totalPeriod.toLocaleString()}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-emerald-600">Melhor Vendedor</p>
              <p className="text-sm font-medium text-gray-700">
                {bestSellerOverall.seller}
              </p>
              <p className="text-sm text-emerald-700">
                R$ {bestSellerOverall.total.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-rose-600">Menor Desempenho</p>
              <p className="text-sm font-medium text-gray-700">
                {worstSellerOverall.seller}
              </p>
              <p className="text-sm text-rose-700">
                R$ {worstSellerOverall.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
