
import { AlertTriangle, Clock, CreditCard, PiggyBank } from "lucide-react";
import { Card } from "../ui/card";

export const AccountsSection = () => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-gray-700">Contas e Previsões</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-emerald-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Contas a Receber</p>
              <p className="text-2xl font-bold text-white">R$ 45.000,00</p>
              <p className="text-xs text-white/90">Próximos 30 dias</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-rose-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Contas a Pagar</p>
              <p className="text-2xl font-bold text-white">R$ 38.000,00</p>
              <p className="text-xs text-white/90">Próximos 30 dias</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-blue-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Saldo Previsto</p>
              <p className="text-2xl font-bold text-white">R$ 7.000,00</p>
              <p className="text-xs text-white/90">Final do mês</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <PiggyBank className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-amber-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Recebimentos em Atraso</p>
              <p className="text-2xl font-bold text-white">R$ 12.500,00</p>
              <p className="text-xs text-white/90">8 títulos pendentes</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-lg transition-all cursor-pointer bg-rose-500 border-none">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/90">Pagamentos em Atraso</p>
              <p className="text-2xl font-bold text-white">R$ 8.300,00</p>
              <p className="text-xs text-white/90">5 títulos pendentes</p>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
