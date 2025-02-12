
import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  AlertTriangle, 
  BarChart, 
  Clock, 
  FileQuestion, 
  TimerOff, 
  TrendingUp,
  CheckCircle2,
  XCircle,
  Calendar,
  DollarSign
} from "lucide-react";
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

      {/* Métricas Principais - Linha 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos Gerados</p>
              <h3 className="text-2xl font-bold">78</h3>
              <p className="text-sm text-white/90">+12% vs período anterior</p>
            </div>
            <Calendar className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos Aprovados</p>
              <h3 className="text-2xl font-bold">45</h3>
              <p className="text-sm text-white/90">R$ 320.000,00</p>
            </div>
            <CheckCircle2 className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Em Negociação</p>
              <h3 className="text-2xl font-bold">23</h3>
              <p className="text-sm text-white/90">R$ 185.000,00</p>
            </div>
            <FileQuestion className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos Perdidos</p>
              <h3 className="text-2xl font-bold">10</h3>
              <p className="text-sm text-white/90">R$ 75.000,00</p>
            </div>
            <XCircle className="h-6 w-6 text-white" />
          </div>
        </Card>
      </div>

      {/* Métricas Principais - Linha 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">68%</h3>
              <p className="text-sm text-white/90">+5% vs. anterior</p>
            </div>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">A Vencer (7 dias)</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-sm text-white/90">R$ 85.000,00</p>
            </div>
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Tempo Médio Resposta</p>
              <h3 className="text-2xl font-bold">3.2 dias</h3>
              <p className="text-sm text-white/90">Meta: 2.5 dias</p>
            </div>
            <Clock className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-teal-500 to-teal-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Valor Médio</p>
              <h3 className="text-2xl font-bold">R$ 7.800</h3>
              <p className="text-sm text-white/90">+15% vs. anterior</p>
            </div>
            <DollarSign className="h-6 w-6 text-white" />
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
