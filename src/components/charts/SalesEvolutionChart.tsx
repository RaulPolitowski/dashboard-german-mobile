
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", value: 35000 },
  { date: "Fev", value: 38000 },
  { date: "Mar", value: 42000 },
  { date: "Abr", value: 45750 },
  { date: "Mai", value: 48000 },
  { date: "Jun", value: 52000 },
];

export const SalesEvolutionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#94A3B8"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg bg-[#0A0F1E] border border-[#0EA5E9]/30 p-2 shadow-xl">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-gray-400">Valor</span>
                      <span className="font-bold text-[#0EA5E9]">
                        R$ {payload[0].value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0EA5E9"
          strokeWidth={3}
          dot={{ strokeWidth: 4, fill: "#0A0F1E", stroke: "#0EA5E9" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

