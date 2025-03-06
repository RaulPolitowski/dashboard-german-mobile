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
        <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-50/10 to-emerald-100/10 dark:from-emerald-950/50 dark:to-emerald-900/50 border border-emerald-200/20 dark:border-emerald-500/20">
          <h4 className="font-medium text-emerald-700 dark:text-emerald-300">Melhor Vendedor do Dia</h4>
          <p className="text-emerald-600 dark:text-emerald-400 mt-1">{bestSeller.seller}</p>
          <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
            R$ {bestSeller.total.toLocaleString()}
          </p>
        </div>
      )}
      {worstSeller && (
        <div className="p-4 rounded-lg bg-gradient-to-br from-rose-50/10 to-rose-100/10 dark:from-rose-950/50 dark:to-rose-900/50 border border-rose-200/20 dark:border-rose-500/20">
          <h4 className="font-medium text-rose-700 dark:text-rose-300">Menor Desempenho do Dia</h4>
          <p className="text-rose-600 dark:text-rose-400 mt-1">{worstSeller.seller}</p>
          <p className="text-sm text-rose-800 dark:text-rose-200 mt-1">
            R$ {worstSeller.total.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};
