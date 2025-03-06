import { Expense } from "../types/expense";

export const expensesData: Expense[] = [
  { 
    category: "Pessoal", 
    value: 35000, 
    previousValues: [
      { month: "Janeiro/2024", value: 33000 },
      { month: "Dezembro/2023", value: 32000 },
      { month: "Novembro/2023", value: 34000 }
    ],
  },
  { 
    category: "Marketing", 
    value: 15000, 
    previousValues: [
      { month: "Janeiro/2024", value: 16000 },
      { month: "Dezembro/2023", value: 14500 },
      { month: "Novembro/2023", value: 13000 }
    ],
  },
  { 
    category: "Operacional", 
    value: 25000, 
    previousValues: [
      { month: "Janeiro/2024", value: 23000 },
      { month: "Dezembro/2023", value: 24000 },
      { month: "Novembro/2023", value: 22000 }
    ],
  },
  { 
    category: "Infraestrutura", 
    value: 18000, 
    previousValues: [
      { month: "Janeiro/2024", value: 17500 },
      { month: "Dezembro/2023", value: 17000 },
      { month: "Novembro/2023", value: 16500 }
    ],
  },
  { 
    category: "Logística", 
    value: 12000,
    previousValues: [
      { month: "Janeiro/2024", value: 11000 },
      { month: "Dezembro/2023", value: 10500 },
      { month: "Novembro/2023", value: 11500 }
    ],
  },
  { 
    category: "Tecnologia", 
    value: 8500, 
    previousValues: [
      { month: "Janeiro/2024", value: 7800 },
      { month: "Dezembro/2023", value: 7500 },
      { month: "Novembro/2023", value: 7000 }
    ],
  },
  { 
    category: "Manutenção", 
    value: 6500, 
    previousValues: [
      { month: "Janeiro/2024", value: 6000 },
      { month: "Dezembro/2023", value: 5800 },
      { month: "Novembro/2023", value: 6200 }
    ],
  },
  { 
    category: "Treinamento", 
    value: 4500, 
    previousValues: [
      { month: "Janeiro/2024", value: 5000 },
      { month: "Dezembro/2023", value: 4800 },
      { month: "Novembro/2023", value: 4600 }
    ],
  },
  { 
    category: "Seguros", 
    value: 3800, 
    previousValues: [
      { month: "Janeiro/2024", value: 3500 },
      { month: "Dezembro/2023", value: 3400 },
      { month: "Novembro/2023", value: 3300 }
    ],
  },
  { 
    category: "Outros", 
    value: 2700, 
    previousValues: [
      { month: "Janeiro/2024", value: 2500 },
      { month: "Dezembro/2023", value: 2400 },
      { month: "Novembro/2023", value: 2300 }
    ],
  }
];
