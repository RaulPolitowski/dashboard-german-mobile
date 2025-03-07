import { Card } from '../../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { BudgetEvolutionChart } from './charts/BudgetEvolutionChart';
import { ConversionChart } from './charts/ConversionChart';
import { useTheme } from '../../../hooks/use-theme';

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
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

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
          className={`px-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 ${isDarkMode ? 'bg-slate-700 border border-slate-600 text-gray-200' : 'border border-gray-200'}`}
        >
          <option value="this-month">Este Mês</option>
          <option value="3">3 meses</option>
          <option value="6">6 meses</option>
          <option value="12">12 meses</option>
        </select>
      </div>

      <Card className={`p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`}>
        {isMinimized1 ? (
          <div 
            className="cursor-pointer"
            onClick={() => setIsMinimized1(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Evolução de Orçamentos</h3>
              <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Evolução de Orçamentos</h3>
              <button 
                onClick={() => setIsMinimized1(true)}
                className={`p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
            <div className="h-[300px]">
              <BudgetEvolutionChart 
                data={mockData.slice(-Number(timeFilter))} 
                timeFilter={timeFilter}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 border border-emerald-800/50' : 'bg-emerald-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>Aprovados</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Quantidade: {totals.aprovados}</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Valor: {formatCurrency(totals.valorAprovados)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-amber-900/30 border border-amber-800/50' : 'bg-amber-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Pendentes</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Quantidade: {totals.pendentes}</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Valor: {formatCurrency(totals.valorPendentes)}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-rose-900/30 border border-rose-800/50' : 'bg-rose-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>Recusados</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Quantidade: {totals.recusados}</p>
                <p className={`mt-1 ${isDarkMode ? 'text-gray-300' : ''}`}>Valor: {formatCurrency(totals.valorRecusados)}</p>
              </div>
            </div>
          </>
        )}
      </Card>

      <Card className={`p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`}>
        {isMinimized2 ? (
          <div 
            className="cursor-pointer"
            onClick={() => setIsMinimized2(false)}
          >
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Taxa de Conversão e Status</h3>
              <ChevronDown className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Taxa de Conversão e Status</h3>
              <button 
                onClick={() => setIsMinimized2(true)}
                className={`p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
              >
                <ChevronUp className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
            <div className="h-[300px]">
              <ConversionChart data={conversionData.slice(-Number(timeFilter))} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-indigo-900/30 border border-indigo-800/50' : 'bg-indigo-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>Taxa de Conversão</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>{conversionData[conversionData.length - 1].taxa}%</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-emerald-900/30 border border-emerald-800/50' : 'bg-emerald-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>Aprovados</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>{conversionData[conversionData.length - 1].aprovados}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-amber-900/30 border border-amber-800/50' : 'bg-amber-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>Pendentes</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>{conversionData[conversionData.length - 1].pendentes}</p>
              </div>
              <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-rose-900/30 border border-rose-800/50' : 'bg-rose-50'}`}>
                <p className={`font-medium ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>Vencidos</p>
                <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-300' : ''}`}>{conversionData[conversionData.length - 1].vencidos}</p>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
