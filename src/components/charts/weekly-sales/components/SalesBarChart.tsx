
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import { timeRanges } from '../constants';

interface SalesBarChartProps {
  data: any[];
  selectedRange: string;
  onBarClick: (dayName: string) => void;
}

export const SalesBarChart = ({ data, selectedRange, onBarClick }: SalesBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart 
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        onClick={(data) => {
          if (data && data.activePayload) {
            onBarClick(data.activePayload[0].payload.day);
          }
        }}
      >
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
        <XAxis 
          dataKey="day" 
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
        />
        <YAxis 
          tick={{ fill: '#6b7280' }}
          axisLine={{ stroke: '#e5e7eb' }}
          tickFormatter={(value) => `R$ ${(value / 1000)}k`}
        />
        <Tooltip 
          labelFormatter={(value) => {
            try {
              const date = data.find(item => item.day === value)?.date;
              return date ? format(parseISO(date), 'dd/MM/yyyy') : value;
            } catch (error) {
              console.error('Error formatting date:', error);
              return value;
            }
          }}
          formatter={(value) => `R$ ${value.toLocaleString()}`}
        />
        {selectedRange === 'all' ? (
          timeRanges.map((range) => (
            <Bar
              key={range.id}
              dataKey={`${range.id}.value`}
              name={range.label}
              fill={range.color}
              radius={[4, 4, 0, 0]}
              cursor="pointer"
            />
          ))
        ) : (
          <Bar
            dataKey={`${selectedRange}.value`}
            fill="#6366F1"
            radius={[4, 4, 0, 0]}
            cursor="pointer"
          />
        )}
      </BarChart>
    </ResponsiveContainer>
  );
};
