
import { useEffect } from "react";
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
    onPeriodChange("30");
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        Gestão de Ordens de Serviço
      </h2>
      <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <Select value={selectedTechnician} onValueChange={onTechnicianChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Selecione um técnico" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Técnicos</SelectLabel>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="joao">João Silva</SelectItem>
              <SelectItem value="maria">Maria Santos</SelectItem>
              <SelectItem value="pedro">Pedro Oliveira</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Período</SelectLabel>
              <SelectItem value="7">Últimos 7 dias</SelectItem>
              <SelectItem value="15">Últimos 15 dias</SelectItem>
              <SelectItem value="30">Últimos 30 dias</SelectItem>
              <SelectItem value="90">Últimos 90 dias</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
