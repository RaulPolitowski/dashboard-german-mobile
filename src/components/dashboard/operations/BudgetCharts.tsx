
import { Card } from '../../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { BudgetEvolutionChart } from './charts/BudgetEvolutionChart';
import { ConversionChart } from './charts/ConversionChart';

const mockData = [
  { month: 'Jan', aprovados: 45, valorAprovados: 320000, pendentes: 15, valorPendentes: 98000, recusados: 8, valorRecusados: 45000 },
  { month: 'Fev', aprovados: 50, valorAprovados: 375000, pendentes: 12, valorPendentes: 85000, recusados: 10, valorRecusados: 62000 },
  { month: 'Mar', aprovados: 48, valorAprovados: 350000, pendentes: 18, valorPendentes: 120000, recusados: 7, valorRecusados: 38000 },
  { month: 'Abr', aprovados: 52, valorAprovados: 390000, pendentes: 14, valorPendentes: 95000, recusados: 9, valorRecusados: 52000 },
  { month: 'Mai', aprovados: 55, valorAprovados: 420000, pendentes: 16, valorPendentes: 110000, recusados: 11, valorRecusados: 68000 },
  { month: 'Jun', aprovados: 58, valorAprovados: 450000, pendentes: 13, valorPendentes: 89000, recusados: 8, valorRecusados: 48000 },
];

const conversionData = [
  { month: 'Jan', aprovados: 45, pendentes: 15, vencidos: 5, taxa: 65, valorAprovados: 320000, valorPendentes: 98000, valorVencidos: 45000 },
  { month: 'Fev', aprovados: 50, pendentes: 12, vencidos: 6, taxa: 68, valorAprovados: 375000, valorPendentes: 85000, valorVencidos: 62000 },
  { month: 'Mar', aprovados: 48, pendentes: 18, vencidos: 4, taxa: 62, valorAprovados: 350000, valorPendentes: 120000, valorVencidos: 38000 },
  { month: 'Abr', aprovados: 52, pendentes: 14, vencidos: 7, taxa: 70, valorAprovados: 390000, valorPendentes: 95000, valorVencidos: 52000 },
  { month: 'Mai', aprovados: 55, pendentes: 16, vencidos: 5, taxa: 72, valorAprovados: 420000, valorPendentes: 110000, valorVencidos: 68000 },
  { month: 'Jun', aprovados: 58, pendentes: 13, vencidos: 6, taxa: 75, valorAprovados: 450000, valorPendentes: 89000, valorVencidos: 48000 },
];

export const BudgetCharts = () => {
  const [isMinimized1, setIsMinimized1] = useState(false);
  const [isMinimized2, setIsMinimized2] = useState(false);
  const [timeFilter, setTimeFilter] = useState("3");

  const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

  const totals = mockData.reduce((acc, item) => ({
    aprovados: acc.aprovados + item.aprovados,
    valorAprovados: acc.valorAprovados + item.valorAprovados,
    pendentes: acc.pendentes + item.pendentes,
    valorPendentes: acc.valorPendentes + item.valorPendentes,
    recusados: acc.recusados + item.recusados,
    valorRecusados: acc.valorRecusados + item.valorRecusados,
  }), {
    aprovados: 0,
    valorAprovados: 0,
    pendentes: 0,
    valorPendentes: 0,
    recusados: 0,
    valorRecusados: 0
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-end gap-2 mb-2">
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="this-month">Este Mês</option>
          <option value="3">3 meses</option>
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
        </select>
      </div>

      <Card className="p-6">
        {isMinimized1 ? (
          <div 
            className="cursor-pointer"
            onClick={() => setIsMinimized1(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Evolução de Orçamentos</h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Evolução de Orçamentos</h3>
              <button 
                onClick={() => setIsMinimized1(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-[300px]">
              <BudgetEvolutionChart 
                data={mockData.slice(-Number(timeFilter))} 
                timeFilter={timeFilter}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="p-3 rounded-lg bg-emerald-50">
                <p className="text-emerald-600 font-medium">Aprovados</p>
                <p className="mt-1">Quantidade: {totals.aprovados}</p>
                <p className="mt-1">Valor: {formatCurrency(totals.valorAprovados)}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <p className="text-amber-600 font-medium">Pendentes</p>
                <p className="mt-1">Quantidade: {totals.pendentes}</p>
                <p className="mt-1">Valor: {formatCurrency(totals.valorPendentes)}</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50">
                <p className="text-rose-600 font-medium">Recusados</p>
                <p className="mt-1">Quantidade: {totals.recusados}</p>
                <p className="mt-1">Valor: {formatCurrency(totals.valorRecusados)}</p>
              </div>
            </div>
          </>
        )}
      </Card>

      <Card className="p-6">
        {isMinimized2 ? (
          <div 
            className="cursor-pointer"
            onClick={() => setIsMinimized2(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Taxa de Conversão e Status</h3>
              <ChevronDown className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Taxa de Conversão e Status</h3>
              <button 
                onClick={() => setIsMinimized2(true)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-[300px]">
              <ConversionChart data={conversionData.slice(-Number(timeFilter))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-indigo-50">
                <p className="text-indigo-600 font-medium">Taxa de Conversão</p>
                <p className="mt-1 text-sm">{conversionData[conversionData.length - 1].taxa}%</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50">
                <p className="text-emerald-600 font-medium">Aprovados</p>
                <p className="mt-1 text-sm">{conversionData[conversionData.length - 1].aprovados}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <p className="text-amber-600 font-medium">Pendentes</p>
                <p className="mt-1 text-sm">{conversionData[conversionData.length - 1].pendentes}</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50">
                <p className="text-rose-600 font-medium">Vencidos</p>
                <p className="mt-1 text-sm">{conversionData[conversionData.length - 1].vencidos}</p>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
