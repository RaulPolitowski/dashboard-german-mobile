
import { FinancialOverview } from "@/components/dashboard/FinancialOverview";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <div className="p-3 md:p-6 space-y-4 md:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FinancialOverview />
        </div>
        <Dashboard />
      </div>
    </div>
  );
};

export default Index;
