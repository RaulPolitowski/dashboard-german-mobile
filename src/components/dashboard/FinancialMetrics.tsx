
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";

export const FinancialMetrics = () => {
  const { cardStyle } = useCardStyle();

  const getCardStyle = (color: string) => {
    return cardStyle === "solid" 
      ? `bg-${color} text-white`
      : `bg-gradient-to-br from-${color}/10 to-white border border-${color}/20 dark:from-${color}/20 dark:to-gray-800`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={`p-4 hover:shadow-lg transition-all ${getCardStyle("emerald-500")}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>Receita Total</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`}>R$ 72.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                +8% vs. mês anterior
                <span className="block mt-0.5">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-emerald-100 dark:bg-emerald-500/20"}`}>
              <ArrowUp className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-emerald-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={`p-4 hover:shadow-lg transition-all ${getCardStyle("rose-500")}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>Despesas Totais</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-rose-400"}`}>R$ 65.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                +5% vs. mês anterior
                <span className="block mt-0.5">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100 dark:bg-rose-500/20"}`}>
              <ArrowDown className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-rose-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={`p-4 hover:shadow-lg transition-all ${getCardStyle("blue-500")}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-300"}`}>Resultado do Mês</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                +15% vs. mês anterior
                <span className="block mt-0.5">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-blue-100 dark:bg-blue-500/20"}`}>
              <BadgeDollarSign className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-blue-400"}`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
