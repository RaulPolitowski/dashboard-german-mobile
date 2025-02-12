
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BudgetMetrics } from "./operations/BudgetMetrics";
import { ServiceOrderMetrics } from "./operations/service-orders/ServiceOrderMetrics";
import { Card } from "../ui/card";
import { BarChart } from "lucide-react";

export const OperationsSection = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="budgets" className="space-y-4">
        <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <TabsTrigger 
            value="budgets"
            className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
          >
            Orçamentos
          </TabsTrigger>
          <TabsTrigger 
            value="orders"
            className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
          >
            Pedidos
          </TabsTrigger>
          <TabsTrigger 
            value="service-orders"
            className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white"
          >
            Ordens de Serviço
          </TabsTrigger>
        </TabsList>

        <TabsContent value="budgets" className="space-y-4">
          <BudgetMetrics />
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
          </div>
        </TabsContent>

        <TabsContent value="service-orders" className="space-y-4">
          <ServiceOrderMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
