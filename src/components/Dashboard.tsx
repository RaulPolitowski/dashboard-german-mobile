
import { ArrowDown, ArrowUp, BadgeDollarSign, Banknote, ChartBar, ChartLine, ChartPie, Medal, Receipt, TrendingUp, Users, Wallet } from "lucide-react";
import { Card } from "./ui/card";
import { SalesEvolutionChart } from "./charts/SalesEvolutionChart";
import { ExpensesDistributionChart } from "./charts/ExpensesDistributionChart";
import { CashFlowChart } from "./charts/CashFlowChart";
import { SalesRanking } from "./charts/SalesRanking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Dashboard = () => {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#0EA5E9] bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <p className="text-sm md:text-base text-gray-500">Visão estratégica e operacional do seu negócio</p>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList>
          <TabsTrigger value="financial" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <Wallet className="w-4 h-4 mr-2" />
            Financeiro
          </TabsTrigger>
          <TabsTrigger value="sales" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <TrendingUp className="w-4 h-4 mr-2" />
            Vendas
          </TabsTrigger>
          <TabsTrigger value="ranking" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            <Medal className="w-4 h-4 mr-2" />
            Ranking
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-emerald-500/20 to-emerald-400/10 backdrop-blur-sm border border-emerald-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-2xl font-bold text-emerald-500">R$ 72.000,00</p>
                  <p className="text-xs text-emerald-600">+8% vs. mês anterior</p>
                </div>
                <div className="bg-emerald-500/20 p-3 rounded-full">
                  <ArrowUp className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-rose-500/20 to-rose-400/10 backdrop-blur-sm border border-rose-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Despesas Totais</p>
                  <p className="text-2xl font-bold text-rose-500">R$ 65.000,00</p>
                  <p className="text-xs text-rose-600">+5% vs. mês anterior</p>
                </div>
                <div className="bg-rose-500/20 p-3 rounded-full">
                  <ArrowDown className="w-6 h-6 text-rose-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-violet-500/20 to-violet-400/10 backdrop-blur-sm border border-violet-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Resultado do Mês</p>
                  <p className="text-2xl font-bold text-violet-500">R$ 7.000,00</p>
                  <p className="text-xs text-violet-600">+15% vs. mês anterior</p>
                </div>
                <div className="bg-violet-500/20 p-3 rounded-full">
                  <BadgeDollarSign className="w-6 h-6 text-violet-500" />
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Fluxo de Caixa</h3>
                  <p className="text-sm text-gray-500">Resultado Acumulado: R$ 40.750,00</p>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
                    <option value="3">Últimos 3 meses</option>
                    <option value="6">Últimos 6 meses</option>
                    <option value="12">Último ano</option>
                  </select>
                  <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
                </div>
              </div>
              <div className="h-[250px] md:h-[300px]">
                <CashFlowChart />
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Distribuição de Despesas</h3>
                  <p className="text-sm text-gray-500">Total: R$ 93.000,00</p>
                </div>
                <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
              </div>
              <div className="h-[250px] md:h-[300px]">
                <ExpensesDistributionChart />
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-blue-500/20 to-blue-400/10 backdrop-blur-sm border border-blue-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendas do Dia</p>
                  <p className="text-2xl font-bold text-blue-500">R$ 2.500,00</p>
                  <p className="text-xs text-blue-600">15 vendas hoje</p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Receipt className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-indigo-500/20 to-indigo-400/10 backdrop-blur-sm border border-indigo-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendas do Mês</p>
                  <p className="text-2xl font-bold text-indigo-500">R$ 45.750,00</p>
                  <p className="text-xs text-indigo-600">157 vendas no mês</p>
                </div>
                <div className="bg-indigo-500/20 p-3 rounded-full">
                  <Users className="w-6 h-6 text-indigo-500" />
                </div>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-cyan-500/20 to-cyan-400/10 backdrop-blur-sm border border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ticket Médio</p>
                  <p className="text-2xl font-bold text-cyan-500">R$ 291,40</p>
                  <p className="text-xs text-cyan-600">+3% vs. mês anterior</p>
                </div>
                <div className="bg-cyan-500/20 p-3 rounded-full">
                  <Banknote className="w-6 h-6 text-cyan-500" />
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Evolução das Vendas</h3>
                <p className="text-sm text-gray-500">Total: R$ 260.750,00</p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
                  <option value="day">Diário</option>
                  <option value="week">Semanal</option>
                  <option value="month">Mensal</option>
                  <option value="year">Anual</option>
                </select>
                <ChartLine className="w-4 h-4 md:w-5 md:h-5 text-[#6366F1]" />
              </div>
            </div>
            <div className="h-[250px] md:h-[300px]">
              <SalesEvolutionChart />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="ranking" className="space-y-4">
          <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#6366F1]/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
              <div>
                <h3 className="text-base md:text-lg font-semibold text-[#6366F1]">Ranking de Vendedores</h3>
                <p className="text-sm text-gray-500">Total de vendas: R$ 609.000,00</p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20">
                  <option value="day">Hoje</option>
                  <option value="month" selected>Este mês</option>
                  <option value="year">Este ano</option>
                </select>
              </div>
            </div>
            <SalesRanking />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

