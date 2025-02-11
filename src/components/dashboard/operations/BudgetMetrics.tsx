import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  AlertTriangle, 
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
import { mockBudgetData } from "./data/mockBudgetData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../ui/select";
import { differenceInDays } from "date-fns";
import { OverdueDetailsDialog } from "../OverdueDetailsDialog";
import { DueTodayBudgets } from "./DueTodayBudgets";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showOverdueDetails, setShowOverdueDetails] = useState(false);
  const [showLostDetails, setShowLostDetails] = useState(false);

  const overdueItems = [
    { id: "1", date: "2024-02-01", value: 12500, entity: "Cliente A", description: "Projeto X", seller: "João Silva" },
    { id: "2", date: "2024-02-05", value: 8900, entity: "Cliente B", description: "Serviço Y", seller: "Maria Santos" },
    { id: "3", date: "2024-02-10", value: 15600, entity: "Cliente C", description: "Produto Z", seller: "Pedro Oliveira" },
  ];

  const lostItems = [
    { id: "1", date: "2024-02-15", value: 18500, entity: "Cliente D", description: "Projeto W", seller: "João Silva" },
    { id: "2", date: "2024-02-18", value: 22000, entity: "Cliente E", description: "Serviço V", seller: "Maria Santos" },
  ];

  return (
    <div className="space-y-6">
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-indigo-700">Orçamentos Gerados</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">78</p>
              <p className="text-sm text-indigo-600 mt-1">+12% vs período anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-emerald-700">Orçamentos Aprovados</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600 mt-2">45</p>
              <p className="text-sm text-emerald-600 mt-1">R$ 320.000,00</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200"
          onClick={() => setShowOverdueDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <TimerOff className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-700">Orçamentos Vencidos</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600 mt-2">8</p>
              <p className="text-sm text-amber-600 mt-1">R$ 42.000,00</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200"
          onClick={() => setShowLostDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold text-rose-700">Orçamentos Perdidos</h3>
              </div>
              <p className="text-2xl font-bold text-rose-600 mt-2">12</p>
              <p className="text-sm text-rose-600 mt-1">R$ 75.000,00</p>
            </div>
          </div>
        </Card>
      </div>

      <DueTodayBudgets />

      <BudgetCharts />

      <OverdueDetailsDialog
        isOpen={showOverdueDetails}
        onClose={() => setShowOverdueDetails(false)}
        type="overdue"
        items={overdueItems}
      />

      <OverdueDetailsDialog
        isOpen={showLostDetails}
        onClose={() => setShowLostDetails(false)}
        type="lost"
        items={lostItems}
      />
    </div>
  );
};
