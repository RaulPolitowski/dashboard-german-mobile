
import { useState } from "react";
import { ServiceOrderHeader } from "./components/ServiceOrderHeader";
import { ServiceOrderCards } from "./components/ServiceOrderCards";
import { ServiceOrderCharts } from "./components/ServiceOrderCharts";
import { ServiceOrderPerformanceIndicators } from "./components/ServiceOrderPerformanceIndicators";

export const ServiceOrderMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedTechnician, setSelectedTechnician] = useState("all");
  const [showEvolutionChart, setShowEvolutionChart] = useState(true);
  const [showPerformanceChart, setShowPerformanceChart] = useState(true);

  return (
    <div className="space-y-6">
      <ServiceOrderHeader
        selectedPeriod={selectedPeriod}
        selectedTechnician={selectedTechnician}
        onPeriodChange={setSelectedPeriod}
        onTechnicianChange={setSelectedTechnician}
      />
      
      <ServiceOrderCards />
      
      <ServiceOrderCharts
        showEvolutionChart={showEvolutionChart}
        showPerformanceChart={showPerformanceChart}
        onToggleEvolution={() => setShowEvolutionChart(!showEvolutionChart)}
        onTogglePerformance={() => setShowPerformanceChart(!showPerformanceChart)}
      />
      
      <ServiceOrderPerformanceIndicators />
    </div>
  );
};
