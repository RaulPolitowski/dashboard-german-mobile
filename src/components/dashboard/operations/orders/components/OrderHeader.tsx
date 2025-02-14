
import { Card } from "../../../../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../ui/select";

interface OrderHeaderProps {
  selectedSeller: string;
  selectedRange: string;
  onSellerChange: (value: string) => void;
  onRangeChange: (value: string) => void;
}

export const OrderHeader = ({ selectedSeller, selectedRange, onSellerChange, onRangeChange }: OrderHeaderProps) => {
  const timeRanges = ["7D", "15D", "30D", "90D"] as const;

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700">Métricas de Pedidos</h3>
            <p className="text-sm text-gray-500">Acompanhe o desempenho dos pedidos</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Select value={selectedSeller} onValueChange={onSellerChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecione um vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vendedores</SelectLabel>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={selectedRange} onValueChange={onRangeChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Período</SelectLabel>
                  {timeRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      Últimos {range}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
