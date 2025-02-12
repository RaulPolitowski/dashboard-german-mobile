
import { Card } from "../../ui/card";
import { AlertTriangle } from "lucide-react";

interface DueTodayBudget {
  id: string;
  client: string;
  value: number;
  description: string;
  seller: string;
}

const dueTodayBudgets: DueTodayBudget[] = [
  { id: "1", client: "Cliente X", value: 15000, description: "Projeto Mobile", seller: "João Silva" },
  { id: "2", client: "Cliente Y", value: 8500, description: "Consultoria", seller: "Maria Santos" },
];

export const DueTodayBudgets = () => {
  const total = dueTodayBudgets.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-amber-700">Orçamentos Vencendo Hoje</h3>
          </div>
          <p className="text-2xl font-bold text-amber-600 mt-2">
            R$ {total.toLocaleString()}
          </p>
          <p className="text-sm text-amber-600 mt-1">
            {dueTodayBudgets.length} orçamentos
          </p>
        </div>
      </div>
      <div className="mt-4 space-y-3">
        {dueTodayBudgets.map((budget) => (
          <div 
            key={budget.id} 
            className="p-3 bg-amber-50 rounded-lg"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-amber-900">{budget.client}</p>
                <p className="text-sm text-amber-700">{budget.description}</p>
                <p className="text-xs text-amber-600 mt-1">Vendedor: {budget.seller}</p>
              </div>
              <p className="font-medium text-amber-700">
                R$ {budget.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
