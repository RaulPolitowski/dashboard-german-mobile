
import { ArrowDown, ArrowUp, ChartBar, ChartLine, ChartPie, DollarSign, Package, Percent, TrendingUp, User, Wallet } from "lucide-react";
import { Card } from "./ui/card";
import { SalesEvolutionChart } from "./charts/SalesEvolutionChart";
import { ExpensesDistributionChart } from "./charts/ExpensesDistributionChart";
import { CashFlowChart } from "./charts/CashFlowChart";

const Dashboard = () => {
  return (
    <div className="p-3 md:p-6 space-y-4 md:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#F97316] bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <p className="text-sm md:text-base text-gray-500">Visão estratégica e operacional do seu negócio</p>
        </div>
      </div>

      {/* KPIs - Financeiro */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#8B5CF6] flex items-center gap-2">
          <Wallet className="w-4 h-4 md:w-5 md:h-5" />
          Financeiro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 backdrop-blur-sm border border-[#8B5CF6]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Receita Total</p>
                <p className="text-2xl font-bold text-[#8B5CF6]">R$ 72.000,00</p>
                <p className="text-xs text-success-DEFAULT">+8% vs. mês anterior</p>
              </div>
              <div className="bg-[#8B5CF6]/20 p-3 rounded-full">
                <ArrowUp className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#D946EF]/10 to-[#D946EF]/5 backdrop-blur-sm border border-[#D946EF]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Despesas Totais</p>
                <p className="text-2xl font-bold text-[#D946EF]">R$ 65.000,00</p>
                <p className="text-xs text-danger-DEFAULT">+5% vs. mês anterior</p>
              </div>
              <div className="bg-[#D946EF]/20 p-3 rounded-full">
                <ArrowDown className="w-6 h-6 text-[#D946EF]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 backdrop-blur-sm border border-[#0EA5E9]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resultado do Mês</p>
                <p className="text-2xl font-bold text-[#0EA5E9]">R$ 7.000,00</p>
                <p className="text-xs text-success-DEFAULT">+15% vs. mês anterior</p>
              </div>
              <div className="bg-[#0EA5E9]/20 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-[#0EA5E9]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* KPIs - Vendas */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#F97316] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
          Vendas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 backdrop-blur-sm border border-[#F97316]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vendas do Dia</p>
                <p className="text-2xl font-bold text-[#F97316]">R$ 2.500,00</p>
                <p className="text-xs text-success-DEFAULT">15 vendas hoje</p>
              </div>
              <div className="bg-[#F97316]/20 p-3 rounded-full">
                <Package className="w-6 h-6 text-[#F97316]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#8B5CF6]/10 to-[#8B5CF6]/5 backdrop-blur-sm border border-[#8B5CF6]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vendas do Mês</p>
                <p className="text-2xl font-bold text-[#8B5CF6]">R$ 45.750,00</p>
                <p className="text-xs text-success-DEFAULT">157 vendas no mês</p>
              </div>
              <div className="bg-[#8B5CF6]/20 p-3 rounded-full">
                <ChartBar className="w-6 h-6 text-[#8B5CF6]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 backdrop-blur-sm border border-[#0EA5E9]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Média de Vendas</p>
                <p className="text-2xl font-bold text-[#0EA5E9]">R$ 291,40</p>
                <p className="text-xs text-warning-DEFAULT">-2% vs. mês anterior</p>
              </div>
              <div className="bg-[#0EA5E9]/20 p-3 rounded-full">
                <Percent className="w-6 h-6 text-[#0EA5E9]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#8B5CF6]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-[#8B5CF6]">Evolução das Vendas</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20">
                <option value="day">Diário</option>
                <option value="week">Semanal</option>
                <option value="month">Mensal</option>
                <option value="year">Anual</option>
              </select>
              <ChartLine className="w-4 h-4 md:w-5 md:h-5 text-[#8B5CF6]" />
            </div>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <SalesEvolutionChart />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#D946EF]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-[#D946EF]">Distribuição de Despesas</h3>
            <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-[#D946EF]" />
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ExpensesDistributionChart />
          </div>
        </Card>

        <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#F97316]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-[#F97316]">Fluxo de Caixa</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]/20">
                <option value="3">Últimos 3 meses</option>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Último ano</option>
              </select>
              <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-[#F97316]" />
            </div>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <CashFlowChart />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
