
import { useState } from "react";
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";

export const FinancialMetrics = () => {
  const { cardStyle } = useCardStyle();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all bg-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1 text-white">Receita Total</p>
              <p className="text-2xl font-bold text-white">R$ 72.000,00</p>
              <p className="text-xs mt-1 text-white/90">
                +8% vs. mês anterior
                <span className="block mt-0.5">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <ArrowUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all bg-rose-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1 text-white">Despesas Totais</p>
              <p className="text-2xl font-bold text-white">R$ 65.000,00</p>
              <p className="text-xs mt-1 text-white/90">
                +5% vs. mês anterior
                <span className="block mt-0.5">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <ArrowDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all bg-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium mb-1 text-white">Resultado do Mês</p>
              <p className="text-2xl font-bold text-white">R$ 7.000,00</p>
              <p className="text-xs mt-1 text-white/90">
                +15% vs. mês anterior
                <span className="block mt-0.5">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className="p-3 rounded-full bg-white/20">
              <BadgeDollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
