
import { useState } from 'react';
import { Card } from "../ui/card";
import { ChevronDown } from "lucide-react";
import { RankingCard } from "./ranking/RankingCard";
import { InsightsCard } from "./insights/InsightsCard";
import { PerformanceTabs } from "./performance/PerformanceTabs";

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
      <RankingCard 
        onSellerSelect={setSelectedSeller}
        onCompareSelect={setCompareSeller}
        selectedSellerId={selectedSeller?.id}
        compareSellerId={compareSeller?.id}
      />

      {!isPerformanceMinimized ? (
        <div className="space-y-4">
          <InsightsCard 
            insights={sellerInsights}
            onMinimize={() => setPerformanceMinimized(true)}
          />
          <PerformanceTabs 
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
              Performance de Vendedores
            </h3>
            <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
        </Card>
      )}
    </div>
  );
};
