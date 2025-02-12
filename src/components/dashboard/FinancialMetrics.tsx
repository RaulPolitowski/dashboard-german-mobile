
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";

export const FinancialMetrics = () => {
  const { cardStyle } = useCardStyle();

  const getCardStyle = (baseColor: string) => {
    const baseClasses = "p-4 hover:shadow-lg transition-all";
    
    if (cardStyle === "solid") {
      return `${baseClasses} ${baseColor} text-white`;
    }
    
    const gradientMap = {
      "bg-emerald-500": "bg-gradient-to-br from-emerald-50 via-emerald-100/40 to-emerald-50/30",
      "bg-rose-500": "bg-gradient-to-br from-rose-50 via-rose-100/40 to-rose-50/30",
      "bg-blue-500": "bg-gradient-to-br from-blue-50 via-blue-100/40 to-blue-50/30",
      "bg-amber-500": "bg-gradient-to-br from-amber-50 via-amber-100/40 to-amber-50/30"
    };
    
    return `${baseClasses} ${gradientMap[baseColor as keyof typeof gradientMap]} border border-${baseColor.replace('bg-', '')}/20 dark:${baseColor} dark:text-white`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardStyle("bg-emerald-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Receita Total</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600 dark:text-white"}`}>R$ 72.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                +8% vs. mês anterior
                <span className="block mt-0.5">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-emerald-100/70 dark:bg-white/20"}`}>
              <ArrowUp className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-rose-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Despesas Totais</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600 dark:text-white"}`}>R$ 65.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                +5% vs. mês anterior
                <span className="block mt-0.5">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-rose-100/70 dark:bg-white/20"}`}>
              <ArrowDown className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardStyle("bg-blue-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${cardStyle === "solid" ? "text-white" : "text-gray-600 dark:text-white"}`}>Resultado do Mês</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600 dark:text-white"}`}>R$ 7.000,00</p>
              <p className={`text-xs mt-1 ${cardStyle === "solid" ? "text-white/90" : "text-gray-500 dark:text-white/90"}`}>
                +15% vs. mês anterior
                <span className="block mt-0.5">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className={`p-3 rounded-full ${cardStyle === "solid" ? "bg-white/20" : "bg-blue-100/70 dark:bg-white/20"}`}>
              <BadgeDollarSign className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500 dark:text-white"}`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
