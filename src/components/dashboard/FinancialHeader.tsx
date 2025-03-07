
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className={`font-serif italic text-xl ${isDarkMode ? 'text-blue-300 drop-shadow-[0_0_2px_rgba(56,189,248,0.3)]' : 'text-blue-600'}`}>
          {getGreeting()}, Raul!
        </span>
      </div>
      <div className="flex flex-col items-start gap-1">
        <h1 className="text-2xl md:text-3xl font-bold flex flex-wrap items-center gap-2">
          <span className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Bem-vindo ao</span>
          <span className="bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#0EA5E9] bg-clip-text text-transparent drop-shadow-[0_0_3px_rgba(99,102,241,0.3)]">Painel do Gestor 2.0</span>
        </h1>
        <p className={`text-sm md:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Visão estratégica e operacional do seu negócio
        </p>
      </div>
    </div>
  );
};
