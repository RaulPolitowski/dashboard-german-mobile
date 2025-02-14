
import { Card } from "../../../ui/card";

interface SellerData {
  seller: string;
  total: number;
}

interface PerformanceInsightsProps {
  bestSeller?: SellerData;
  worstSeller?: SellerData;
}

export const PerformanceInsights = ({ bestSeller, worstSeller }: PerformanceInsightsProps) => {
  if (!bestSeller && !worstSeller) return null;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {bestSeller && (
        <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50">
          <h4 className="font-medium text-emerald-700">Melhor Vendedor do Dia</h4>
          <p className="text-emerald-600 mt-1">{bestSeller.seller}</p>
          <p className="text-sm text-emerald-800 mt-1">
            R$ {bestSeller.total.toLocaleString()}
          </p>
        </div>
      )}
      {worstSeller && (
        <div className="p-4 rounded-lg border border-rose-200 bg-rose-50">
          <h4 className="font-medium text-rose-700">Menor Desempenho do Dia</h4>
          <p className="text-rose-600 mt-1">{worstSeller.seller}</p>
          <p className="text-sm text-rose-800 mt-1">
            R$ {worstSeller.total.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
