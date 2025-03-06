import { useMemo } from "react";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "@/hooks/use-theme";

interface CashFlowChartProps {
  inflow: number;
  outflow: number;
  result: number;
}

export const CashFlowChart = ({ inflow, outflow, result }: CashFlowChartProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  const chartData = useMemo(() => {
    return [
      {
        type: "Entradas",
        valor: inflow,
        color: isDarkMode ? "rgb(52, 211, 153)" : "rgb(16, 185, 129)" // Mais brilhante no modo escuro
      },
      {
        type: "Saídas",
        valor: outflow,
        color: isDarkMode ? "rgb(248, 113, 113)" : "rgb(244, 63, 94)" // Mais brilhante no modo escuro
      },
      {
        type: "Resultado",
        valor: result,
        color: isDarkMode ? "rgb(96, 165, 250)" : "rgb(59, 130, 246)" // Mais brilhante no modo escuro
      }
    ];
  }, [inflow, outflow, result, isDarkMode]);

  return (
    <div className="h-[220px]">
      <ResponsiveBar
        data={chartData}
        keys={['valor']}
        indexBy="type"
        margin={{ top: 20, right: 20, bottom: 50, left: 80 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        colors={({ data }) => data.color}
        theme={{
          fontSize: 12,
          textColor: isDarkMode ? '#e5e7eb' : '#374151',
          axis: {
            domain: {
              line: {
                stroke: isDarkMode ? '#4b5563' : '#d1d5db',
                strokeWidth: 1
              }
            },
            ticks: {
              line: {
                stroke: isDarkMode ? '#4b5563' : '#d1d5db',
                strokeWidth: 1
              },
              text: {
                fontSize: 12,
                fill: isDarkMode ? '#e5e7eb' : '#374151',
                fontWeight: 'bold'
              }
            },
            legend: {
              text: {
                fontSize: 14,
                fill: isDarkMode ? '#f3f4f6' : '#1f2937',
                fontWeight: 'bold'
              }
            }
          },
          labels: {
            text: {
              fontSize: 13,
              fontWeight: 'bold',
              fill: isDarkMode ? '#ffffff' : '#111827'
            }
          },
          tooltip: {
            container: {
              background: isDarkMode ? '#1f2937' : '#ffffff',
              color: isDarkMode ? '#f9fafb' : '#111827',
              fontSize: 13,
              borderRadius: 4,
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.25)',
              padding: 12
            }
          }
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: 'Categorias',
          legendPosition: 'middle',
          legendOffset: 40
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 8,
          tickRotation: 0,
          legend: 'Valores (R$)',
          legendPosition: 'middle',
          legendOffset: -65,
          format: (value) => `R$ ${value.toLocaleString()}`
        }}
        enableLabel={true}
        labelSkipWidth={16}
        labelSkipHeight={16}
        labelTextColor={isDarkMode ? '#ffffff' : '#111827'}
        label={d => `R$ ${d.value.toLocaleString()}`}
        tooltip={({ data, value }) => (
          <div className={`p-3 shadow-lg rounded-md border ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <strong className="text-base">{data.type}</strong>
            <div className="text-base mt-1 font-semibold">
              R$ {value.toLocaleString()}
            </div>
          </div>
        )}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};
