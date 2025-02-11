
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import { BarChart, LineChart, PieChart, DollarSign, CheckCircle, Clock, AlertTriangle } from "lucide-react";

export const OperationsSection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="budgets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="budgets">Orçamentos</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="service-orders">Ordens de Serviço</TabsTrigger>
        </TabsList>

        <TabsContent value="budgets" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-emerald-500 text-white border-none">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/90">Total de Orçamentos</p>
                  <h3 className="text-2xl font-bold">158</h3>
                  <p className="text-sm text-white/90">+12% vs. mês anterior</p>
                </div>
                <BarChart className="h-6 w-6 text-white" />
              </div>
            </Card>
            <Card className="p-4 bg-blue-500 text-white border-none">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/90">Taxa de Conversão</p>
                  <h3 className="text-2xl font-bold">68%</h3>
                  <p className="text-sm text-white/90">+5% vs. mês anterior</p>
                </div>
                <LineChart className="h-6 w-6 text-white" />
              </div>
            </Card>
            <Card className="p-4 bg-emerald-500 text-white border-none">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/90">Valor Médio</p>
                  <h3 className="text-2xl font-bold">R$ 2.850</h3>
                  <p className="text-sm text-white/90">+8% vs. mês anterior</p>
                </div>
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </Card>
            <Card className="p-4 bg-amber-500 text-white border-none">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white/90">Tempo Médio Aprovação</p>
                  <h3 className="text-2xl font-bold">3.2 dias</h3>
                  <p className="text-sm text-white/90">-1 dia vs. mês anterior</p>
                </div>
                <Clock className="h-6 w-6 text-white" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Status dos Orçamentos</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-emerald-600" />
                    <span>Aprovados</span>
                  </div>
                  <span className="font-semibold text-emerald-600">82</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="text-amber-600" />
                    <span>Em Análise</span>
                  </div>
                  <span className="font-semibold text-amber-600">45</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-rose-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="text-rose-600" />
                    <span>Recusados</span>
                  </div>
                  <span className="font-semibold text-rose-600">31</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Distribuição por Categoria</h3>
              <div className="flex items-center justify-around h-48">
                <div className="text-center">
                  <PieChart className="h-32 w-32 mx-auto text-blue-600" />
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                      <span>Produtos (45%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                      <span>Serviços (35%)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-amber-500 rounded-full"></span>
                      <span>Projetos (20%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-indigo-800 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-indigo-200">Pedidos Ativos</p>
                  <h3 className="text-2xl font-bold">94</h3>
                  <p className="text-sm text-indigo-200">+8% vs. mês anterior</p>
                </div>
                <BarChart className="h-6 w-6 text-indigo-200" />
              </div>
            </Card>
            {/* Adicione mais cards de métricas de pedidos conforme necessário */}
          </div>
        </TabsContent>

        <TabsContent value="service-orders" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-indigo-800 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-indigo-200">OS em Andamento</p>
                  <h3 className="text-2xl font-bold">126</h3>
                  <p className="text-sm text-indigo-200">+15% vs. mês anterior</p>
                </div>
                <BarChart className="h-6 w-6 text-indigo-200" />
              </div>
            </Card>
            {/* Adicione mais cards de métricas de OS conforme necessário */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
