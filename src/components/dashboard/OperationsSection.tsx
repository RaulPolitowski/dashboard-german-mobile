
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { BudgetMetrics } from "./operations/BudgetMetrics";
import { ServiceOrderMetrics } from "./operations/service-orders/ServiceOrderMetrics";
import { OrderMetrics } from "./operations/orders/OrderMetrics";

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
          <OrderMetrics />
        </TabsContent>

        <TabsContent value="service-orders" className="space-y-4">
          <ServiceOrderMetrics />
        </TabsContent>
      </Tabs>
    </div>
  );
};
