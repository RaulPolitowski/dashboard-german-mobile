
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
import { mockBudgetData } from "./data/mockBudgetData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";
import { differenceInDays } from "date-fns";
import { OverdueDetailsDialog } from "../OverdueDetailsDialog";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const [selectedView, setSelectedView] = useState<"charts" | "powerbi">("charts");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showOverdueDetails, setShowOverdueDetails] = useState(false);

  const overdueItems = [
    { id: "1", date: "2024-02-01", value: 12500, entity: "Cliente A", description: "Projeto X" },
    { id: "2", date: "2024-02-05", value: 8900, entity: "Cliente B", description: "Serviço Y" },
    { id: "3", date: "2024-02-10", value: 15600, entity: "Cliente C", description: "Produto Z" },
  ];

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Métricas de Orçamentos</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={selectedSeller} onValueChange={setSelectedSeller}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um vendedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Vendedores</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Oliveira</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={selectedRange} onValueChange={(value: TimeRange) => setSelectedRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o período" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Período</SelectLabel>
                {timeRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    Últimos {range}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        </div>
      </div>

      {/* Métricas Principais */}
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

        <Card 
          className="p-4 bg-gradient-to-br from-amber-500 to-amber-600 text-white cursor-pointer hover:shadow-lg transition-all"
          onClick={() => setShowOverdueDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos Vencidos</p>
              <h3 className="text-2xl font-bold">8</h3>
              <p className="text-sm text-white/90">R$ 42.000,00</p>
            </div>
            <TimerOff className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">68%</h3>
              <p className="text-sm text-white/90">+5% vs. anterior</p>
            </div>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-violet-500 to-violet-600 text-white">
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

      {/* Diálogo de Detalhes de Orçamentos Vencidos */}
      <OverdueDetailsDialog
        isOpen={showOverdueDetails}
        onClose={() => setShowOverdueDetails(false)}
        type="payable"
        items={overdueItems}
      />
    </div>
  );
};
