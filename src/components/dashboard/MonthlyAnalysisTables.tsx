
import { useState } from "react";
import { SalesAnalysisTable } from "./tables/SalesAnalysisTable";
import { FinancialAnalysisTable } from "./tables/FinancialAnalysisTable";
import { allMonthlyData, years } from "./data/monthlyAnalysisData";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { MonthlyData } from "./data/monthlyAnalysisData";
export const MonthlyAnalysisTables = () => {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [isSalesMinimized, setSalesMinimized] = useState(false);
  const [isFinancialMinimized, setFinancialMinimized] = useState(false);
  const monthlyData = allMonthlyData[selectedYear];
  const calculateMarginChange = (currentRevenue: number, currentExpenses: number, prevRevenue: number, prevExpenses: number) => {
    const currentMargin = (currentRevenue - currentExpenses) / currentRevenue * 100;
    const prevMargin = (prevRevenue - prevExpenses) / prevRevenue * 100;
    return currentMargin - prevMargin;
  };
  const getYearOverYearComparison = (currentData: MonthlyData, monthIndex: number) => {
    if (!allMonthlyData[Number(selectedYear) - 1]) return null;
    const lastYearData = allMonthlyData[Number(selectedYear) - 1][monthIndex];
    if (!lastYearData) return null;
    const salesChange = (currentData.sales - lastYearData.sales) / lastYearData.sales * 100;
    const revenueChange = (currentData.revenue - lastYearData.revenue) / lastYearData.revenue * 100;
    const expensesChange = (currentData.expenses - lastYearData.expenses) / lastYearData.expenses * 100;
    return {
      salesChange,
      revenueChange,
      expensesChange,
      lastYearData
    };
  };
  return <div className="space-y-6">
      <div className="space-y-4">
        {isSalesMinimized ? <div className="p-4 cursor-pointer bg-white dark:bg-gray-800/50 rounded-lg shadow hover:shadow-md transition-all dark:border dark:border-gray-700" onClick={() => setSalesMinimized(false)}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-blue-100 dark:drop-shadow-[0_0_2px_rgba(56,189,248,0.3)]">Análise de Vendas</h3>
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-purple-300 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.4)]" />
            </div>
          </div> : <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/90 dark:to-purple-900/30 rounded-lg shadow p-4 dark:border dark:border-purple-800/40 dark:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-blue-100 dark:drop-shadow-[0_0_2px_rgba(56,189,248,0.3)]">Análise de Vendas</h3>
              <button onClick={() => setSalesMinimized(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-blue-900/40 rounded-full transition-colors dark:hover:shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-purple-300 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.4)]" />
              </button>
            </div>
            <SalesAnalysisTable monthlyData={monthlyData} selectedYear={selectedYear} setSelectedYear={setSelectedYear} getYearOverYearComparison={getYearOverYearComparison} />
          </div>}

        {isFinancialMinimized ? <div className="p-4 cursor-pointer bg-white dark:bg-gray-800/50 rounded-lg shadow hover:shadow-md transition-all dark:border dark:border-gray-700" onClick={() => setFinancialMinimized(false)}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-purple-100 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.3)]">Análise Financeira</h3>
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-purple-300 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.4)]" />
            </div>
          </div> : <div className="bg-white dark:bg-gradient-to-br dark:from-gray-900/90 dark:to-purple-900/30 rounded-lg shadow p-4 dark:border dark:border-purple-800/40 dark:shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-purple-100 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.3)]">Análise Financeira</h3>
              <button onClick={() => setFinancialMinimized(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-purple-900/40 rounded-full transition-colors dark:hover:shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-purple-300 dark:drop-shadow-[0_0_2px_rgba(168,85,247,0.4)]" />
              </button>
            </div>
            <FinancialAnalysisTable monthlyData={monthlyData} selectedYear={selectedYear} setSelectedYear={setSelectedYear} calculateMarginChange={calculateMarginChange} getYearOverYearComparison={getYearOverYearComparison} />
          </div>}
      </div>
    </div>;
};
