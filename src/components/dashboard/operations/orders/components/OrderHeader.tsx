
import { useEffect } from "react";
import { Card } from "../../../../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";

interface OrderHeaderProps {
  selectedSeller: string;
  selectedRange: string;
  onSellerChange: (value: string) => void;
  onRangeChange: (value: string) => void;
}

export const OrderHeader = ({ selectedSeller, selectedRange, onSellerChange, onRangeChange }: OrderHeaderProps) => {
  useEffect(() => {
    onRangeChange("current-month");
  }, []);

  return (
    <Card className="relative p-4 md:p-6 bg-white/50 backdrop-blur-sm border border-gray-100">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700">Métricas de Pedidos</h3>
            <p className="text-sm text-gray-500">Acompanhe o desempenho dos pedidos</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={selectedSeller} onValueChange={onSellerChange}>
              <SelectTrigger className="w-full sm:w-[160px] h-9 px-3 text-sm bg-white border-gray-200">
                <SelectValue placeholder="Todos os vendedores" />
              </SelectTrigger>
              <SelectContent className="z-50 bg-white">
                <SelectItem value="all">Todos os vendedores</SelectItem>
                <SelectItem value="joao">João Silva</SelectItem>
                <SelectItem value="maria">Maria Santos</SelectItem>
                <SelectItem value="pedro">Pedro Oliveira</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedRange} onValueChange={onRangeChange}>
              <SelectTrigger className="w-full sm:w-[140px] h-9 px-3 text-sm bg-white border-gray-200">
                <SelectValue placeholder="Mês Atual" />
              </SelectTrigger>
              <SelectContent align="end" className="z-50 bg-white">
                <SelectGroup>
                  <SelectItem value="current-day">Hoje</SelectItem>
                  <SelectItem value="current-week">Semana Atual</SelectItem>
                  <SelectItem value="current-month">Mês Atual</SelectItem>
                  <SelectItem value="current-year">Ano Atual</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="7D">Últimos 7 dias</SelectItem>
                  <SelectItem value="15D">Últimos 15 dias</SelectItem>
                  <SelectItem value="30D">Últimos 30 dias</SelectItem>
                  <SelectItem value="60D">Últimos 60 dias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
