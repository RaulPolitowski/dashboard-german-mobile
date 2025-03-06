
import Dashboard from "@/components/Dashboard";
import { useTheme } from "@/hooks/use-theme";

const Index = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'bg-dashboard-background dark:bg-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} p-6`}>
      <Dashboard />
    </div>
  );
};

export default Index;
