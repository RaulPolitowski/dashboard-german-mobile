
import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  AlertTriangle,
  BadgeDollarSign,
  CheckCircle,
  Clock,
  FileCheck,
  FileQuestion,
  FileX,
  Files,
  TimerOff,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { mockBudgetData } from "./data/mockBudgetData";
import { BudgetData } from "./types/budget";

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");
  const data: BudgetData = mockBudgetData;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const getDateRange = (days: number) => {
    const end = new Date();
    const start = subDays(end, days);
    return `${format(start, "dd/MM", { locale: ptBR })} - ${format(end, "dd/MM", {
      locale: ptBR,
    })}`;
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho com Filtros */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Métricas de Orçamentos</h3>
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

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Orçamentos em Aberto</p>
              <h3 className="text-2xl font-bold">{data.overview.openCount}</h3>
              <p className="text-sm text-white/90">
                {formatCurrency(data.overview.openValue)}
              </p>
            </div>
            <FileQuestion className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-amber-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">A Vencer (7 dias)</p>
              <h3 className="text-2xl font-bold">{data.overview.expiringCount}</h3>
              <p className="text-sm text-white/90">
                {formatCurrency(data.overview.expiringValue)}
              </p>
            </div>
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-emerald-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">{data.performance.conversionRate}%</h3>
              <p className="text-sm text-white/90">
                +{data.performance.conversionTrend}% vs. anterior
              </p>
            </div>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-violet-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Tempo Médio Resposta</p>
              <h3 className="text-2xl font-bold">{data.performance.averageResponseTime} dias</h3>
              <p className="text-sm text-white/90">
                Meta: {data.performance.targetResponseTime} dias
              </p>
            </div>
            <Clock className="h-6 w-6 text-white" />
          </div>
        </Card>
      </div>

      {/* Status dos Orçamentos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4 hover:shadow-lg transition-all border-emerald-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-emerald-700">Orçamentos Aprovados</h4>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-emerald-600">
              {data.overview.approvedCount} <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(data.overview.approvedValue)}
            </p>
            <p className="text-xs text-emerald-600">
              +{data.comparisons.lastPeriod.conversion}% vs. anterior
            </p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-amber-700">Pendentes de Aprovação</h4>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-amber-600">
              {data.overview.pendingApprovalCount}{" "}
              <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(data.overview.pendingApprovalValue)}
            </p>
            <p className="text-xs text-amber-600">Aguardando retorno do cliente</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all border-rose-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-rose-700">Orçamentos Vencidos</h4>
            <TimerOff className="h-5 w-5 text-rose-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-rose-600">
              {data.overview.expiredCount} <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(data.overview.expiredValue)}
            </p>
            <p className="text-xs text-rose-600">Necessitam renegociação</p>
          </div>
        </Card>
      </div>

      {/* Análise Detalhada */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance por Vendedor</h3>
          <div className="space-y-4">
            {data.sellers.map((seller, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Users className="text-blue-600" />
                  <div>
                    <span className="font-medium">{seller.name}</span>
                    <p className="text-sm text-gray-500">
                      {seller.budgets} orçamentos | {seller.conversionRate}% conversão
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-blue-600">
                  {formatCurrency(seller.value)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Previsão de Faturamento</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BadgeDollarSign className="text-blue-600" />
                <span>Potencial Total</span>
              </div>
              <span className="font-semibold text-blue-600">
                {formatCurrency(data.forecast.potentialValue)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-emerald-600" />
                <div>
                  <span>Previsão de Conversão</span>
                  <p className="text-xs text-gray-500">
                    {data.forecast.confidence}% de confiança
                  </p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(data.forecast.expectedValue)}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Análise de Perdas */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Análise de Cancelamentos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.cancellationReasons.map((reason, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg space-y-2"
            >
              <div className="flex items-center gap-2">
                <FileX className="text-rose-500" />
                <span className="font-medium">{reason.reason}</span>
              </div>
              <p className="text-2xl font-bold text-gray-700">{reason.count}</p>
              <p className="text-sm text-gray-500">{formatCurrency(reason.value)}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
