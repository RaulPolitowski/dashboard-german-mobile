
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Pessoal", value: 35000 },
  { name: "Marketing", value: 15000 },
  { name: "Operacional", value: 25000 },
  { name: "Infraestrutura", value: 18000 },
];

export const ExpensesDistributionChart = () => {
  const total = data.reduce((sum: number, item) => sum + item.value, 0);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
        <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
        <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const value = payload[0].value as number;
              const percentage = ((value / total) * 100).toFixed(1);
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {payload[0].payload.name}
                      </span>
                      <span className="font-bold text-rose-500">
                        R$ {value.toLocaleString()} ({percentage}%)
                      </span>
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
  );
};

