
import React from 'react';

export const FinancialHeader = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#6366F1] to-[#0EA5E9] bg-clip-text text-transparent">
          Painel do Gestor 2.0
        </h1>
        <p className="text-sm md:text-base text-gray-500">Visão estratégica e operacional do seu negócio</p>
      </div>
    </div>
  );
};
