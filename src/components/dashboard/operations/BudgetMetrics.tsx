
import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { AlertTriangle, BarChart, Clock, FileQuestion, TimerOff, TrendingUp } from "lucide-react";
import { BudgetCharts } from "./BudgetCharts";
import { PowerBIEmbed } from "./PowerBIEmbed";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const [selectedView, setSelectedView] = useState<"charts" | "powerbi">("charts");

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-700">Métricas de Orçamentos</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Tabs value={selectedView} className="w-fit">
            <TabsList>
              <TabsTrigger 
                value="charts" 
                onClick={() => setSelectedView("charts")}
                className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
              >
                Gráficos
              </TabsTrigger>
              <TabsTrigger 
                value="powerbi"
                onClick={() => setSelectedView("powerbi")}
                className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
              >
                Power BI
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={selectedRange} className="w-fit">
            <TabsList>
              {timeRanges.map((range) => (
                <TabsTrigger
                  key={range}
                  value={range}
                  onClick={() => setSelectedRange(range)}
                  className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
                >
                  {range}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos em Aberto</p>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-sm text-white/90">R$ 320.000,00</p>
            </div>
            <FileQuestion className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-amber-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">A Vencer (7 dias)</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-white/90">R$ 85.000,00</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-emerald-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">68%</h3>
              <p className="text-sm text-white/90">+5% vs. anterior</p>
            </div>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-violet-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Tempo Médio Resposta</p>
              <h3 className="text-2xl font-bold">3.2 dias</h3>
              <p className="text-sm text-white/90">Meta: 2.5 dias</p>
            </div>
            <Clock className="h-6 w-6 text-white" />
          </div>
        </Card>
      </div>

      {/* Visualizações */}
      {selectedView === "charts" ? (
        <BudgetCharts />
      ) : (
        <PowerBIEmbed 
          embedUrl="SEU_LINK_DO_POWER_BI_AQUI"
          height="800px"
          title="Dashboard de Orçamentos"
        />
      )}
    </div>
  );
};
