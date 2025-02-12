
import { ArrowDown, ArrowUp, BadgeDollarSign } from "lucide-react";
import { Card } from "../ui/card";
import { useCardStyle } from "../../contexts/CardStyleContext";

export const FinancialMetrics = () => {
  const { cardStyle } = useCardStyle();

  const getCardClassName = (baseColor: string) => {
    const baseClasses = "p-4 hover:shadow-lg transition-all cursor-pointer";
    return cardStyle === "solid"
      ? `${baseClasses} bg-${baseColor} border-none`
      : `${baseClasses} bg-gradient-to-br from-${baseColor}/20 to-${baseColor}/5 border border-${baseColor}/30`;
  };

  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Receitas e Resultados</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className={getCardClassName("emerald-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${cardStyle === "solid" ? "text-white/90" : "text-gray-600"}`}>Receita Total</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-emerald-600"}`}>R$ 72.000,00</p>
              <p className={`text-xs ${cardStyle === "solid" ? "text-white/90" : "text-gray-500"}`}>
                +8% vs. mês anterior
                <span className="block text-white/80">(R$ 66.667,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-emerald-100 p-3 rounded-full"}>
              <ArrowUp className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-emerald-500"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("rose-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${cardStyle === "solid" ? "text-white/90" : "text-gray-600"}`}>Despesas Totais</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-rose-600"}`}>R$ 65.000,00</p>
              <p className={`text-xs ${cardStyle === "solid" ? "text-white/90" : "text-gray-500"}`}>
                +5% vs. mês anterior
                <span className="block text-white/80">(R$ 61.905,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-rose-100 p-3 rounded-full"}>
              <ArrowDown className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-rose-500"}`} />
            </div>
          </div>
        </Card>

        <Card className={getCardClassName("blue-500")}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm ${cardStyle === "solid" ? "text-white/90" : "text-gray-600"}`}>Resultado do Mês</p>
              <p className={`text-2xl font-bold ${cardStyle === "solid" ? "text-white" : "text-blue-600"}`}>R$ 7.000,00</p>
              <p className={`text-xs ${cardStyle === "solid" ? "text-white/90" : "text-gray-500"}`}>
                +15% vs. mês anterior
                <span className="block text-white/80">(R$ 6.087,00)</span>
              </p>
            </div>
            <div className={cardStyle === "solid" ? "bg-white/20 p-3 rounded-full" : "bg-blue-100 p-3 rounded-full"}>
              <BadgeDollarSign className={`w-6 h-6 ${cardStyle === "solid" ? "text-white" : "text-blue-500"}`} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
