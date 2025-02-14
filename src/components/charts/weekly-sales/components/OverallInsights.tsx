
import { Card } from "../../../ui/card";

interface SellerData {
  seller: string;
  total: number;
}

interface OverallInsightsProps {
  bestSellerOverall?: SellerData;
  totalPeriod: number;
}

export const OverallInsights = ({ bestSellerOverall, totalPeriod }: OverallInsightsProps) => {
  if (!bestSellerOverall) return null;

  return (
    <div className="mb-4">
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100">
        <h4 className="font-medium text-gray-700">Desempenho Geral - Últimos 7 dias</h4>
        <div className="mt-2 space-y-2">
          <div>
            <p className="text-sm text-gray-600">Volume Total de Vendas</p>
            <p className="text-lg font-semibold text-indigo-600">
              R$ {totalPeriod.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Melhor Vendedor do Período</p>
            <p className="text-base font-medium text-indigo-600">
              {bestSellerOverall.seller}
            </p>
            <p className="text-sm text-indigo-700">
              R$ {bestSellerOverall.total.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
