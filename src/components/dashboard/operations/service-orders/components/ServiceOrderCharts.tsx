
import { useState } from "react";
import { Card } from "../../../../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceOrderEvolutionChart } from "../charts/ServiceOrderEvolutionChart";
import { ServiceOrderPerformanceChart } from "../charts/ServiceOrderPerformanceChart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";

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
  const [timeFilter, setTimeFilter] = useState("monthly");

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Evolução das OS
          </h3>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="daily">Hoje</SelectItem>
                  <SelectItem value="current-month">Mês Atual</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="3-months">3 Meses</SelectItem>
                  <SelectItem value="6-months">6 Meses</SelectItem>
                  <SelectItem value="12-months">12 Meses</SelectItem>
                  <SelectItem value="current-year">Ano Atual</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
        </div>
        {showEvolutionChart && <ServiceOrderEvolutionChart timeFilter={timeFilter} />}
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
        {showPerformanceChart && <ServiceOrderPerformanceChart timeFilter={timeFilter} />}
      </Card>
    </div>
  );
};
