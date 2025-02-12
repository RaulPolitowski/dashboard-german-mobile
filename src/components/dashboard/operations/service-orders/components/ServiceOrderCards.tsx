
import { Card } from "../../../../ui/card";
import { Clock, AlertTriangle, CheckCircle2 } from "lucide-react";
import { DueTodayOrders } from "../DueTodayOrders";
import { mockMetrics } from "../data/mockData";

export const ServiceOrderCards = () => {
  return (
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
  );
};
