
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ConversionTooltip } from '../tooltips/ConversionTooltip';

interface ConversionChartProps {
  data: any[];
}

export const ConversionChart = ({ data }: ConversionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
        <XAxis dataKey="month" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" unit="%" />
        <Tooltip content={<ConversionTooltip />} />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="taxa" 
          name="Taxa de Conversão"
          stroke="#6366F1" 
          strokeWidth={2}
          dot={{ fill: '#6366F1' }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="aprovados" 
          name="Aprovados"
          stroke="#10B981" 
          strokeWidth={2}
          dot={{ fill: '#10B981' }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="pendentes" 
          name="Pendentes"
          stroke="#F59E0B" 
          strokeWidth={2}
          dot={{ fill: '#F59E0B' }}
        />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="vencidos" 
          name="Vencidos"
          stroke="#EF4444" 
          strokeWidth={2}
          dot={{ fill: '#EF4444' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
