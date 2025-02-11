
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";

const data = [
  { name: "Pessoal", value: 35000, previousValue: 33000 },
  { name: "Marketing", value: 15000, previousValue: 16000 },
  { name: "Operacional", value: 25000, previousValue: 23000 },
  { name: "Infraestrutura", value: 18000, previousValue: 17500 },
  { name: "Logística", value: 12000, previousValue: 11000 },
  { name: "Tecnologia", value: 8500, previousValue: 7800 },
  { name: "Manutenção", value: 6500, previousValue: 6000 },
  { name: "Treinamento", value: 4500, previousValue: 5000 },
  { name: "Seguros", value: 3800, previousValue: 3500 },
  { name: "Outros", value: 2700, previousValue: 2500 }
];

export const ExpensesDistributionChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const total = data.reduce((sum: number, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6366F1]/20 text-sm"
        >
          <option value="current">Mês Atual</option>
          <option value="previous">Mês Anterior</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
          <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
          <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value as number;
                const item = payload[0].payload;
                const percentage = ((value / total) * 100).toFixed(1);
                const change = ((value - item.previousValue) / item.previousValue * 100).toFixed(1);
                const isPositive = value > item.previousValue;

                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {item.name}
                        </span>
                        <span className="font-bold text-rose-500">
                          R$ {value.toLocaleString()} ({percentage}%)
                        </span>
                        <div className={`text-xs ${isPositive ? 'text-rose-600' : 'text-emerald-600'}`}>
                          vs Mês Anterior: {isPositive ? '+' : ''}{change}%
                          <br />
                          (R$ {item.previousValue.toLocaleString()})
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="value" fill="#F43F5E" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
