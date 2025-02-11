
import { Receipt, Users, Banknote } from "lucide-react";
import { Card } from "../ui/card";
import { SalesEvolutionChart } from "../charts/SalesEvolutionChart";
import { PaymentMethodChart } from "../charts/PaymentMethodChart";
import { PaymentMethodTable } from "../charts/PaymentMethodTable";

export const SalesSection = () => {
  return (
    <div className="space-y-4">
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

      <Card className="p-4 md:p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Evolução das Vendas</h3>
        <div className="h-[300px]">
          <SalesEvolutionChart />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Vendas por Forma de Pagamento</h3>
          <PaymentMethodChart />
        </Card>
        <PaymentMethodTable />
      </div>
    </div>
  );
};
