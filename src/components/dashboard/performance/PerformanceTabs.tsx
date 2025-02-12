
import { Card } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { SellerPerformanceChart } from "../../charts/SellerPerformanceChart";
import { SellerProductsChart } from "../../charts/SellerProductsChart";

interface PerformanceTabsProps {
  selectedSeller: { id: string; name: string };
  compareSeller: { id: string; name: string } | null;
}

export const PerformanceTabs = ({ selectedSeller, compareSeller }: PerformanceTabsProps) => {
  return (
    <Card className="p-4 md:p-6 bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-800/80 dark:to-gray-900/50 backdrop-blur-sm border border-[#6366F1]/20">
      <Tabs defaultValue="sellers" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sellers" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            Performance de Vendedores
          </TabsTrigger>
          <TabsTrigger value="products" className="data-[state=active]:bg-[#6366F1] data-[state=active]:text-white">
            Análise de Produtos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sellers" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SellerPerformanceChart 
              sellerId={selectedSeller.id}
              sellerName={selectedSeller.name}
            />
            {compareSeller && (
              <SellerPerformanceChart 
                sellerId={compareSeller.id}
                sellerName={compareSeller.name}
              />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <BestDaysCard sellerName={selectedSeller.name} />
            {compareSeller && (
              <BestDaysCard sellerName={compareSeller.name} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <SellerProductsChart 
              sellerId={selectedSeller.id}
              sellerName={selectedSeller.name}
            />
            {compareSeller && (
              <SellerProductsChart 
                sellerId={compareSeller.id}
                sellerName={compareSeller.name}
              />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
