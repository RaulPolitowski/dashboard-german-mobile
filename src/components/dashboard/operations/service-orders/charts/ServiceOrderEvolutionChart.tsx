
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const mockEvolutionData = [
  { month: 'Jan', completed: 25, inProgress: 15, delayed: 3 },
  { month: 'Fev', completed: 28, inProgress: 18, delayed: 4 },
  { month: 'Mar', completed: 32, inProgress: 20, delayed: 5 },
  { month: 'Abr', completed: 30, inProgress: 22, delayed: 3 },
  { month: 'Mai', completed: 35, inProgress: 19, delayed: 2 },
  { month: 'Jun', completed: 38, inProgress: 21, delayed: 4 },
];

export const ServiceOrderEvolutionChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={mockEvolutionData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" name="Finalizadas" fill="#10B981" />
        <Bar dataKey="inProgress" name="Em Andamento" fill="#6366F1" />
        <Bar dataKey="delayed" name="Atrasadas" fill="#F43F5E" />
      </BarChart>
    </ResponsiveContainer>
  );
};
