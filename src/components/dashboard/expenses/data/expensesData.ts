import { Expense } from "../types/expense";

export const expensesData: Expense[] = [
  { 
    category: "Pessoal", 
    value: 35000, 
    previousValues: [
      { month: "Fevereiro", value: 33000 },
      { month: "Janeiro", value: 32000 },
      { month: "Dezembro", value: 34000 }
    ],
  },
  { 
    category: "Marketing", 
    value: 15000, 
    previousValues: [
      { month: "Fevereiro", value: 16000 },
      { month: "Janeiro", value: 14500 },
      { month: "Dezembro", value: 13000 }
    ],
  },
  { 
    category: "Operacional", 
    value: 25000, 
    previousValues: [
      { month: "Fevereiro", value: 23000 },
      { month: "Janeiro", value: 24000 },
      { month: "Dezembro", value: 22000 }
    ],
  },
  { 
    category: "Infraestrutura", 
    value: 18000, 
    previousValues: [
      { month: "Fevereiro", value: 17500 },
      { month: "Janeiro", value: 17000 },
      { month: "Dezembro", value: 16500 }
    ],
  },
  { 
    category: "Logística", 
    value: 12000,
    previousValues: [
      { month: "Fevereiro", value: 11000 },
      { month: "Janeiro", value: 10500 },
      { month: "Dezembro", value: 11500 }
    ],
  },
  { 
    category: "Tecnologia", 
    value: 8500, 
    previousValues: [
      { month: "Fevereiro", value: 7800 },
      { month: "Janeiro", value: 7500 },
      { month: "Dezembro", value: 7000 }
    ],
  },
  { 
    category: "Manutenção", 
    value: 6500, 
    previousValues: [
      { month: "Fevereiro", value: 6000 },
      { month: "Janeiro", value: 5800 },
      { month: "Dezembro", value: 6200 }
    ],
  },
  { 
    category: "Treinamento", 
    value: 4500, 
    previousValues: [
      { month: "Fevereiro", value: 5000 },
      { month: "Janeiro", value: 4800 },
      { month: "Dezembro", value: 4600 }
    ],
  },
  { 
    category: "Seguros", 
    value: 3800, 
    previousValues: [
      { month: "Fevereiro", value: 3500 },
      { month: "Janeiro", value: 3400 },
      { month: "Dezembro", value: 3300 }
    ],
  },
  { 
    category: "Outros", 
    value: 2700, 
    previousValues: [
      { month: "Fevereiro", value: 2500 },
      { month: "Janeiro", value: 2400 },
      { month: "Dezembro", value: 2300 }
    ],
  }
];
