
import { Card } from "../../../../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceOrderEvolutionChart } from "../charts/ServiceOrderEvolutionChart";
import { ServiceOrderPerformanceChart } from "../charts/ServiceOrderPerformanceChart";

interface ServiceOrderChartsProps {
  showEvolutionChart: boolean;
  showPerformanceChart: boolean;
  onToggleEvolution: () => void;
  onTogglePerformance: () => void;
}

export const ServiceOrderCharts = ({
  showEvolutionChart,
  showPerformanceChart,
  onToggleEvolution,
  onTogglePerformance,
}: ServiceOrderChartsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Evolução das OS
          </h3>
          <button
            onClick={onToggleEvolution}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {showEvolutionChart ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
        {showEvolutionChart && <ServiceOrderEvolutionChart />}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Performance
          </h3>
          <button
            onClick={onTogglePerformance}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {showPerformanceChart ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
        {showPerformanceChart && <ServiceOrderPerformanceChart />}
      </Card>
    </div>
  );
};
