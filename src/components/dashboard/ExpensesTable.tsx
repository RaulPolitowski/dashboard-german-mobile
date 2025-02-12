
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

const expensesData = [
  { category: "Pessoal", value: 35000, previousValue: 33000 },
  { category: "Marketing", value: 15000, previousValue: 16000 },
  { category: "Operacional", value: 25000, previousValue: 23000 },
  { category: "Infraestrutura", value: 18000, previousValue: 17500 },
  { category: "Logística", value: 12000, previousValue: 11000 },
  { category: "Tecnologia", value: 8500, previousValue: 7800 },
  { category: "Manutenção", value: 6500, previousValue: 6000 },
  { category: "Treinamento", value: 4500, previousValue: 5000 },
  { category: "Seguros", value: 3800, previousValue: 3500 },
  { category: "Outros", value: 2700, previousValue: 2500 }
];

export const ExpensesTable = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  const total = expensesData.reduce((sum, item) => sum + item.value, 0);
  const previousTotal = expensesData.reduce((sum, item) => sum + item.previousValue, 0);
  const change = ((total - previousTotal) / previousTotal) * 100;

  if (isMinimized) {
    return (
      <div 
        className="p-4 cursor-pointer bg-white rounded-lg shadow hover:shadow-md transition-all"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Distribuição de Despesas</h3>
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">Distribuição de Despesas</h3>
          <p className="text-sm text-gray-600">
            Total: R$ {total.toLocaleString()}
            <span className="ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
              {change >= 0 ? "+" : ""}{change.toFixed(1)}% vs mês anterior (R$ {previousTotal.toLocaleString()})
            </span>
          </p>
        </div>
        <button 
          onClick={() => setIsMinimized(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ChevronUp className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoria</TableHead>
              <TableHead>Valor Atual</TableHead>
              <TableHead>Mês Anterior</TableHead>
              <TableHead>Variação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expensesData.map((item) => {
              const itemChange = ((item.value - item.previousValue) / item.previousValue) * 100;
              return (
                <TableRow key={item.category}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell>R$ {item.value.toLocaleString()}</TableCell>
                  <TableCell>R$ {item.previousValue.toLocaleString()}</TableCell>
                  <TableCell className={itemChange >= 0 ? "text-rose-600" : "text-emerald-600"}>
                    {itemChange >= 0 ? "+" : ""}{itemChange.toFixed(1)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
