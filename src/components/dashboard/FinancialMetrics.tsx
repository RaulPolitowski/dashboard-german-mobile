
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";

export const FinancialMetrics = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 backdrop-blur-sm border border-emerald-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Receita Total</p>
              <p className="text-2xl font-bold text-emerald-500">R$ 72.000,00</p>
              <p className="text-xs text-emerald-600">+8% vs. mês anterior</p>
            </div>
            <div className="bg-emerald-500/20 p-3 rounded-full">
              <ArrowUp className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-rose-500/20 to-rose-400/10 backdrop-blur-sm border border-rose-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Despesas Totais</p>
              <p className="text-2xl font-bold text-rose-500">R$ 65.000,00</p>
              <p className="text-xs text-rose-600">+5% vs. mês anterior</p>
            </div>
            <div className="bg-rose-500/20 p-3 rounded-full">
              <ArrowDown className="w-6 h-6 text-rose-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-violet-500/20 to-violet-400/10 backdrop-blur-sm border border-violet-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Resultado do Mês</p>
              <p className="text-2xl font-bold text-violet-500">R$ 7.000,00</p>
              <p className="text-xs text-violet-600">+15% vs. mês anterior</p>
            </div>
            <div className="bg-violet-500/20 p-3 rounded-full">
              <BadgeDollarSign className="w-6 h-6 text-violet-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
