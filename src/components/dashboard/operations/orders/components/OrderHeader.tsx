
import { useEffect } from "react";
import { Card } from "../../../../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../ui/select";

interface OrderHeaderProps {
  selectedSeller: string;
  selectedRange: string;
  onSellerChange: (value: string) => void;
  onRangeChange: (value: string) => void;
}

export const OrderHeader = ({ selectedSeller, selectedRange, onSellerChange, onRangeChange }: OrderHeaderProps) => {
  useEffect(() => {
    // Definir mês atual por padrão
    onRangeChange("current-month");
  }, []);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700">Métricas de Pedidos</h3>
            <p className="text-sm text-gray-500">Acompanhe o desempenho dos pedidos</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
            <Select value={selectedSeller} onValueChange={onSellerChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecione um vendedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vendedores</SelectLabel>
                  <SelectItem value="all">Todos os vendedores</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                  <SelectItem value="ana">Ana Costa</SelectItem>
                  <SelectItem value="carlos">Carlos Souza</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={selectedRange} onValueChange={onRangeChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Período Atual</SelectLabel>
                  <SelectItem value="current-day">Hoje</SelectItem>
                  <SelectItem value="current-week">Semana Atual</SelectItem>
                  <SelectItem value="current-month">Mês Atual</SelectItem>
                  <SelectItem value="current-quarter">Trimestre Atual</SelectItem>
                  <SelectItem value="current-year">Ano Atual</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Últimos Períodos</SelectLabel>
                  <SelectItem value="7D">Últimos 7 dias</SelectItem>
                  <SelectItem value="15D">Últimos 15 dias</SelectItem>
                  <SelectItem value="30D">Últimos 30 dias</SelectItem>
                  <SelectItem value="60D">Últimos 60 dias</SelectItem>
                  <SelectItem value="90D">Últimos 90 dias</SelectItem>
                  <SelectItem value="180D">Últimos 180 dias</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>Períodos Anteriores</SelectLabel>
                  <SelectItem value="last-month">Mês Anterior</SelectItem>
                  <SelectItem value="last-quarter">Trimestre Anterior</SelectItem>
                  <SelectItem value="last-year">Ano Anterior</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
};
