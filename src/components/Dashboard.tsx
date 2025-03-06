import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Medal, TrendingUp, Wallet, FileSpreadsheet, Sun, Moon } from "lucide-react";
import { FinancialHeader } from "./dashboard/FinancialHeader";
import { AccountsSection } from "./dashboard/AccountsSection";
import { SalesSection } from "./dashboard/SalesSection";
import { RankingSection } from "./dashboard/RankingSection";
import { MonthlyAnalysisTables } from "./dashboard/MonthlyAnalysisTables";
import { OperationsSection } from "./dashboard/OperationsSection";
import { useIsMobile } from "../hooks/use-mobile";
import { useTheme } from "../hooks/use-theme";
import { FinancialOverview } from "./dashboard/FinancialOverview";
import { FinancialCharts } from "./dashboard/FinancialCharts";
import { ExpensesTable } from "./dashboard/expenses/ExpensesTable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Dashboard = () => {
  const isMobile = useIsMobile();
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <FinancialHeader />
        <div className="flex space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-full transition-all ${isDarkMode ? 'bg-blue-900/40 border-blue-700/50 hover:bg-blue-800/50 shadow-[0_0_10px_rgba(56,189,248,0.3)] hover:shadow-[0_0_15px_rgba(56,189,248,0.5)]' : 'bg-white border-gray-200 hover:bg-gray-100 hover:shadow-md'} border`}
                  aria-label="Alternar tema claro/escuro"
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 text-yellow-300 drop-shadow-[0_0_3px_rgba(253,224,71,0.7)]" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Alternar entre tema claro e escuro</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-6">
        <Tabs defaultValue="financial" className="space-y-4">
          {isMobile ? (
            <div className="overflow-x-auto pb-2">
              <TabsList className={`inline-flex w-auto border p-1 transition-all ${isDarkMode ? 'bg-gradient-to-r from-slate-900/90 to-blue-900/80 border-blue-800/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : 'bg-white border-gray-200'}`}>
                <TabsTrigger 
                  value="financial" 
                  className="flex-shrink-0 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-white px-4 py-2 rounded-md"
                >
                  <Wallet className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger 
                  value="sales" 
                  className="flex-shrink-0 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-white px-4 py-2 rounded-md"
                >
                  <TrendingUp className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger 
                  value="operations" 
                  className="flex-shrink-0 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-white px-4 py-2 rounded-md"
                >
                  <FileSpreadsheet className="w-5 h-5" />
                </TabsTrigger>
                <TabsTrigger 
                  value="ranking" 
                  className="flex-shrink-0 data-[state=active]:bg-dashboard-highlight data-[state=active]:text-white px-4 py-2 rounded-md"
                >
                  <Medal className="w-5 h-5" />
                </TabsTrigger>
              </TabsList>
            </div>
          ) : (
            <TabsList className={`transition-all ${isDarkMode ? 'bg-gradient-to-r from-slate-900/90 to-blue-900/80 border border-blue-800/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]' : ''}`}>
              <TabsTrigger value="financial" className="transition-all data-[state=active]:bg-blue-700 data-[state=active]:shadow-[0_0_10px_rgba(56,189,248,0.5)] data-[state=active]:text-white hover:bg-blue-800/40">
                <Wallet className="w-4 h-4 mr-2" />
                Gestão Financeira
              </TabsTrigger>
              <TabsTrigger value="sales" className="transition-all data-[state=active]:bg-blue-700 data-[state=active]:shadow-[0_0_10px_rgba(56,189,248,0.5)] data-[state=active]:text-white hover:bg-blue-800/40">
                <TrendingUp className="w-4 h-4 mr-2" />
                Análise de Vendas
              </TabsTrigger>
              <TabsTrigger value="operations" className="transition-all data-[state=active]:bg-blue-700 data-[state=active]:shadow-[0_0_10px_rgba(56,189,248,0.5)] data-[state=active]:text-white hover:bg-blue-800/40">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Operações
              </TabsTrigger>
              <TabsTrigger value="ranking" className="transition-all data-[state=active]:bg-blue-700 data-[state=active]:shadow-[0_0_10px_rgba(56,189,248,0.5)] data-[state=active]:text-white hover:bg-blue-800/40">
                <Medal className="w-4 h-4 mr-2" />
                Performance de Vendedores
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FinancialOverview />
            </div>
            <AccountsSection />
            <FinancialCharts />
            <MonthlyAnalysisTables />
            <ExpensesTable />
          </TabsContent>

          <TabsContent value="sales" className="space-y-4">
            <SalesSection />
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <OperationsSection />
          </TabsContent>

          <TabsContent value="ranking" className="space-y-4">
            <RankingSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
