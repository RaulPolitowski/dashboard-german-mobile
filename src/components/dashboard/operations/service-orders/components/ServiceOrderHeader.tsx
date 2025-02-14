
import { useEffect } from "react";
import { Card } from "../../../../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../../../ui/select";

interface ServiceOrderHeaderProps {
  selectedPeriod: string;
  selectedTechnician: string;
  onPeriodChange: (value: string) => void;
  onTechnicianChange: (value: string) => void;
}

export const ServiceOrderHeader = ({
  selectedPeriod,
  selectedTechnician,
  onPeriodChange,
  onTechnicianChange,
}: ServiceOrderHeaderProps) => {
  useEffect(() => {
    // Definir mês atual por padrão
    onPeriodChange("current-month");
  }, []);

  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700">Gestão de Ordens de Serviço</h3>
            <p className="text-sm text-gray-500">Visualize e gerencie as ordens de serviço</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full sm:w-auto">
            <Select value={selectedTechnician} onValueChange={onTechnicianChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Selecione um técnico" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Técnicos</SelectLabel>
                  <SelectItem value="all">Todos os técnicos</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                  <SelectItem value="ana">Ana Costa</SelectItem>
                  <SelectItem value="carlos">Carlos Souza</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
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
                  <SelectItem value="7">Últimos 7 dias</SelectItem>
                  <SelectItem value="15">Últimos 15 dias</SelectItem>
                  <SelectItem value="30">Últimos 30 dias</SelectItem>
                  <SelectItem value="60">Últimos 60 dias</SelectItem>
                  <SelectItem value="90">Últimos 90 dias</SelectItem>
                  <SelectItem value="180">Últimos 180 dias</SelectItem>
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
