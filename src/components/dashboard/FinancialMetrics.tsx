
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";

export const FinancialMetrics = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Receita Total</p>
              <p className="text-2xl font-bold text-white">R$ 72.000,00</p>
              <p className="text-xs text-white/90">
                +8% vs. mês anterior
                <span className="block text-white/80">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ArrowUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-rose-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Despesas Totais</p>
              <p className="text-2xl font-bold text-white">R$ 65.000,00</p>
              <p className="text-xs text-white/90">
                +5% vs. mês anterior
                <span className="block text-white/80">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-blue-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Resultado do Mês</p>
              <p className="text-2xl font-bold text-white">R$ 7.000,00</p>
              <p className="text-xs text-white/90">
                +15% vs. mês anterior
                <span className="block text-white/80">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <BadgeDollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
