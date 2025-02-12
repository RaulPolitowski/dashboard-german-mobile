
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
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Métricas de Pedidos</h3>
      <div className="flex flex-col md:flex-row gap-4">
        <Select value={selectedSeller} onValueChange={onSellerChange}>
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
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
  );
};
