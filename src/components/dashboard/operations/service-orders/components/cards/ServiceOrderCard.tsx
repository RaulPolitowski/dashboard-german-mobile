
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

interface ServiceOrderCardProps {
  title: string;
  count: number;
  value: number;
  type: "inProgress" | "delayed" | "completed";
  Icon: LucideIcon;
  onClick: () => void;
}

const getCardStyle = (type: "inProgress" | "delayed" | "completed", isDarkMode: boolean) => {
  if (isDarkMode) {
    const styles = {
      inProgress: {
        bg: "bg-indigo-900/50 border-indigo-800/50",
        text: "text-indigo-300",
        textDark: "text-indigo-200",
        iconBg: "bg-indigo-800/50",
      },
      delayed: {
        bg: "bg-rose-900/50 border-rose-800/50",
        text: "text-rose-300",
        textDark: "text-rose-200",
        iconBg: "bg-rose-800/50",
      },
      completed: {
        bg: "bg-emerald-900/50 border-emerald-800/50",
        text: "text-emerald-300",
        textDark: "text-emerald-200",
        iconBg: "bg-emerald-800/50",
      },
    };
    return styles[type];
  } else {
    const styles = {
      inProgress: {
        bg: "bg-gradient-to-br from-indigo-50 to-white border-indigo-200",
        text: "text-indigo-600",
        textDark: "text-indigo-700",
        iconBg: "bg-indigo-100",
      },
      delayed: {
        bg: "bg-gradient-to-br from-rose-50 to-white border-rose-200",
        text: "text-rose-600",
        textDark: "text-rose-700",
        iconBg: "bg-rose-100",
      },
      completed: {
        bg: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200",
        text: "text-emerald-600",
        textDark: "text-emerald-700",
        iconBg: "bg-emerald-100",
      },
    };
    return styles[type];
  }
};

export const ServiceOrderCard = ({ title, count, value, type, Icon, onClick }: ServiceOrderCardProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const styles = getCardStyle(type, isDarkMode);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className={`p-4 relative overflow-hidden cursor-pointer hover:shadow-xl transition-all ${styles.bg}`}
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium mb-1 ${styles.text}`}>{title}</p>
              <p className={`text-2xl font-bold ${styles.textDark}`}>
                {count}
              </p>
              <p className={`text-xs mt-1 ${styles.text}`}>
                R$ {value.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-full ${styles.iconBg}`}>
              <Icon className={`w-6 h-6 ${styles.text}`} />
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <p>Clique para ver detalhes</p>
      </TooltipContent>
    </Tooltip>
  );
};
