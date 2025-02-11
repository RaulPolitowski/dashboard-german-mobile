
import { ChartBar, ChartPie } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";

export const FinancialCharts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Fluxo de Caixa</h3>
            <p className="text-sm text-gray-500">Resultado Acumulado: R$ 40.750,00</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="12">Último ano</option>
            </select>
            <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
          </div>
        </div>
        <div className="h-[250px] md:h-[300px]">
          <CashFlowChart />
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Distribuição de Despesas</h3>
            <p className="text-sm text-gray-500">Total: R$ 93.000,00</p>
          </div>
          <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
        </div>
        <div className="h-[250px] md:h-[300px]">
          <ExpensesDistributionChart />
        </div>
      </Card>
    </div>
  );
};
