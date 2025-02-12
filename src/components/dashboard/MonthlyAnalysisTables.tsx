
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
    const currentMargin = ((currentRevenue - currentExpenses) / currentRevenue) * 100;
    const prevMargin = ((prevRevenue - prevExpenses) / prevRevenue) * 100;
    return currentMargin - prevMargin;
  };

  const getYearOverYearComparison = (currentData: MonthlyData, monthIndex: number) => {
    if (!allMonthlyData[Number(selectedYear) - 1]) return null;
    
    const lastYearData = allMonthlyData[Number(selectedYear) - 1][monthIndex];
    if (!lastYearData) return null;

    const salesChange = ((currentData.sales - lastYearData.sales) / lastYearData.sales) * 100;
    const revenueChange = ((currentData.revenue - lastYearData.revenue) / lastYearData.revenue) * 100;
    const expensesChange = ((currentData.expenses - lastYearData.expenses) / lastYearData.expenses) * 100;

    return {
      salesChange,
      revenueChange,
      expensesChange,
      lastYearData
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 text-sm"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {isSalesMinimized ? (
          <div 
            className="p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-all"
            onClick={() => setSalesMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas</h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas</h3>
              <button 
                onClick={() => setSalesMinimized(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <SalesAnalysisTable 
              monthlyData={monthlyData}
              selectedYear={selectedYear}
              getYearOverYearComparison={getYearOverYearComparison}
            />
          </div>
        )}

        {isFinancialMinimized ? (
          <div 
            className="p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-all"
            onClick={() => setFinancialMinimized(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-700">Análise Financeira</h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Análise Financeira</h3>
              <button 
                onClick={() => setFinancialMinimized(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <FinancialAnalysisTable 
              monthlyData={monthlyData}
              selectedYear={selectedYear}
              calculateMarginChange={calculateMarginChange}
              getYearOverYearComparison={getYearOverYearComparison}
            />
          </div>
        )}
      </div>
    </div>
  );
};
