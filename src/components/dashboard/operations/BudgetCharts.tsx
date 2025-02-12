import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Card } from '../../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const mockData = [
  { month: 'Jan', aprovados: 45, valorAprovados: 320000, pendentes: 15, valorPendentes: 98000, recusados: 8, valorRecusados: 45000 },
  { month: 'Fev', aprovados: 50, valorAprovados: 375000, pendentes: 12, valorPendentes: 85000, recusados: 10, valorRecusados: 62000 },
  { month: 'Mar', aprovados: 48, valorAprovados: 350000, pendentes: 18, valorPendentes: 120000, recusados: 7, valorRecusados: 38000 },
  { month: 'Abr', aprovados: 52, valorAprovados: 390000, pendentes: 14, valorPendentes: 95000, recusados: 9, valorRecusados: 52000 },
  { month: 'Mai', aprovados: 55, valorAprovados: 420000, pendentes: 16, valorPendentes: 110000, recusados: 11, valorRecusados: 68000 },
  { month: 'Jun', aprovados: 58, valorAprovados: 450000, pendentes: 13, valorPendentes: 89000, recusados: 8, valorRecusados: 48000 },
];

const conversionData = [
  { month: 'Jan', aprovados: 45, pendentes: 15, vencidos: 5, taxa: 65 },
  { month: 'Fev', aprovados: 50, pendentes: 12, vencidos: 6, taxa: 68 },
  { month: 'Mar', aprovados: 48, pendentes: 18, vencidos: 4, taxa: 62 },
  { month: 'Abr', aprovados: 52, pendentes: 14, vencidos: 7, taxa: 70 },
  { month: 'Mai', aprovados: 55, pendentes: 16, vencidos: 5, taxa: 72 },
  { month: 'Jun', aprovados: 58, pendentes: 13, vencidos: 6, taxa: 75 },
];

const COLORS = ['#10B981', '#F59E0B', '#EF4444'];

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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700 mb-2">{label}</p>
          <div className="space-y-2">
            <div className="border-b pb-2">
              <p className="text-sm font-medium text-emerald-600">Aprovados</p>
              <p className="text-sm">Quantidade: {payload[0].value}</p>
              <p className="text-sm">Valor: {formatCurrency(payload[1].value)}</p>
            </div>
            <div className="border-b pb-2">
              <p className="text-sm font-medium text-amber-600">Pendentes</p>
              <p className="text-sm">Quantidade: {payload[2].value}</p>
              <p className="text-sm">Valor: {formatCurrency(payload[3].value)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-rose-600">Recusados</p>
              <p className="text-sm">Quantidade: {payload[4].value}</p>
              <p className="text-sm">Valor: {formatCurrency(payload[5].value)}</p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const ConversionTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-700 mb-2">{label}</p>
          <div className="space-y-2">
            <p className="text-sm text-indigo-600">
              Taxa de Conversão: {payload[0].value}%
            </p>
            <p className="text-sm text-emerald-600">
              Aprovados: {payload[1].value}
              <br />
              Valor: {formatCurrency(payload[1].payload.valorAprovados)}
            </p>
            <p className="text-sm text-amber-600">
              Pendentes: {payload[2].value}
              <br />
              Valor: {formatCurrency(payload[2].payload.valorPendentes)}
            </p>
            <p className="text-sm text-rose-600">
              Vencidos: {payload[3].value}
              <br />
              Valor: {formatCurrency(payload[3].payload.valorVencidos)}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

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
              {timeFilter === "this-month" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={conversionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {conversionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.slice(-Number(timeFilter))}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={formatCurrency} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="left" dataKey="aprovados" name="Aprovados (Qtd)" fill="#10B981" />
                    <Bar yAxisId="right" dataKey="valorAprovados" name="Aprovados (R$)" fill="#34D399" />
                    <Bar yAxisId="left" dataKey="pendentes" name="Pendentes (Qtd)" fill="#F59E0B" />
                    <Bar yAxisId="right" dataKey="valorPendentes" name="Pendentes (R$)" fill="#FBBF24" />
                    <Bar yAxisId="left" dataKey="recusados" name="Recusados (Qtd)" fill="#EF4444" />
                    <Bar yAxisId="right" dataKey="valorRecusados" name="Recusados (R$)" fill="#F87171" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm">
              <div className="p-3 rounded-lg bg-emerald-50">
                <p className="text-emerald-600 font-medium">Aprovados</p>
                <p>Quantidade: {totals.aprovados}</p>
                <p>Valor: {formatCurrency(totals.valorAprovados)}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <p className="text-amber-600 font-medium">Pendentes</p>
                <p>Quantidade: {totals.pendentes}</p>
                <p>Valor: {formatCurrency(totals.valorPendentes)}</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50">
                <p className="text-rose-600 font-medium">Recusados</p>
                <p>Quantidade: {totals.recusados}</p>
                <p>Valor: {formatCurrency(totals.valorRecusados)}</p>
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
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData.slice(-Number(timeFilter))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" unit="%" />
                  <Tooltip content={<ConversionTooltip />} />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="taxa" 
                    name="Taxa de Conversão"
                    stroke="#6366F1" 
                    strokeWidth={2}
                    dot={{ fill: '#6366F1' }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="aprovados" 
                    name="Aprovados"
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={{ fill: '#10B981' }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="pendentes" 
                    name="Pendentes"
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ fill: '#F59E0B' }}
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="vencidos" 
                    name="Vencidos"
                    stroke="#EF4444" 
                    strokeWidth={2}
                    dot={{ fill: '#EF4444' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4 text-sm">
              <div className="p-3 rounded-lg bg-indigo-50">
                <p className="text-indigo-600 font-medium">Taxa de Conversão</p>
                <p>{conversionData[conversionData.length - 1].taxa}%</p>
              </div>
              <div className="p-3 rounded-lg bg-emerald-50">
                <p className="text-emerald-600 font-medium">Aprovados</p>
                <p>{conversionData[conversionData.length - 1].aprovados}</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50">
                <p className="text-amber-600 font-medium">Pendentes</p>
                <p>{conversionData[conversionData.length - 1].pendentes}</p>
              </div>
              <div className="p-3 rounded-lg bg-rose-50">
                <p className="text-rose-600 font-medium">Vencidos</p>
                <p>{conversionData[conversionData.length - 1].vencidos}</p>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
