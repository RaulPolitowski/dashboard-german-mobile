
import { useState } from "react";
import { Card } from "../../../ui/card";
import { Package, CheckCircle2, XCircle, Clock, TrendingUp, Calendar } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../ui/select";
import { DueTodayOrders } from "./DueTodayOrders";
import { OrderCharts } from "./OrderCharts";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const OrderMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Métricas de Pedidos</h3>
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
                <Package className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-indigo-700">Pedidos Recebidos</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">94</p>
              <p className="text-sm text-indigo-600 mt-1">+8% vs período anterior</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-emerald-700">Pedidos Aprovados</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600 mt-2">45</p>
              <p className="text-sm text-emerald-600 mt-1">R$ 320.000,00</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                <h3 className="font-semibold text-amber-700">Pedidos Pendentes</h3>
              </div>
              <p className="text-2xl font-bold text-amber-600 mt-2">42</p>
              <p className="text-sm text-amber-600 mt-1">R$ 180.000,00</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold text-rose-700">Pedidos Rejeitados</h3>
              </div>
              <p className="text-2xl font-bold text-rose-600 mt-2">7</p>
              <p className="text-sm text-rose-600 mt-1">R$ 45.000,00</p>
            </div>
          </div>
        </Card>
      </div>

      <DueTodayOrders />

      <OrderCharts />
    </div>
  );
};
