
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", receitas: 55000, despesas: 48000 },
  { month: "Fev", receitas: 58000, despesas: 52000 },
  { month: "Mar", receitas: 62000, despesas: 55000 },
  { month: "Abr", receitas: 65750, despesas: 58000 },
  { month: "Mai", receitas: 68000, despesas: 62000 },
  { month: "Jun", receitas: 72000, despesas: 65000 },
];

export const CashFlowChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="month" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#94A3B8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg bg-[#0A0F1E] border border-[#3B82F6]/30 p-2 shadow-xl">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-gray-400">Receitas</span>
                      <span className="font-bold text-[#0EA5E9]">
                        R$ {payload[0].value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-gray-400">Despesas</span>
                      <span className="font-bold text-[#3B82F6]">
                        R$ {payload[1].value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="receitas" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

