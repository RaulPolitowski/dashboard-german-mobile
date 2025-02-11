
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "Jan", value: 35000 },
  { date: "Fev", value: 38000 },
  { date: "Mar", value: 42000 },
  { date: "Abr", value: 45750 },
  { date: "Mai", value: 48000 },
  { date: "Jun", value: 52000 },
  { date: "Jul", value: 54000 },
  { date: "Ago", value: 51000 },
  { date: "Set", value: 49000 },
  { date: "Out", value: 53000 },
  { date: "Nov", value: 56000 },
  { date: "Dez", value: 58000 },
];

export const SalesEvolutionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Valor</span>
                      <span className="font-bold text-emerald-500">
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
          stroke="#10B981"
          strokeWidth={2}
          dot={{ strokeWidth: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
