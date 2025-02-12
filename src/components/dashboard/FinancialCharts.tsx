
import { ChartBar, ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "../ui/card";
import { CashFlowChart } from "../charts/CashFlowChart";
import { ExpensesTable } from "./ExpensesTable";
import { ExpensesDistributionChart } from "../charts/ExpensesDistributionChart";
import { PaymentMethodTable } from "../charts/PaymentMethodTable";
import { useState } from "react";
import { calculateTotals } from "../charts/CashFlowChart";

export const FinancialCharts = () => {
  const [period, setPeriod] = useState("week");
  const [isMinimized, setIsMinimized] = useState(false);
  const totals = calculateTotals(period);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          {isMinimized ? (
            <div 
              className="cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base md:text-lg font-semibold text-gray-900">Fluxo de Caixa</h3>
                <ChevronDown className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900">Fluxo de Caixa</h3>
                  <p className="text-sm text-gray-600">Movimentação Financeira: R$ {totals.result.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select 
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-700"
                  >
                    <option value="week">Semana atual</option>
                    <option value="3">Últimos 3 meses</option>
                    <option value="6">Últimos 6 meses</option>
                    <option value="12">Último ano</option>
                    <option value="year">Ano atual</option>
                  </select>
                  <div className="flex gap-2">
                    <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
                    <button 
                      onClick={() => setIsMinimized(true)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronUp className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30 border border-emerald-100">
                  <p className="text-sm text-gray-600">Movimentações de Entrada</p>
                  <p className="text-lg font-semibold text-emerald-600">
                    R$ {totals.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30 border border-rose-100">
                  <p className="text-sm text-gray-600">Movimentações de Saída</p>
                  <p className="text-lg font-semibold text-rose-600">
                    R$ {totals.expenses.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30 border border-blue-100">
                  <p className="text-sm text-gray-600">Saldo do Período</p>
                  <p className="text-lg font-semibold text-blue-600">
                    R$ {totals.result.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="h-[200px] md:h-[250px]">
                <CashFlowChart period={period} />
              </div>
            </>
          )}
        </Card>

        <Card className="p-4 md:p-6 h-fit">
          <PaymentMethodTable data={totals.paymentMethods} period={period} />
        </Card>
      </div>

      <ExpensesTable />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Análise de Custos</h3>
          <div className="h-[300px]">
            <ExpensesDistributionChart />
          </div>
        </Card>
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribuição de Despesas</h3>
          <div className="h-[300px]">
            <ExpensesDistributionChart />
          </div>
        </Card>
      </div>
    </div>
  );
};
