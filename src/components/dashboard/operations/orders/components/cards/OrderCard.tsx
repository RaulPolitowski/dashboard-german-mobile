
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface OrderCardProps {
  title: string;
  count: number;
  value: number;
  type: "created" | "approved" | "pending" | "cancelled";
  Icon: LucideIcon;
  onClick: () => void;
}

const getCardStyle = (type: "created" | "approved" | "pending" | "cancelled") => {
  const styles = {
    created: {
      bg: "bg-gradient-to-br from-indigo-50 to-white border-indigo-200 dark:from-indigo-900/50 dark:to-gray-900",
      text: "text-indigo-600 dark:text-indigo-400",
      textDark: "text-indigo-700 dark:text-indigo-300",
      iconBg: "bg-indigo-100 dark:bg-indigo-900/50",
    },
    approved: {
      bg: "bg-gradient-to-br from-emerald-50 to-white border-emerald-200 dark:from-emerald-900/50 dark:to-gray-900",
      text: "text-emerald-600 dark:text-emerald-400",
      textDark: "text-emerald-700 dark:text-emerald-300",
      iconBg: "bg-emerald-100 dark:bg-emerald-900/50",
    },
    pending: {
      bg: "bg-gradient-to-br from-amber-50 to-white border-amber-200 dark:from-amber-900/50 dark:to-gray-900",
      text: "text-amber-600 dark:text-amber-400",
      textDark: "text-amber-700 dark:text-amber-300",
      iconBg: "bg-amber-100 dark:bg-amber-900/50",
    },
    cancelled: {
      bg: "bg-gradient-to-br from-rose-50 to-white border-rose-200 dark:from-rose-900/50 dark:to-gray-900",
      text: "text-rose-600 dark:text-rose-400",
      textDark: "text-rose-700 dark:text-rose-300",
      iconBg: "bg-rose-100 dark:bg-rose-900/50",
    },
  };
  return styles[type];
};

export const OrderCard = ({ title, count, value, type, Icon, onClick }: OrderCardProps) => {
  const styles = getCardStyle(type);

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
