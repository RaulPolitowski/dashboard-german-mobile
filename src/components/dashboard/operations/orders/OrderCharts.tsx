
import { useState } from "react";
import { Card } from "../../../ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const mockData = [
  { month: 'Jan', received: 45, approved: 32, rejected: 3, value: 280000 },
  { month: 'Fev', received: 52, approved: 38, rejected: 4, value: 320000 },
  { month: 'Mar', received: 48, approved: 35, rejected: 5, value: 300000 },
  { month: 'Abr', received: 56, approved: 42, rejected: 3, value: 380000 },
  { month: 'Mai', received: 62, approved: 48, rejected: 4, value: 420000 },
  { month: 'Jun', received: 58, approved: 45, rejected: 3, value: 400000 },
];

export const OrderCharts = () => {
  const [showEvolution, setShowEvolution] = useState(true);
  const [showConversion, setShowConversion] = useState(true);
  const [timeFilter, setTimeFilter] = useState("monthly");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Evolução dos Pedidos
          </h3>
          <div className="flex items-center gap-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="daily">Hoje</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                  <SelectItem value="yearly">Anual</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <button
              onClick={() => setShowEvolution(!showEvolution)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              {showEvolution ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
        {showEvolution && (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="received" name="Recebidos" stroke="#6366F1" />
              <Line type="monotone" dataKey="approved" name="Aprovados" stroke="#10B981" />
              <Line type="monotone" dataKey="rejected" name="Rejeitados" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Conversão de Pedidos
          </h3>
          <button
            onClick={() => setShowConversion(!showConversion)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            {showConversion ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>
        {showConversion && (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Valor Total (R$)" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </Card>
    </div>
  );
};
