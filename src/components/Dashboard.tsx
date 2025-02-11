
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Medal, TrendingUp, Wallet } from "lucide-react";
import { FinancialHeader } from "./dashboard/FinancialHeader";
import { FinancialMetrics } from "./dashboard/FinancialMetrics";
import { AccountsSection } from "./dashboard/AccountsSection";
import { FinancialCharts } from "./dashboard/FinancialCharts";
import { SalesSection } from "./dashboard/SalesSection";
import { RankingSection } from "./dashboard/RankingSection";
import { MonthlyAnalysisTables } from "./dashboard/MonthlyAnalysisTables";

const Dashboard = () => {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
      <FinancialHeader />

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
          <TabsTrigger value="ranking" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <Medal className="w-4 h-4 mr-2" />
            Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <FinancialMetrics />
          <AccountsSection />
          <MonthlyAnalysisTables />
          <FinancialCharts />
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <SalesSection />
        </TabsContent>

        <TabsContent value="ranking" className="space-y-4">
          <RankingSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
