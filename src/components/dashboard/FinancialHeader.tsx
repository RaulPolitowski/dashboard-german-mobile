
import React from 'react';
import { useTheme } from '../../hooks/use-theme';

export const FinancialHeader = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Bom dia';
    if (hour >= 12 && hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      <div>
        <div className="flex flex-wrap items-baseline gap-x-2 mb-2">
          <span className={`font-serif italic text-xl ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>{getGreeting()}, Raul!</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#0EA5E9] bg-clip-text text-transparent">
          Painel do Gestor 2.0
        </h1>
        <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Visão estratégica e operacional do seu negócio</p>
      </div>
    </div>
  );
};
