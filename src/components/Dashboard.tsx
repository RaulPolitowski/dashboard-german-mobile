import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Medal, TrendingUp, Wallet, FileSpreadsheet, Sun, Moon } from "lucide-react";
import { FinancialHeader } from "./dashboard/FinancialHeader";
import { FinancialMetrics } from "./dashboard/FinancialMetrics";
import { AccountsSection } from "./dashboard/AccountsSection";
import { FinancialCharts } from "./dashboard/FinancialCharts";
import { SalesSection } from "./dashboard/SalesSection";
import { RankingSection } from "./dashboard/RankingSection";
import { MonthlyAnalysisTables } from "./dashboard/MonthlyAnalysisTables";
import { OperationsSection } from "./dashboard/OperationsSection";
import { useCardStyle } from "../contexts/CardStyleContext";
import { DueTodayCard } from "./dashboard/DueTodayCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Dashboard = () => {
  const { cardStyle, toggleCardStyle } = useCardStyle();

  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <FinancialHeader />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleCardStyle}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
                aria-label="Alternar estilo dos cards"
              >
                {cardStyle === "solid" ? (
                  <Sun className="w-5 h-5 text-gray-600" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Alternar entre cores sólidas e gradientes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Gestão Financeira
          </TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Análise de Vendas
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Operações
          </TabsTrigger>
          <TabsTrigger value="ranking" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <Medal className="w-4 h-4 mr-2" />
            Performance de Vendedores
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <FinancialMetrics />
          <AccountsSection />
          <FinancialCharts />
          <MonthlyAnalysisTables />
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
  );
};

export default Dashboard;
