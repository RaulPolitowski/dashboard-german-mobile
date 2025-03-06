import { useState } from "react";
import { Card } from "../../ui/card";
import { 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { BudgetCharts } from "./BudgetCharts";
import { mockBudgetData } from "./data/mockBudgetData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { OverdueDetailsDialog } from "../OverdueDetailsDialog";
import { DueTodayBudgets } from "./DueTodayBudgets";
import { useTheme } from "../../../hooks/use-theme";

type BudgetItem = {
  id: string;
  date: string;
  value: number;
  entity: string;
  description: string;
  seller: string;
};

export const BudgetMetrics = () => {
  const [selectedRange, setSelectedRange] = useState<string>("current-month");
  const [selectedSeller, setSelectedSeller] = useState<string>("all");
  const [showGeneratedDetails, setShowGeneratedDetails] = useState(false);
  const [showApprovedDetails, setShowApprovedDetails] = useState(false);
  const [showOverdueDetails, setShowOverdueDetails] = useState(false);
  const [showLostDetails, setShowLostDetails] = useState(false);
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const generatedItems: BudgetItem[] = [
    { id: "1", date: "2024-02-15", value: 25000, entity: "Cliente A", description: "Projeto X", seller: "João Silva" },
    { id: "2", date: "2024-02-16", value: 18000, entity: "Cliente B", description: "Serviço Y", seller: "Maria Santos" },
  ];

  const approvedItems: BudgetItem[] = [
    { id: "1", date: "2024-02-10", value: 22000, entity: "Cliente C", description: "Projeto Z", seller: "Pedro Costa" },
    { id: "2", date: "2024-02-12", value: 15000, entity: "Cliente D", description: "Serviço W", seller: "Ana Silva" },
  ];

  const overdueItems: BudgetItem[] = [
    { id: "1", date: "2024-02-01", value: 12500, entity: "Cliente A", description: "Projeto X", seller: "João Silva" },
    { id: "2", date: "2024-02-05", value: 8900, entity: "Cliente B", description: "Serviço Y", seller: "Maria Santos" },
    { id: "3", date: "2024-02-10", value: 15600, entity: "Cliente C", description: "Produto Z", seller: "Pedro Oliveira" },
  ];

  const lostItems: BudgetItem[] = [
    { id: "1", date: "2024-02-15", value: 18500, entity: "Cliente D", description: "Projeto W", seller: "João Silva" },
    { id: "2", date: "2024-02-18", value: 22000, entity: "Cliente E", description: "Serviço V", seller: "Maria Santos" },
  ];

  return (
    <div className="space-y-6">
      <Card className={`p-4 md:p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : ''}`}>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-1">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-700'}`}>Métricas de Orçamentos</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Acompanhe o desempenho dos orçamentos</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                <SelectTrigger className={`w-full sm:w-[160px] h-9 px-3 text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-200' : 'bg-white border-gray-200'}`}>
                  <SelectValue placeholder="Todos os vendedores" />
                </SelectTrigger>
                <SelectContent className={`z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-gray-200' : 'bg-white'}`}>
                  <SelectItem value="all">Todos os vendedores</SelectItem>
                  <SelectItem value="joao">João Silva</SelectItem>
                  <SelectItem value="maria">Maria Santos</SelectItem>
                  <SelectItem value="pedro">Pedro Oliveira</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedRange} onValueChange={setSelectedRange}>
                <SelectTrigger className={`w-full sm:w-[140px] h-9 px-3 text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-gray-200' : 'bg-white border-gray-200'}`}>
                  <SelectValue placeholder="Mês Atual" />
                </SelectTrigger>
                <SelectContent align="end" className={`z-50 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-gray-200' : 'bg-white'}`}>
                  <SelectGroup>
                    <SelectItem value="current-day">Hoje</SelectItem>
                    <SelectItem value="current-week">Semana Atual</SelectItem>
                    <SelectItem value="current-month">Mês Atual</SelectItem>
                    <SelectItem value="current-year">Ano Atual</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectItem value="7D">Últimos 7 dias</SelectItem>
                    <SelectItem value="15D">Últimos 15 dias</SelectItem>
                    <SelectItem value="30D">Últimos 30 dias</SelectItem>
                    <SelectItem value="60D">Últimos 60 dias</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${isDarkMode 
            ? 'bg-gradient-to-br from-indigo-900/50 to-indigo-800/50 border-indigo-700/50 shadow-indigo-900/20' 
            : 'bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 border-indigo-200'}`}
          onClick={() => setShowGeneratedDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-500'}`} />
                <h3 className={`font-semibold ${isDarkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Orçamentos Gerados</h3>
              </div>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>78</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}>+12% vs período anterior</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${isDarkMode 
            ? 'bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border-emerald-700/50 shadow-emerald-900/20' 
            : 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-200'}`}
          onClick={() => setShowApprovedDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className={`h-5 w-5 ${isDarkMode ? 'text-emerald-400' : 'text-emerald-500'}`} />
                <h3 className={`font-semibold ${isDarkMode ? 'text-emerald-300' : 'text-emerald-700'}`}>Orçamentos Aprovados</h3>
              </div>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>45</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>R$ 320.000,00</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${isDarkMode 
            ? 'bg-gradient-to-br from-amber-900/50 to-amber-800/50 border-amber-700/50 shadow-amber-900/20' 
            : 'bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-200'}`}
          onClick={() => setShowOverdueDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <Clock className={`h-5 w-5 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                <h3 className={`font-semibold ${isDarkMode ? 'text-amber-300' : 'text-amber-700'}`}>Orçamentos Vencidos</h3>
              </div>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>8</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-amber-300' : 'text-amber-600'}`}>R$ 42.000,00</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-4 cursor-pointer hover:shadow-lg transition-all ${isDarkMode 
            ? 'bg-gradient-to-br from-rose-900/50 to-rose-800/50 border-rose-700/50 shadow-rose-900/20' 
            : 'bg-gradient-to-br from-rose-500/10 to-rose-600/10 border-rose-200'}`}
          onClick={() => setShowLostDetails(true)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <XCircle className={`h-5 w-5 ${isDarkMode ? 'text-rose-400' : 'text-rose-500'}`} />
                <h3 className={`font-semibold ${isDarkMode ? 'text-rose-300' : 'text-rose-700'}`}>Orçamentos Perdidos</h3>
              </div>
              <p className={`text-2xl font-bold mt-2 ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>12</p>
              <p className={`text-sm mt-1 ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>R$ 75.000,00</p>
            </div>
          </div>
        </Card>
      </div>

      <DueTodayBudgets />

      <BudgetCharts />

      {/* Fixing the dialogs to ensure they receive arrays for items props */}
      <OverdueDetailsDialog
        isOpen={showGeneratedDetails}
        onClose={() => setShowGeneratedDetails(false)}
        type="generated"
        items={generatedItems}
      />

      <OverdueDetailsDialog
        isOpen={showApprovedDetails}
        onClose={() => setShowApprovedDetails(false)}
        type="approved"
        items={approvedItems}
      />

      <OverdueDetailsDialog
        isOpen={showOverdueDetails}
        onClose={() => setShowOverdueDetails(false)}
        type="overdue"
        items={overdueItems}
      />

      <OverdueDetailsDialog
        isOpen={showLostDetails}
        onClose={() => setShowLostDetails(false)}
        type="lost"
        items={lostItems}
      />
    </div>
  );
};
