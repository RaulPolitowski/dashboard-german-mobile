
import { ChartBar, ChartPie } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { useState } from "react";

export const FinancialCharts = () => {
  const [period, setPeriod] = useState("3");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      <Card className="p-4 md:p-6 bg-[#4F46E5] text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">Fluxo de Caixa</h3>
            <p className="text-sm text-indigo-200">Resultado Acumulado: R$ 40.750,00</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <select 
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="w-full md:w-auto px-2 py-1 text-sm border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-indigo-700 text-white"
            >
              <option value="3">Últimos 3 meses</option>
              <option value="6">Últimos 6 meses</option>
              <option value="12">Último ano</option>
              <option value="year">Ano atual</option>
            </select>
            <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-indigo-200" />
          </div>
        </div>
        <div className="h-[250px] md:h-[300px]">
          <CashFlowChart period={period} />
        </div>
      </Card>

      <Card className="p-4 md:p-6 bg-[#4F46E5] text-white">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
          <div>
            <h3 className="text-base md:text-lg font-semibold text-white">Distribuição de Despesas</h3>
            <p className="text-sm text-indigo-200">
              Total: R$ 93.000,00
              <span className="ml-2 text-xs bg-indigo-700 px-2 py-0.5 rounded">
                +5.8% vs mês anterior
              </span>
            </p>
          </div>
          <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-indigo-200" />
        </div>
        <div className="h-[250px] md:h-[300px]">
          <ExpensesDistributionChart />
        </div>
      </Card>
    </div>
  );
};
