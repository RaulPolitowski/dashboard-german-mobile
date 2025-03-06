import { Card } from "@/components/ui/card";
import { useTheme } from '@/hooks/use-theme';

export const ServiceOrderPerformanceIndicators = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const indicators = [
    {
      name: "SLA Médio",
      value: "96.5%",
      change: "+2.1%",
      status: "positive",
      color: "emerald"
    },
    {
      name: "Tempo Médio de Conclusão",
      value: "2.4 dias",
      change: "-0.3 dias",
      status: "positive",
      color: "indigo"
    },
    {
      name: "Taxa de Pontualidade",
      value: "94.2%",
      change: "+1.8%",
      status: "positive",
      color: "amber"
    },
    {
      name: "Satisfação do Cliente",
      value: "4.8/5",
      change: "+0.2",
      status: "positive",
      color: "blue"
    }
  ];

  const getColorClasses = (color: string, status: string) => {
    const baseClasses = {
      emerald: {
        bg: isDarkMode ? 'bg-emerald-900/60 border-emerald-700/80' : 'bg-emerald-50',
        text: isDarkMode ? 'text-emerald-200' : 'text-emerald-600',
        textBold: isDarkMode ? 'text-emerald-300' : 'text-emerald-700',
        badge: {
          positive: isDarkMode ? 'bg-emerald-800/80 text-emerald-200' : 'bg-emerald-100 text-emerald-600',
          negative: isDarkMode ? 'bg-rose-800/80 text-rose-200' : 'bg-rose-100 text-rose-600'
        }
      },
      indigo: {
        bg: isDarkMode ? 'bg-indigo-900/60 border-indigo-700/80' : 'bg-indigo-50',
        text: isDarkMode ? 'text-indigo-200' : 'text-indigo-600',
        textBold: isDarkMode ? 'text-indigo-300' : 'text-indigo-700',
        badge: {
          positive: isDarkMode ? 'bg-indigo-800/80 text-indigo-200' : 'bg-indigo-100 text-indigo-600',
          negative: isDarkMode ? 'bg-rose-800/80 text-rose-200' : 'bg-rose-100 text-rose-600'
        }
      },
      amber: {
        bg: isDarkMode ? 'bg-amber-900/60 border-amber-700/80' : 'bg-amber-50',
        text: isDarkMode ? 'text-amber-200' : 'text-amber-600',
        textBold: isDarkMode ? 'text-amber-300' : 'text-amber-700',
        badge: {
          positive: isDarkMode ? 'bg-amber-800/80 text-amber-200' : 'bg-amber-100 text-amber-600',
          negative: isDarkMode ? 'bg-rose-800/80 text-rose-200' : 'bg-rose-100 text-rose-600'
        }
      },
      blue: {
        bg: isDarkMode ? 'bg-blue-900/60 border-blue-700/80' : 'bg-blue-50',
        text: isDarkMode ? 'text-blue-200' : 'text-blue-600',
        textBold: isDarkMode ? 'text-blue-300' : 'text-blue-700',
        badge: {
          positive: isDarkMode ? 'bg-blue-800/80 text-blue-200' : 'bg-blue-100 text-blue-600',
          negative: isDarkMode ? 'bg-rose-800/80 text-rose-200' : 'bg-rose-100 text-rose-600'
        }
      }
    };

    return {
      bg: baseClasses[color as keyof typeof baseClasses].bg,
      text: baseClasses[color as keyof typeof baseClasses].text,
      textBold: baseClasses[color as keyof typeof baseClasses].textBold,
      badge: baseClasses[color as keyof typeof baseClasses].badge[status as keyof typeof baseClasses[keyof typeof baseClasses]['badge']]
    };
  };

  return (
    <Card className={`p-4 mb-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/50 border-gray-100'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        Indicadores de Desempenho
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map((indicator, index) => {
          const colorClasses = getColorClasses(indicator.color, indicator.status);
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg ${colorClasses.bg}`}
            >
              <p className={`text-sm font-medium ${colorClasses.text}`}>{indicator.name}</p>
              <p className={`text-xl font-semibold mt-1 ${colorClasses.textBold}`}>{indicator.value}</p>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 rounded-full text-xs ${colorClasses.badge}`}>
                  {indicator.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
