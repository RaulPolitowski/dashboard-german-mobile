
interface BudgetTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export const BudgetTooltip = ({ active, payload, label }: BudgetTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-700 mb-2">{label}</p>
        <div className="space-y-2">
          <div className="border-b pb-2">
            <p className="text-sm font-medium text-emerald-600">Aprovados</p>
            <p className="text-sm">Quantidade: {payload[0].value}</p>
            <p className="text-sm">Valor: {formatCurrency(payload[1].value)}</p>
          </div>
          <div className="border-b pb-2">
            <p className="text-sm font-medium text-amber-600">Pendentes</p>
            <p className="text-sm">Quantidade: {payload[2].value}</p>
            <p className="text-sm">Valor: {formatCurrency(payload[3].value)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-rose-600">Recusados</p>
            <p className="text-sm">Quantidade: {payload[4].value}</p>
            <p className="text-sm">Valor: {formatCurrency(payload[5].value)}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
