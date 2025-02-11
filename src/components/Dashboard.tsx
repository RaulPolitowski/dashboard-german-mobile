
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
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#0EA5E9] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <p className="text-sm md:text-base text-gray-300">Visão estratégica e operacional do seu negócio</p>
        </div>
      </div>

      {/* KPIs - Financeiro */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white flex items-center gap-2">
          <Wallet className="w-4 h-4 md:w-5 md:h-5" />
          Financeiro
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#0EA5E9]/20 to-transparent backdrop-blur-xl border border-[#0EA5E9]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Receita Total</p>
                <p className="text-2xl font-bold text-[#0EA5E9]">R$ 72.000,00</p>
                <p className="text-xs text-success-DEFAULT">+8% vs. mês anterior</p>
              </div>
              <div className="bg-[#0EA5E9]/20 p-3 rounded-full">
                <ArrowUp className="w-6 h-6 text-[#0EA5E9]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#2563EB]/20 to-transparent backdrop-blur-xl border border-[#2563EB]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Despesas Totais</p>
                <p className="text-2xl font-bold text-[#2563EB]">R$ 65.000,00</p>
                <p className="text-xs text-danger-DEFAULT">+5% vs. mês anterior</p>
              </div>
              <div className="bg-[#2563EB]/20 p-3 rounded-full">
                <ArrowDown className="w-6 h-6 text-[#2563EB]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#3B82F6]/20 to-transparent backdrop-blur-xl border border-[#3B82F6]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Resultado do Mês</p>
                <p className="text-2xl font-bold text-[#3B82F6]">R$ 7.000,00</p>
                <p className="text-xs text-success-DEFAULT">+15% vs. mês anterior</p>
              </div>
              <div className="bg-[#3B82F6]/20 p-3 rounded-full">
                <BadgeDollarSign className="w-6 h-6 text-[#3B82F6]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* KPIs - Vendas */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
          Vendas
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#0EA5E9]/20 to-transparent backdrop-blur-xl border border-[#0EA5E9]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Vendas do Dia</p>
                <p className="text-2xl font-bold text-[#0EA5E9]">R$ 2.500,00</p>
                <p className="text-xs text-success-DEFAULT">15 vendas hoje</p>
              </div>
              <div className="bg-[#0EA5E9]/20 p-3 rounded-full">
                <Receipt className="w-6 h-6 text-[#0EA5E9]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#2563EB]/20 to-transparent backdrop-blur-xl border border-[#2563EB]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Vendas do Mês</p>
                <p className="text-2xl font-bold text-[#2563EB]">R$ 45.750,00</p>
                <p className="text-xs text-success-DEFAULT">157 vendas no mês</p>
              </div>
              <div className="bg-[#2563EB]/20 p-3 rounded-full">
                <Banknote className="w-6 h-6 text-[#2563EB]" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-[#3B82F6]/20 to-transparent backdrop-blur-xl border border-[#3B82F6]/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Média de Vendas</p>
                <p className="text-2xl font-bold text-[#3B82F6]">R$ 291,40</p>
                <p className="text-xs text-warning-DEFAULT">-2% vs. mês anterior</p>
              </div>
              <div className="bg-[#3B82F6]/20 p-3 rounded-full">
                <ChartBar className="w-6 h-6 text-[#3B82F6]" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-[#0A0F1E]/40 backdrop-blur-xl border border-[#0EA5E9]/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-white">Evolução das Vendas</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm bg-[#1A1F2C] border border-[#0EA5E9]/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20">
                <option value="day">Diário</option>
                <option value="week">Semanal</option>
                <option value="month">Mensal</option>
                <option value="year">Anual</option>
              </select>
              <ChartLine className="w-4 h-4 md:w-5 md:h-5 text-[#0EA5E9]" />
            </div>
          </div>
          <div className="h-[250px] md:h-[300px]">
            <SalesEvolutionChart />
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-[#0A0F1E]/40 backdrop-blur-xl border border-[#2563EB]/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base md:text-lg font-semibold text-white">Distribuição de Despesas</h3>
            <ChartPie className="w-4 h-4 md:w-5 md:h-5 text-[#2563EB]" />
          </div>
          <div className="h-[250px] md:h-[300px]">
            <ExpensesDistributionChart />
          </div>
        </Card>

        <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 bg-[#0A0F1E]/40 backdrop-blur-xl border border-[#3B82F6]/30">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 md:gap-0">
            <h3 className="text-base md:text-lg font-semibold text-white">Fluxo de Caixa</h3>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <select className="w-full md:w-auto px-2 py-1 text-sm bg-[#1A1F2C] border border-[#3B82F6]/30 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20">
                <option value="3">Últimos 3 meses</option>
                <option value="6">Últimos 6 meses</option>
                <option value="12">Último ano</option>
              </select>
              <ChartBar className="w-4 h-4 md:w-5 md:h-5 text-[#3B82F6]" />
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

