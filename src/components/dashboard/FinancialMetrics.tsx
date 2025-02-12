
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";

export const FinancialMetrics = () => {
  const { cardStyle } = useCardStyle();

  const getCardClassName = (baseColor: string) => {
    if (cardStyle === "solid") {
      return `p-4 hover:shadow-lg transition-all cursor-pointer bg-${baseColor}`;
    }
    return `p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-${baseColor}/20 to-${baseColor}/5 border border-${baseColor}/30`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardClassName("emerald-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Receita Total</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-emerald-400"}`}>R$ 72.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>
                +8% vs. mês anterior
                <span className="block mt-0.5">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-full"}>
              <ArrowUp className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-emerald-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("rose-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Despesas Totais</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-rose-400"}`}>R$ 65.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>
                +5% vs. mês anterior
                <span className="block mt-0.5">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-rose-100 dark:bg-rose-900/30 p-3 rounded-full"}>
              <ArrowDown className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-rose-400"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("blue-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-gray-200"}`}>Resultado do Mês</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-blue-400"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-gray-300"}`}>
                +15% vs. mês anterior
                <span className="block mt-0.5">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full"}>
              <BadgeDollarSign className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-blue-400"}`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
