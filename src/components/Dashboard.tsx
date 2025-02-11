
import { ArrowDown, ArrowUp, ChartBar, ChartLine, ChartPie, DollarSign, Package, Percent, TrendingUp, User, Wallet } from "lucide-react";
import { Card } from "./ui/card";
import { TransactionDialog } from "./TransactionDialog";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-500">Visão estratégica e operacional do seu negócio</p>
        </div>
        <TransactionDialog />
      </div>

      {/* KPIs - Vendas */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-primary flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Vendas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary-light/10 to-primary-light/5 backdrop-blur-sm border border-primary-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Quantidade de Vendas</p>
                <p className="text-2xl font-bold text-primary">157</p>
                <p className="text-xs text-success-DEFAULT">+12% vs. mês anterior</p>
              </div>
              <div className="bg-primary-light/20 p-3 rounded-full">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-accent-light/10 to-accent-light/5 backdrop-blur-sm border border-accent-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Valor Total das Vendas</p>
                <p className="text-2xl font-bold text-accent-DEFAULT">R$ 45.750,00</p>
                <p className="text-xs text-success-DEFAULT">+8% vs. mês anterior</p>
              </div>
              <div className="bg-accent-light/20 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-accent-DEFAULT" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-secondary-light/10 to-secondary-light/5 backdrop-blur-sm border border-secondary-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ticket Médio</p>
                <p className="text-2xl font-bold text-secondary">R$ 291,40</p>
                <p className="text-xs text-warning-DEFAULT">-2% vs. mês anterior</p>
              </div>
              <div className="bg-secondary-light/20 p-3 rounded-full">
                <User className="w-6 h-6 text-secondary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-success-light/10 to-success-light/5 backdrop-blur-sm border border-success-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Margem de Lucro</p>
                <p className="text-2xl font-bold text-success-DEFAULT">32,5%</p>
                <p className="text-xs text-success-DEFAULT">+5% vs. mês anterior</p>
              </div>
              <div className="bg-success-light/20 p-3 rounded-full">
                <Percent className="w-6 h-6 text-success-DEFAULT" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* KPIs - Financeiro */}
      <div>
        <h2 className="text-xl font-semibold mb-3 text-secondary flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Financeiro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-success-light/10 to-success-light/5 backdrop-blur-sm border border-success-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total a Receber</p>
                <p className="text-2xl font-bold text-success-DEFAULT">R$ 15.750,00</p>
              </div>
              <div className="bg-success-light/20 p-3 rounded-full">
                <ArrowUp className="w-6 h-6 text-success-DEFAULT" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-danger-light/10 to-danger-light/5 backdrop-blur-sm border border-danger-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total a Pagar</p>
                <p className="text-2xl font-bold text-danger-DEFAULT">R$ 8.250,00</p>
              </div>
              <div className="bg-danger-light/20 p-3 rounded-full">
                <ArrowDown className="w-6 h-6 text-danger-DEFAULT" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-primary-light/10 to-primary-light/5 backdrop-blur-sm border border-primary-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Saldo Previsto</p>
                <p className="text-2xl font-bold text-primary">R$ 7.500,00</p>
              </div>
              <div className="bg-primary-light/20 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-warning-light/10 to-warning-light/5 backdrop-blur-sm border border-warning-light/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total em Atraso</p>
                <p className="text-2xl font-bold text-warning-DEFAULT">R$ 2.300,00</p>
              </div>
              <div className="bg-warning-light/20 p-3 rounded-full">
                <ChartBar className="w-6 h-6 text-warning-DEFAULT" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-primary-light/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-primary">Evolução das Vendas</h3>
            <div className="flex items-center gap-2">
              <select className="px-2 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="day">Diário</option>
                <option value="week">Semanal</option>
                <option value="month">Mensal</option>
                <option value="year">Anual</option>
              </select>
              <ChartLine className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Gráfico de Evolução das Vendas
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-secondary-light/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-secondary">Distribuição de Despesas</h3>
            <ChartPie className="w-5 h-5 text-secondary" />
          </div>
          <div className="h-[300px] flex items-center justify-center text-gray-500">
            Gráfico de Distribuição de Despesas
          </div>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="p-6 bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-primary">Últimas Transações</h3>
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Buscar..."
              className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <select className="px-3 py-1 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Todos</option>
              <option>A Pagar</option>
              <option>A Receber</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Descrição</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Tipo</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Valor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Vencimento</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="py-3 px-4">Pagamento Cliente A</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success-light/10 text-success-DEFAULT rounded-full text-xs">
                    A Receber
                  </span>
                </td>
                <td className="py-3 px-4">R$ 2.500,00</td>
                <td className="py-3 px-4">15/04/2024</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-warning-light/10 text-warning-DEFAULT rounded-full text-xs">
                    Pendente
                  </span>
                </td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-gray-50/50">
                <td className="py-3 px-4">Fornecedor XYZ</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-danger-light/10 text-danger-DEFAULT rounded-full text-xs">
                    A Pagar
                  </span>
                </td>
                <td className="py-3 px-4">R$ 1.800,00</td>
                <td className="py-3 px-4">20/04/2024</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-success-light/10 text-success-DEFAULT rounded-full text-xs">
                    Pago
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
