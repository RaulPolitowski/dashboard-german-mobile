import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMemo } from "react";

interface CashFlowChartProps {
  period: string;
}

export interface PaymentMethodData {
  method: string;
  inflow: number;
  outflow: number;
  inflowTransactions: number;
  outflowTransactions: number;
}

const allData = [
  { 
    month: "Jan", 
    receitas: 55000, 
    despesas: 48000, 
    resultado: 7000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 25000, outflow: 18000, inflowTransactions: 45, outflowTransactions: 32 },
      { method: "PIX", inflow: 15000, outflow: 12000, inflowTransactions: 28, outflowTransactions: 20 },
      { method: "Boleto", inflow: 10000, outflow: 15000, inflowTransactions: 15, outflowTransactions: 25 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ]
  },
  { month: "Fev", receitas: 58000, despesas: 52000, resultado: 6000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 27000, outflow: 20000, inflowTransactions: 48, outflowTransactions: 35 },
      { method: "PIX", inflow: 16000, outflow: 13000, inflowTransactions: 30, outflowTransactions: 22 },
      { method: "Boleto", inflow: 10000, outflow: 16000, inflowTransactions: 16, outflowTransactions: 26 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Mar", receitas: 62000, despesas: 55000, resultado: 7000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 29000, outflow: 21000, inflowTransactions: 50, outflowTransactions: 37 },
      { method: "PIX", inflow: 17000, outflow: 14000, inflowTransactions: 32, outflowTransactions: 24 },
      { method: "Boleto", inflow: 11000, outflow: 17000, inflowTransactions: 17, outflowTransactions: 27 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Abr", receitas: 65750, despesas: 58000, resultado: 7750,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 31000, outflow: 22000, inflowTransactions: 52, outflowTransactions: 39 },
      { method: "PIX", inflow: 18000, outflow: 15000, inflowTransactions: 34, outflowTransactions: 26 },
      { method: "Boleto", inflow: 11750, outflow: 18000, inflowTransactions: 18, outflowTransactions: 28 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Mai", receitas: 68000, despesas: 62000, resultado: 6000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 32000, outflow: 24000, inflowTransactions: 54, outflowTransactions: 41 },
      { method: "PIX", inflow: 19000, outflow: 16000, inflowTransactions: 36, outflowTransactions: 28 },
      { method: "Boleto", inflow: 12000, outflow: 20000, inflowTransactions: 19, outflowTransactions: 30 },
      { method: "Dinheiro", inflow: 5000, outflow: 2000, inflowTransactions: 10, outflowTransactions: 3 },
    ] },
  { month: "Jun", receitas: 72000, despesas: 65000, resultado: 7000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 34000, outflow: 25000, inflowTransactions: 56, outflowTransactions: 43 },
      { method: "PIX", inflow: 20000, outflow: 17000, inflowTransactions: 38, outflowTransactions: 30 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Jul", receitas: 75000, despesas: 67000, resultado: 8000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 36000, outflow: 26000, inflowTransactions: 58, outflowTransactions: 45 },
      { method: "PIX", inflow: 21000, outflow: 18000, inflowTransactions: 40, outflowTransactions: 32 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Ago", receitas: 73000, despesas: 66000, resultado: 7000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 35000, outflow: 25000, inflowTransactions: 57, outflowTransactions: 44 },
      { method: "PIX", inflow: 20000, outflow: 18000, inflowTransactions: 39, outflowTransactions: 31 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Set", receitas: 71000, despesas: 64000, resultado: 7000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 34000, outflow: 24000, inflowTransactions: 56, outflowTransactions: 43 },
      { method: "PIX", inflow: 20000, outflow: 17000, inflowTransactions: 38, outflowTransactions: 30 },
      { method: "Boleto", inflow: 12000, outflow: 20000, inflowTransactions: 19, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Out", receitas: 74000, despesas: 66000, resultado: 8000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 35000, outflow: 25000, inflowTransactions: 57, outflowTransactions: 44 },
      { method: "PIX", inflow: 21000, outflow: 18000, inflowTransactions: 40, outflowTransactions: 32 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Nov", receitas: 76000, despesas: 68000, resultado: 8000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 37000, outflow: 27000, inflowTransactions: 59, outflowTransactions: 46 },
      { method: "PIX", inflow: 21000, outflow: 18000, inflowTransactions: 40, outflowTransactions: 32 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
  { month: "Dez", receitas: 78000, despesas: 69000, resultado: 9000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 38000, outflow: 27000, inflowTransactions: 60, outflowTransactions: 47 },
      { method: "PIX", inflow: 22000, outflow: 19000, inflowTransactions: 42, outflowTransactions: 34 },
      { method: "Boleto", inflow: 13000, outflow: 20000, inflowTransactions: 20, outflowTransactions: 32 },
      { method: "Dinheiro", inflow: 5000, outflow: 3000, inflowTransactions: 10, outflowTransactions: 5 },
    ] },
];

const weekData = [
  { 
    day: "Segunda", 
    receitas: 15000, 
    despesas: 12000, 
    resultado: 3000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 7000, outflow: 5000, inflowTransactions: 12, outflowTransactions: 8 },
      { method: "PIX", inflow: 4000, outflow: 3000, inflowTransactions: 8, outflowTransactions: 5 },
      { method: "Boleto", inflow: 2500, outflow: 3000, inflowTransactions: 4, outflowTransactions: 6 },
      { method: "Dinheiro", inflow: 1500, outflow: 1000, inflowTransactions: 3, outflowTransactions: 2 },
    ]
  },
  { day: "Terça", receitas: 14000, despesas: 11000, resultado: 3000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 6500, outflow: 4500, inflowTransactions: 11, outflowTransactions: 7 },
      { method: "PIX", inflow: 3800, outflow: 2800, inflowTransactions: 7, outflowTransactions: 4 },
      { method: "Boleto", inflow: 2200, outflow: 2700, inflowTransactions: 3, outflowTransactions: 5 },
      { method: "Dinheiro", inflow: 1500, outflow: 1000, inflowTransactions: 3, outflowTransactions: 2 },
    ] },
  { day: "Quarta", receitas: 16000, despesas: 13000, resultado: 3000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 7500, outflow: 5500, inflowTransactions: 13, outflowTransactions: 9 },
      { method: "PIX", inflow: 4200, outflow: 3200, inflowTransactions: 9, outflowTransactions: 6 },
      { method: "Boleto", inflow: 2800, outflow: 3300, inflowTransactions: 5, outflowTransactions: 7 },
      { method: "Dinheiro", inflow: 1500, outflow: 1000, inflowTransactions: 3, outflowTransactions: 2 },
    ] },
  { day: "Quinta", receitas: 15500, despesas: 12500, resultado: 3000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 7200, outflow: 5200, inflowTransactions: 12, outflowTransactions: 8 },
      { method: "PIX", inflow: 4100, outflow: 3100, inflowTransactions: 8, outflowTransactions: 5 },
      { method: "Boleto", inflow: 2700, outflow: 3200, inflowTransactions: 4, outflowTransactions: 6 },
      { method: "Dinheiro", inflow: 1500, outflow: 1000, inflowTransactions: 3, outflowTransactions: 2 },
    ] },
  { day: "Sexta", receitas: 17000, despesas: 14000, resultado: 3000,
    paymentMethods: [
      { method: "Cartão de Crédito", inflow: 8000, outflow: 6000, inflowTransactions: 14, outflowTransactions: 10 },
      { method: "PIX", inflow: 4500, outflow: 3500, inflowTransactions: 10, outflowTransactions: 7 },
      { method: "Boleto", inflow: 3000, outflow: 3500, inflowTransactions: 6, outflowTransactions: 8 },
      { method: "Dinheiro", inflow: 1500, outflow: 1000, inflowTransactions: 3, outflowTransactions: 2 },
    ] },
];

export const calculateTotals = (period: string) => {
  const data = period === "week" ? weekData : allData;
  let filteredData = data;
  
  if (period !== "week" && period !== "year") {
    const currentMonth = new Date().getMonth();
    const monthsToShow = Number(period);
    filteredData = allData.slice(-monthsToShow);
  }

  const totals = filteredData.reduce((acc, curr) => ({
    revenue: acc.revenue + curr.receitas,
    expenses: acc.expenses + curr.despesas,
    result: acc.result + curr.resultado
  }), { revenue: 0, expenses: 0, result: 0 });

  const paymentMethodTotals = filteredData.reduce((acc, curr) => {
    curr.paymentMethods.forEach(pm => {
      const existing = acc.find(a => a.method === pm.method);
      if (existing) {
        existing.inflow += pm.inflow;
        existing.outflow += pm.outflow;
        existing.inflowTransactions += pm.inflowTransactions;
        existing.outflowTransactions += pm.outflowTransactions;
      } else {
        acc.push({ ...pm });
      }
    });
    return acc;
  }, [] as PaymentMethodData[]);

  return { ...totals, paymentMethods: paymentMethodTotals };
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
