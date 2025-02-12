
export type MonthlyData = {
  month: string;
  sales: number;
  transactions: number;
  revenue: number;
  expenses: number;
};

export type YearlyData = {
  [key: string]: MonthlyData[];
};

export const allMonthlyData: YearlyData = {
  "2024": [
    { month: "Janeiro", sales: 35000, transactions: 150, revenue: 72000, expenses: 65000 },
    { month: "Fevereiro", sales: 38000, transactions: 165, revenue: 75000, expenses: 66000 },
    { month: "Março", sales: 42000, transactions: 180, revenue: 78000, expenses: 68000 },
    { month: "Abril", sales: 45750, transactions: 195, revenue: 82000, expenses: 70000 },
    { month: "Maio", sales: 48000, transactions: 205, revenue: 85000, expenses: 71000 },
    { month: "Junho", sales: 52000, transactions: 220, revenue: 88000, expenses: 73000 },
    { month: "Julho", sales: 54000, transactions: 230, revenue: 90000, expenses: 74000 },
    { month: "Agosto", sales: 51000, transactions: 215, revenue: 87000, expenses: 72000 },
    { month: "Setembro", sales: 49000, transactions: 208, revenue: 84000, expenses: 71000 },
    { month: "Outubro", sales: 53000, transactions: 225, revenue: 89000, expenses: 73000 },
    { month: "Novembro", sales: 56000, transactions: 238, revenue: 92000, expenses: 75000 },
    { month: "Dezembro", sales: 58000, transactions: 246, revenue: 95000, expenses: 76000 },
  ],
  "2023": [
    { month: "Janeiro", sales: 32000, transactions: 140, revenue: 68000, expenses: 62000 },
    { month: "Fevereiro", sales: 35000, transactions: 155, revenue: 70000, expenses: 63000 },
    { month: "Março", sales: 38000, transactions: 170, revenue: 73000, expenses: 65000 },
    { month: "Abril", sales: 42000, transactions: 185, revenue: 76000, expenses: 67000 },
    { month: "Maio", sales: 45000, transactions: 195, revenue: 79000, expenses: 68000 },
    { month: "Junho", sales: 48000, transactions: 210, revenue: 82000, expenses: 70000 },
    { month: "Julho", sales: 50000, transactions: 220, revenue: 84000, expenses: 71000 },
    { month: "Agosto", sales: 47000, transactions: 205, revenue: 81000, expenses: 69000 },
    { month: "Setembro", sales: 45000, transactions: 198, revenue: 78000, expenses: 68000 },
    { month: "Outubro", sales: 49000, transactions: 215, revenue: 83000, expenses: 70000 },
    { month: "Novembro", sales: 52000, transactions: 228, revenue: 86000, expenses: 72000 },
    { month: "Dezembro", sales: 54000, transactions: 236, revenue: 89000, expenses: 73000 },
  ],
  "2022": [
    { month: "Janeiro", sales: 30000, transactions: 130, revenue: 65000, expenses: 60000 },
    { month: "Fevereiro", sales: 33000, transactions: 145, revenue: 68000, expenses: 61000 },
    { month: "Março", sales: 36000, transactions: 160, revenue: 71000, expenses: 63000 },
    { month: "Abril", sales: 40000, transactions: 175, revenue: 74000, expenses: 65000 },
    { month: "Maio", sales: 43000, transactions: 185, revenue: 77000, expenses: 66000 },
    { month: "Junho", sales: 46000, transactions: 200, revenue: 80000, expenses: 68000 },
    { month: "Julho", sales: 48000, transactions: 210, revenue: 82000, expenses: 69000 },
    { month: "Agosto", sales: 45000, transactions: 195, revenue: 79000, expenses: 67000 },
    { month: "Setembro", sales: 43000, transactions: 188, revenue: 76000, expenses: 66000 },
    { month: "Outubro", sales: 47000, transactions: 205, revenue: 81000, expenses: 68000 },
    { month: "Novembro", sales: 50000, transactions: 218, revenue: 84000, expenses: 70000 },
    { month: "Dezembro", sales: 52000, transactions: 226, revenue: 87000, expenses: 71000 },
  ]
};

export const years = Object.keys(allMonthlyData).sort((a, b) => b.localeCompare(a));
