import { useState } from "react";
import { Card } from "../../../../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ServiceOrderEvolutionChart } from "../charts/ServiceOrderEvolutionChart";
import { ServiceOrderPerformanceChart } from "../charts/ServiceOrderPerformanceChart";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className={`p-4 ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
            Evolução das OS
          </h3>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={handleFilterChange}>
              <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200'}`}>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white'}>
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
              className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} rounded-full transition-colors`}
            >
              {showEvolutionChart ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        {showEvolutionChart && <ServiceOrderEvolutionChart timeFilter={timeFilter} />}
      </Card>

      <Card className={`p-4 ${isDarkMode ? 'bg-gray-900/80 border-gray-800' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>
            Performance
          </h3>
          <button
            onClick={onTogglePerformance}
            className={`p-2 ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} rounded-full transition-colors`}
          >
            {showPerformanceChart ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {showPerformanceChart && <ServiceOrderPerformanceChart timeFilter={timeFilter} />}
      </Card>
    </div>
  );
};
