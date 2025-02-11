
import { AlertTriangle, Clock, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "../ui/card";

export const AccountsSection = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Contas e Previsões</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-blue-500/20 to-blue-400/10 backdrop-blur-sm border border-blue-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contas a Receber</p>
              <p className="text-2xl font-bold text-blue-500">R$ 45.000,00</p>
              <p className="text-xs text-blue-600">Próximos 30 dias</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-orange-500/20 to-orange-400/10 backdrop-blur-sm border border-orange-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Contas a Pagar</p>
              <p className="text-2xl font-bold text-orange-500">R$ 38.000,00</p>
              <p className="text-xs text-orange-600">Próximos 30 dias</p>
            </div>
            <div className="bg-orange-500/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-teal-500/20 to-teal-400/10 backdrop-blur-sm border border-teal-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Saldo Previsto</p>
              <p className="text-2xl font-bold text-teal-500">R$ 7.000,00</p>
              <p className="text-xs text-teal-600">Final do mês</p>
            </div>
            <div className="bg-teal-500/20 p-3 rounded-full">
              <PiggyBank className="w-6 h-6 text-teal-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-amber-500/20 to-amber-400/10 backdrop-blur-sm border border-amber-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recebimentos em Atraso</p>
              <p className="text-2xl font-bold text-amber-500">R$ 12.500,00</p>
              <p className="text-xs text-amber-600">8 títulos pendentes</p>
            </div>
            <div className="bg-amber-500/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-amber-500" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-red-500/20 to-red-400/10 backdrop-blur-sm border border-red-500/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pagamentos em Atraso</p>
              <p className="text-2xl font-bold text-red-500">R$ 8.300,00</p>
              <p className="text-xs text-red-600">5 títulos pendentes</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
