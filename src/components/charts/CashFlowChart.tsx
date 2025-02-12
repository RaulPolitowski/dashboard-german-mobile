import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

interface CashFlowChartProps {
  period: string;
}

const allData = [
  { month: "Jan", receitas: 55000, despesas: 48000, resultado: 7000 },
  { month: "Fev", receitas: 58000, despesas: 52000, resultado: 6000 },
  { month: "Mar", receitas: 62000, despesas: 55000, resultado: 7000 },
  { month: "Abr", receitas: 65750, despesas: 58000, resultado: 7750 },
  { month: "Mai", receitas: 68000, despesas: 62000, resultado: 6000 },
  { month: "Jun", receitas: 72000, despesas: 65000, resultado: 7000 },
  { month: "Jul", receitas: 75000, despesas: 67000, resultado: 8000 },
  { month: "Ago", receitas: 73000, despesas: 66000, resultado: 7000 },
  { month: "Set", receitas: 71000, despesas: 64000, resultado: 7000 },
  { month: "Out", receitas: 74000, despesas: 66000, resultado: 8000 },
  { month: "Nov", receitas: 76000, despesas: 68000, resultado: 8000 },
  { month: "Dez", receitas: 78000, despesas: 69000, resultado: 9000 },
];

const weekData = [
  { day: "Segunda", receitas: 15000, despesas: 12000, resultado: 3000 },
  { day: "Terça", receitas: 14000, despesas: 11000, resultado: 3000 },
  { day: "Quarta", receitas: 16000, despesas: 13000, resultado: 3000 },
  { day: "Quinta", receitas: 15500, despesas: 12500, resultado: 3000 },
  { day: "Sexta", receitas: 17000, despesas: 14000, resultado: 3000 },
];

export const calculateTotals = (period: string) => {
  const data = period === "week" ? weekData : allData;
  let filteredData = data;
  
  if (period !== "week" && period !== "year") {
    const currentMonth = new Date().getMonth();
    const monthsToShow = Number(period);
    const startIndex = Math.max(0, currentMonth - monthsToShow + 1);
    filteredData = allData.slice(startIndex, currentMonth + 1);
  }

  return filteredData.reduce((acc, curr) => ({
    revenue: acc.revenue + curr.receitas,
    expenses: acc.expenses + curr.despesas,
    result: acc.result + (curr.receitas - curr.despesas)
  }), { revenue: 0, expenses: 0, result: 0 });
};

export const CashFlowChart = ({ period }: CashFlowChartProps) => {
  const filteredData = useMemo(() => {
    if (period === "week") {
      return weekData;
    }

    const currentMonth = new Date().getMonth();
    let startIndex;

    switch (period) {
      case "3":
        startIndex = Math.max(0, currentMonth - 2);
        return allData.slice(startIndex, currentMonth + 1);
      case "6":
        startIndex = Math.max(0, currentMonth - 5);
        return allData.slice(startIndex, currentMonth + 1);
      case "12":
        return allData.slice(0, currentMonth + 1);
      case "year":
        return allData;
      default:
        return allData.slice(Math.max(0, currentMonth - 2), currentMonth + 1);
    }
  }, [period]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <XAxis 
          dataKey={period === "week" ? "day" : "month"} 
          stroke="#888888" 
          fontSize={12} 
          tickLine={false} 
          axisLine={false} 
        />
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
                      <span className="font-bold text-emerald-500">
                        R$ {payload[0].value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Despesas</span>
                      <span className="font-bold text-rose-500">
                        R$ {payload[1].value.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">Resultado</span>
                      <span className="font-bold text-blue-500">
                        R$ {payload[2].value.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="receitas" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="despesas" fill="#F43F5E" radius={[4, 4, 0, 0]} />
        <Bar dataKey="resultado" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
