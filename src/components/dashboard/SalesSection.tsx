
import { useState } from "react";
import { MetricsCards } from "./sales/MetricsCards";
import { SalesEvolutionCard } from "./sales/SalesEvolutionCard";
import { WeeklySalesCard } from "./sales/WeeklySalesCard";
import { PaymentMethodChart } from "../charts/PaymentMethodChart";
import { PaymentMethodTable } from "../charts/PaymentMethodTable";
import { SalesDialogs } from "./sales/SalesDialogs";
import { Card } from "../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { calculateTotals } from "../charts/CashFlowChart";
import { ProductPerformanceSection } from "./sales/ProductPerformanceSection";

const todaysSales = [
  { 
    id: 1, 
    datetime: "2024-02-20T09:30:00", 
    value: 450.00, 
    paymentMethod: "Cartão de Crédito",
    seller: "João Silva"
  },
  { 
    id: 2, 
    datetime: "2024-02-20T10:15:00", 
    value: 280.50, 
    paymentMethod: "PIX",
    seller: "Maria Santos"
  },
  { 
    id: 3, 
    datetime: "2024-02-20T11:45:00", 
    value: 890.00, 
    paymentMethod: "Cartão de Débito",
    seller: "Carlos Oliveira"
  },
];

export const SalesSection = () => {
  const [showDailySales, setShowDailySales] = useState(false);
  const [showMonthlySales, setShowMonthlySales] = useState(false);
  const [isInsightsMinimized, setInsightsMinimized] = useState(false);
  const [isEvolutionMinimized, setEvolutionMinimized] = useState(false);
  const [isWeeklyMinimized, setWeeklyMinimized] = useState(false);
  const [isPaymentMethodMinimized, setPaymentMethodMinimized] = useState(false);
  const [period, setPeriod] = useState("week");
  const totals = calculateTotals(period);

  return (
    <div className="space-y-4">
      <MetricsCards 
        onDailySalesClick={() => setShowDailySales(true)}
        onMonthlySalesClick={() => setShowMonthlySales(true)}
      />

      <SalesEvolutionCard 
        isMinimized={isEvolutionMinimized}
        onToggleMinimize={() => setEvolutionMinimized(!isEvolutionMinimized)}
      />

      <WeeklySalesCard 
        isMinimized={isWeeklyMinimized}
        isInsightsMinimized={isInsightsMinimized}
        onToggleMinimize={() => setWeeklyMinimized(!isWeeklyMinimized)}
        onToggleInsights={() => setInsightsMinimized(!isInsightsMinimized)}
      />

      <ProductPerformanceSection />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          {isPaymentMethodMinimized ? (
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentMethodMinimized(false)}
            >
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Vendas por Forma de Pagamento</h3>
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Vendas por Forma de Pagamento</h3>
                <button 
                  onClick={() => setPaymentMethodMinimized(true)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              <PaymentMethodChart />
            </>
          )}
        </Card>
        <PaymentMethodTable data={totals.paymentMethods} period={period} />
      </div>

      <SalesDialogs 
        showDailySales={showDailySales}
        showMonthlySales={showMonthlySales}
        onDailySalesClose={() => setShowDailySales(false)}
        onMonthlySalesClose={() => setShowMonthlySales(false)}
        todaysSales={todaysSales}
      />
    </div>
  );
};
