
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
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Receitas</span>
                      <span className="font-bold text-success-DEFAULT">
                        R$ {payload[0].value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Despesas</span>
                      <span className="font-bold text-danger-DEFAULT">
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
        <Bar dataKey="receitas" fill="#1A1F2C" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" fill="#403E43" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

