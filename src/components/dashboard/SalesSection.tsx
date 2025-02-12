
import { Receipt, Users, Banknote, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import { SalesEvolutionChart } from "../charts/SalesEvolutionChart";
import { PaymentMethodChart } from "../charts/PaymentMethodChart";
import { PaymentMethodTable } from "../charts/PaymentMethodTable";
import { WeeklySalesChart } from "../charts/WeeklySalesChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const todaysSales = [
  { 
    id: 1, 
    datetime: "2024-02-20T09:30:00", 
    value: 450.00, 
    paymentMethod: "Cartão de Crédito",
    seller: "João Silva"
  },
  { 
    id: 2, 
    datetime: "2024-02-20T10:15:00", 
    value: 280.50, 
    paymentMethod: "PIX",
    seller: "Maria Santos"
  },
  { 
    id: 3, 
    datetime: "2024-02-20T11:45:00", 
    value: 890.00, 
    paymentMethod: "Cartão de Débito",
    seller: "Carlos Oliveira"
  },
  // ... adicione mais vendas conforme necessário
];

export const SalesSection = () => {
  const [showDailySales, setShowDailySales] = useState(false);
  const [isInsightsMinimized, setInsightsMinimized] = useState(false);
  const [isEvolutionMinimized, setEvolutionMinimized] = useState(false);
  const [isWeeklyMinimized, setWeeklyMinimized] = useState(false);
  const [isPaymentMethodMinimized, setPaymentMethodMinimized] = useState(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        <Card 
          className="p-4 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-br from-blue-500/20 to-blue-400/10 backdrop-blur-sm border border-blue-500/30"
          onClick={() => setShowDailySales(true)}
        >
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

      {/* Card de Evolução de Vendas */}
      <Card className="p-4 md:p-6">
        {isEvolutionMinimized ? (
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setEvolutionMinimized(false)}
          >
            <h3 className="text-lg font-semibold text-gray-700">Evolução das Vendas</h3>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-700">Evolução das Vendas</h3>
              <button 
                onClick={() => setEvolutionMinimized(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-[300px]">
              <SalesEvolutionChart />
            </div>
          </>
        )}
      </Card>

      {/* Weekly Sales Chart */}
      <Card className="p-4 md:p-6">
        {isWeeklyMinimized ? (
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setWeeklyMinimized(false)}
          >
            <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Análise de Vendas por Dia e Horário</h3>
                <p className="text-sm text-gray-500">Distribuição semanal de vendas por intervalo de horário</p>
              </div>
              <button 
                onClick={() => setWeeklyMinimized(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            {!isInsightsMinimized && <WeeklySalesChart />}
            <div className="mt-4">
              <div 
                className="flex items-center justify-between cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setInsightsMinimized(!isInsightsMinimized)}
              >
                <h4 className="font-medium text-gray-700">Insights</h4>
                {isInsightsMinimized ? (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                )}
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Formas de Pagamento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4 md:p-6">
          {isPaymentMethodMinimized ? (
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setPaymentMethodMinimized(false)}
            >
              <h3 className="text-lg font-semibold text-gray-700">Vendas por Forma de Pagamento</h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-700">Vendas por Forma de Pagamento</h3>
                <button 
                  onClick={() => setPaymentMethodMinimized(true)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <PaymentMethodChart />
            </>
          )}
        </Card>
        <PaymentMethodTable />
      </div>

      {/* Dialog de Vendas do Dia */}
      <Dialog open={showDailySales} onOpenChange={setShowDailySales}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Vendas do Dia</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto flex-1">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Horário</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Forma de Pagamento</TableHead>
                  <TableHead>Vendedor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>
                      {new Date(sale.datetime).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </TableCell>
                    <TableCell>R$ {sale.value.toLocaleString()}</TableCell>
                    <TableCell>{sale.paymentMethod}</TableCell>
                    <TableCell>{sale.seller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
