
import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";

interface CashFlowChartProps {
  inflow: number;
  outflow: number;
  result: number;
}

export const CashFlowChart = ({ inflow, outflow, result }: CashFlowChartProps) => {
  const chartData = useMemo(() => {
    return [
      {
        type: "Entradas",
        valor: inflow,
        color: "rgb(16, 185, 129)"
      },
      {
        type: "Saídas",
        valor: outflow,
        color: "rgb(244, 63, 94)"
      },
      {
        type: "Resultado",
        valor: result,
        color: "rgb(59, 130, 246)"
      }
    ];
  }, [inflow, outflow, result]);

  return (
    <div className="h-[200px]">
      <ResponsiveBar
        data={chartData}
        keys={['valor']}
        indexBy="type"
        margin={{ top: 10, right: 10, bottom: 40, left: 80 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={({ data }) => data.color}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          format: (value) => `R$ ${value.toLocaleString()}`
        }}
        enableLabel={true}
        label={d => `R$ ${d.value.toLocaleString()}`}
        tooltip={({ data, value }) => (
          <div className="bg-white p-2 shadow rounded border border-gray-200">
            <strong>{data.type}</strong>: R$ {value.toLocaleString()}
          </div>
        )}
      />
    </div>
  );
};
