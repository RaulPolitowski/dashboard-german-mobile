
import { Card } from "../../../../ui/card";
import { mockMetrics } from "../data/mockData";

export const ServiceOrderPerformanceIndicators = () => {
  return (
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
  );
};
