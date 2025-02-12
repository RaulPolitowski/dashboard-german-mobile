
import { useState } from "react";
import { Card } from "../../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  AlertTriangle,
  BadgeDollarSign,
  Calendar,
  CheckCircle,
  Clock,
  FileCheck,
  FileX,
  Files,
  TimerOff,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados simulados
const budgetData = {
  generatedCount: 158,
  generatedValue: 850000,
  openCount: 45,
  openValue: 320000,
  expiringCount: 12,
  expiringValue: 85000,
  expiredCount: 8,
  expiredValue: 42000,
  approvedCount: 82,
  approvedValue: 480000,
  rejectedCount: 31,
  rejectedValue: 165000,
  conversionRate: 68,
  averageClosingTime: 3.2,
  lastMonthComparison: {
    generated: 12,
    approved: 15,
    conversion: 5,
  },
};

const timeRanges = ["7D", "15D", "30D", "90D"] as const;
type TimeRange = (typeof timeRanges)[number];

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("30D");

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

      {/* Principais Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-emerald-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Total de Orçamentos</p>
              <h3 className="text-2xl font-bold">{budgetData.generatedCount}</h3>
              <p className="text-sm text-white/90">
                +{budgetData.lastMonthComparison.generated}% vs. mês anterior
              </p>
            </div>
            <Files className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-blue-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Taxa de Conversão</p>
              <h3 className="text-2xl font-bold">{budgetData.conversionRate}%</h3>
              <p className="text-sm text-white/90">
                +{budgetData.lastMonthComparison.conversion}% vs. mês anterior
              </p>
            </div>
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-emerald-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Valor Médio</p>
              <h3 className="text-2xl font-bold">R$ 2.850</h3>
              <p className="text-sm text-white/90">+8% vs. mês anterior</p>
            </div>
            <BadgeDollarSign className="h-6 w-6 text-white" />
          </div>
        </Card>

        <Card className="p-4 bg-amber-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/90">Tempo Médio Aprovação</p>
              <h3 className="text-2xl font-bold">{budgetData.averageClosingTime} dias</h3>
              <p className="text-sm text-white/90">-1 dia vs. mês anterior</p>
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
              {budgetData.approvedCount} <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(budgetData.approvedValue)}
            </p>
            <p className="text-xs text-emerald-600">
              +{budgetData.lastMonthComparison.approved}% vs. mês anterior
            </p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all border-amber-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-amber-700">A Vencer (Próximos 7 dias)</h4>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-amber-600">
              {budgetData.expiringCount} <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(budgetData.expiringValue)}
            </p>
            <p className="text-xs text-amber-600">Requer atenção imediata</p>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all border-rose-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-rose-700">Orçamentos Vencidos</h4>
            <TimerOff className="h-5 w-5 text-rose-500" />
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-rose-600">
              {budgetData.expiredCount} <span className="text-sm font-normal">orçamentos</span>
            </p>
            <p className="text-sm text-gray-600">
              Valor Total: {formatCurrency(budgetData.expiredValue)}
            </p>
            <p className="text-xs text-rose-600">Necessitam renegociação</p>
          </div>
        </Card>
      </div>

      {/* Status Detalhado */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Status dos Orçamentos</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileCheck className="text-emerald-600" />
                <span>Aprovados</span>
              </div>
              <span className="font-semibold text-emerald-600">{budgetData.approvedCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="text-amber-600" />
                <span>Em Análise</span>
              </div>
              <span className="font-semibold text-amber-600">{budgetData.openCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileX className="text-rose-600" />
                <span>Recusados</span>
              </div>
              <span className="font-semibold text-rose-600">{budgetData.rejectedCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="text-gray-600" />
                <span>Vencidos</span>
              </div>
              <span className="font-semibold text-gray-600">{budgetData.expiredCount}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Resumo Financeiro</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <BadgeDollarSign className="text-blue-600" />
                <span>Valor Total em Aberto</span>
              </div>
              <span className="font-semibold text-blue-600">
                {formatCurrency(budgetData.openValue)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="text-emerald-600" />
                <span>Valor Aprovado</span>
              </div>
              <span className="font-semibold text-emerald-600">
                {formatCurrency(budgetData.approvedValue)}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
              <div className="flex items-center gap-3">
                <XCircle className="text-rose-600" />
                <span>Valor Recusado</span>
              </div>
              <span className="font-semibold text-rose-600">
                {formatCurrency(budgetData.rejectedValue)}
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
