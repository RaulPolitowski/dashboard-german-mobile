
import { useState } from "react";
import { Card } from "../../../ui/card";
import { Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { mockMetrics, mockServiceOrders } from "./data/mockData";
import { DueTodayOrders } from "./DueTodayOrders";

export const ServiceOrderMetrics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  return (
    <div className="space-y-6">
      {/* Header com filtros */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Gestão de Ordens de Serviço</h2>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          <option value="7">Últimos 7 dias</option>
          <option value="15">Últimos 15 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* OS em Andamento */}
        <Card className="p-4 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-500" />
                <h3 className="font-semibold text-indigo-700">Em Andamento</h3>
              </div>
              <p className="text-2xl font-bold text-indigo-600 mt-2">
                R$ {mockMetrics.inProgressValue.toLocaleString()}
              </p>
              <p className="text-sm text-indigo-600 mt-1">
                {mockMetrics.inProgressCount} ordens
              </p>
            </div>
          </div>
        </Card>

        {/* OS Atrasadas */}
        <Card className="p-4 bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-rose-500" />
                <h3 className="font-semibold text-rose-700">Atrasadas</h3>
              </div>
              <p className="text-2xl font-bold text-rose-600 mt-2">
                R$ {mockMetrics.delayedValue.toLocaleString()}
              </p>
              <p className="text-sm text-rose-600 mt-1">
                {mockMetrics.delayedCount} ordens
              </p>
            </div>
          </div>
        </Card>

        {/* OS Finalizadas */}
        <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <h3 className="font-semibold text-emerald-700">Finalizadas</h3>
              </div>
              <p className="text-2xl font-bold text-emerald-600 mt-2">
                R$ {mockMetrics.completedValue.toLocaleString()}
              </p>
              <p className="text-sm text-emerald-600 mt-1">
                {mockMetrics.completedCount} ordens
              </p>
            </div>
          </div>
        </Card>

        {/* OS Previstas para Hoje */}
        <DueTodayOrders />
      </div>

      {/* Indicadores de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Performance</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Taxa de Entrega no Prazo</span>
                <span className="text-sm font-medium text-emerald-600">
                  {mockMetrics.onTimeDeliveryRate}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${mockMetrics.onTimeDeliveryRate}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Tempo Médio de Conclusão</span>
                <span className="text-sm font-medium text-indigo-600">
                  {mockMetrics.averageCompletionTime} dias
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Distribuição por Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Em Andamento</span>
                <span className="text-sm font-medium text-indigo-600">
                  {((mockMetrics.inProgressCount / mockMetrics.totalCount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${(mockMetrics.inProgressCount / mockMetrics.totalCount) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Atrasadas</span>
                <span className="text-sm font-medium text-rose-600">
                  {((mockMetrics.delayedCount / mockMetrics.totalCount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-rose-500 h-2 rounded-full"
                  style={{ width: `${(mockMetrics.delayedCount / mockMetrics.totalCount) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Finalizadas</span>
                <span className="text-sm font-medium text-emerald-600">
                  {((mockMetrics.completedCount / mockMetrics.totalCount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: `${(mockMetrics.completedCount / mockMetrics.totalCount) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
