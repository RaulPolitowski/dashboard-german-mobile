
import { ArrowDown, ArrowUp, BadgeDollarSign, Banknote, ChartBar, ChartLine, ChartPie, Receipt, TrendingUp, Wallet } from "lucide-react";
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
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1A1F2C] via-[#403E43] to-[#1EA5E9] bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <p className="text-sm md:text-base text-gray-500">Visão estratégica e operacional do seu negócio</p>
        </div>
      </div>

      {/* KPIs - Financeiro */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#1A1F2C] flex items-center gap-2">
          <Wallet className="w-4 h-4 md:w-5 md:h-5" />
          Financeiro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 backdrop-blur-sm border border-[#10B981]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Receita Total</p>
                <p className="text-2xl font-bold text-[#10B981]">R$ 72.000,00</p>
                <p className="text-xs text-success-DEFAULT">+8% vs. mês anterior</p>
              </div>
              <div className="bg-[#10B981]/20 p-3 rounded-full">
                <ArrowUp className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#EF4444]/10 to-[#EF4444]/5 backdrop-blur-sm border border-[#EF4444]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Despesas Totais</p>
                <p className="text-2xl font-bold text-[#EF4444]">R$ 65.000,00</p>
                <p className="text-xs text-danger-DEFAULT">+5% vs. mês anterior</p>
              </div>
              <div className="bg-[#EF4444]/20 p-3 rounded-full">
                <ArrowDown className="w-6 h-6 text-[#EF4444]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#1EA5E9]/10 to-[#1EA5E9]/5 backdrop-blur-sm border border-[#1EA5E9]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Resultado do Mês</p>
                <p className="text-2xl font-bold text-[#1EA5E9]">R$ 7.000,00</p>
                <p className="text-xs text-success-DEFAULT">+15% vs. mês anterior</p>
              </div>
              <div className="bg-[#1EA5E9]/20 p-3 rounded-full">
                <BadgeDollarSign className="w-6 h-6 text-[#1EA5E9]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* KPIs - Vendas */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-[#1A1F2C] flex items-center gap-2">
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
          Vendas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#1A1F2C]/10 to-[#1A1F2C]/5 backdrop-blur-sm border border-[#1A1F2C]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Vendas do Dia</p>
                <p className="text-2xl font-bold text-[#1A1F2C]">R$ 2.500,00</p>
                <p className="text-xs text-success-DEFAULT">15 vendas hoje</p>
              </div>
              <div className="bg-[#1A1F2C]/20 p-3 rounded-full">
                <Receipt className="w-6 h-6 text-[#1A1F2C]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#1A1F2C]/10 to-[#1A1F2C]/5 backdrop-blur-sm border border-[#1A1F2C]/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ticket Médio</p>
                <p className="text-2xl font-bold text-[#1A1F2C]">R$ 291,40</p>
                <p className="text-xs text-success-DEFAULT">+3% vs. mês anterior</p>
              </div>
              <div className="bg-[#1A1F2C]/20 p-3 rounded-full">
                <Banknote className="w-6 h-6 text-[#1A1F2C]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#1A1F2C]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1F2C]">Evolução das Vendas</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1F2C]/20">
                <option value="day">Diário</option>
                <option value="week">Semanal</option>
                <option value="month">Mensal</option>
                <option value="year">Anual</option>
              </select>
              <ChartLine className="w-4 h-4 md:w-5 md:h-5 text-[#1A1F2C]" />
            </div>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <SalesEvolutionChart />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#403E43]/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-[#403E43]">Distribuição de Despesas</h3>
            <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-[#403E43]" />
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ExpensesDistributionChart />
          </div>
        </Card>

        <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-[#1A1F2C]/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-[#1A1F2C]">Fluxo de Caixa</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1F2C]/20">
                <option value="3">Últimos 3 meses</option>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Último ano</option>
              </select>
              <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-[#1A1F2C]" />
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

