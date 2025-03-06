
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const performanceData = {
  daily: [
    { hour: '08-10', sales: 2500, transactions: 8, profit: 750 },
    { hour: '10-12', sales: 3800, transactions: 12, profit: 1140 },
    { hour: '12-14', sales: 4200, transactions: 15, profit: 1260 },
    { hour: '14-16', sales: 3600, transactions: 10, profit: 1080 },
    { hour: '16-18', sales: 5100, transactions: 18, profit: 1530 },
    { hour: '18-20', sales: 4800, transactions: 16, profit: 1440 },
  ],
  weekly: [
    { day: 'Segunda', sales: 12500, transactions: 45, profit: 3750 },
    { day: 'Terça', sales: 15800, transactions: 52, profit: 4740 },
    { day: 'Quarta', sales: 14200, transactions: 48, profit: 4260 },
    { day: 'Quinta', sales: 16500, transactions: 55, profit: 4950 },
    { day: 'Sexta', sales: 18900, transactions: 63, profit: 5670 },
    { day: 'Sábado', sales: 21000, transactions: 70, profit: 6300 },
    { day: 'Domingo', sales: 9800, transactions: 32, profit: 2940 },
  ],
  monthly: [
    { week: 'Semana 1', sales: 85000, transactions: 280, profit: 25500 },
    { week: 'Semana 2', sales: 92000, transactions: 305, profit: 27600 },
    { week: 'Semana 3', sales: 88500, transactions: 295, profit: 26550 },
    { week: 'Semana 4', sales: 95000, transactions: 315, profit: 28500 },
  ]
};

interface SellerPerformanceChartProps {
  sellerId: string;
  sellerName: string;
}

export const SellerPerformanceChart = ({ sellerId, sellerName }: SellerPerformanceChartProps) => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [isMinimized, setIsMinimized] = useState(false);

  const data = performanceData[period];
  const xDataKey = period === 'daily' ? 'hour' : period === 'weekly' ? 'day' : 'week';

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">{label}</p>
          {payload.map((entry: any) => (
            <p key={entry.name} className="text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {entry.name === 'sales' ? 'Vendas: ' : 
                 entry.name === 'transactions' ? 'Transações: ' : 'Lucro: '}
              </span>
              <span className="font-medium text-[#6366F1]">
                {entry.name === 'sales' || entry.name === 'profit' ? 
                  `R$ ${entry.value.toLocaleString()}` : 
                  entry.value}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 md:p-6">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Performance de {sellerName}
          </h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Performance de {sellerName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Análise de vendas, transações e lucro
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as 'daily' | 'weekly' | 'monthly')}
                className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 dark:bg-gray-800 dark:text-gray-200"
              >
                <option value="daily">Hoje</option>
                <option value="weekly">Esta semana</option>
                <option value="monthly">Este mês</option>
              </select>
              <button 
                onClick={() => setIsMinimized(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis 
                  dataKey={xDataKey}
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  yAxisId="left"
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickFormatter={(value) => `R$ ${(value / 1000)}k`}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: '#6b7280' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="sales" name="Vendas" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="transactions" name="Transações" fill="#34d399" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="profit" name="Lucro" fill="#f472b6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-500/10 to-indigo-400/5 dark:from-indigo-500/20 dark:to-indigo-400/10 border border-indigo-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total em Vendas</p>
              <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                R$ {data.reduce((acc, curr) => acc + curr.sales, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-emerald-400/5 dark:from-emerald-500/20 dark:to-emerald-400/10 border border-emerald-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Transações</p>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {data.reduce((acc, curr) => acc + curr.transactions, 0)}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-br from-pink-500/10 to-pink-400/5 dark:from-pink-500/20 dark:to-pink-400/10 border border-pink-500/20">
              <p className="text-sm text-gray-600 dark:text-gray-400">Lucro Total</p>
              <p className="text-xl font-bold text-pink-600 dark:text-pink-400">
                R$ {data.reduce((acc, curr) => acc + curr.profit, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
