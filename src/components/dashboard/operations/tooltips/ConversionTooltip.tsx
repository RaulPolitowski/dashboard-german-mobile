
interface ConversionTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const formatCurrency = (value: number) => `R$ ${value.toLocaleString()}`;

export const ConversionTooltip = ({ active, payload, label }: ConversionTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-700 mb-2">{label}</p>
        <div className="space-y-2">
          <p className="text-sm text-indigo-600">
            Taxa de Conversão: {payload[0].value}%
          </p>
          <p className="text-sm text-emerald-600">
            Aprovados: {payload[1].value}
            <br />
            Valor: {formatCurrency(payload[1].payload.valorAprovados)}
          </p>
          <p className="text-sm text-amber-600">
            Pendentes: {payload[2].value}
            <br />
            Valor: {formatCurrency(payload[2].payload.valorPendentes)}
          </p>
          <p className="text-sm text-rose-600">
            Vencidos: {payload[3].value}
            <br />
            Valor: {formatCurrency(payload[3].payload.valorVencidos)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};
