import { useState, useEffect } from "react";
import { ChevronDown, Filter } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Card } from "../../../../ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../../ui/select";

interface ServiceOrderHeaderProps {
  selectedPeriod: string;
  selectedTechnician: string;
  onPeriodChange: (value: string) => void;
  onTechnicianChange: (value: string) => void;
  onFilterChange: (filter: string) => void;
}

export const ServiceOrderHeader = ({
  selectedPeriod,
  selectedTechnician,
  onPeriodChange,
  onTechnicianChange,
  onFilterChange,
}: ServiceOrderHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => {
    onPeriodChange("current-month");
  }, []);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
    onFilterChange(filter);
  };

  return (
    <Card className={`relative p-4 md:p-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 backdrop-blur-sm border-gray-100'}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Gestão de Ordens de Serviço</h3>
            <p className={`text-sm ${isDarkMode ? 'text-gray-200' : 'text-gray-500'}`}>Visualize e gerencie as ordens de serviço</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={selectedTechnician} onValueChange={onTechnicianChange}>
              <SelectTrigger className={`w-full sm:w-[180px] ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}`}>
                <SelectValue placeholder="Técnico" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}>
                <SelectGroup>
                  <SelectItem value="all" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Todos os Técnicos</SelectItem>
                  <SelectItem value="tech1" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Carlos Silva</SelectItem>
                  <SelectItem value="tech2" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Ana Oliveira</SelectItem>
                  <SelectItem value="tech3" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Pedro Santos</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className={`w-full sm:w-[180px] ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}`}>
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent className={isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : ''}>
                <SelectGroup>
                  <SelectItem value="current-month" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Mês Atual</SelectItem>
                  <SelectItem value="30" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Últimos 30 dias</SelectItem>
                  <SelectItem value="60" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Últimos 60 dias</SelectItem>
                  <SelectItem value="90" className={isDarkMode ? 'text-gray-200 focus:bg-gray-600 focus:text-white' : ''}>Últimos 90 dias</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md ${
                  isDarkMode 
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter size={16} />
                <span>Filtrar</span>
                <ChevronDown size={16} />
              </button>

              {isFilterOpen && (
                <div 
                  className={`absolute right-0 mt-1 w-48 rounded-md shadow-lg z-10 ${
                    isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
                  }`}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleFilterChange('all')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? `${selectedFilter === 'all' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`
                          : `${selectedFilter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      Todas as Ordens
                    </button>
                    <button
                      onClick={() => handleFilterChange('in-progress')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? `${selectedFilter === 'in-progress' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`
                          : `${selectedFilter === 'in-progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      Em Andamento
                    </button>
                    <button
                      onClick={() => handleFilterChange('completed')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? `${selectedFilter === 'completed' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`
                          : `${selectedFilter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      Finalizadas
                    </button>
                    <button
                      onClick={() => handleFilterChange('delayed')}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        isDarkMode 
                          ? `${selectedFilter === 'delayed' ? 'bg-gray-600 text-white' : 'text-gray-200 hover:bg-gray-600'}`
                          : `${selectedFilter === 'delayed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`
                      }`}
                    >
                      Atrasadas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
