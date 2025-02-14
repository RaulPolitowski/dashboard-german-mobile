
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
  switch (type) {
    case "created":
      return {
        bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-900/20 dark:border-indigo-800/30",
        text: "text-indigo-600 dark:text-indigo-400",
        textDark: "text-indigo-700 dark:text-indigo-300",
        iconBg: "bg-indigo-100/80 dark:bg-indigo-900/30",
      };
    case "approved":
      return {
        bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800/30",
        text: "text-emerald-600 dark:text-emerald-400",
        textDark: "text-emerald-700 dark:text-emerald-300",
        iconBg: "bg-emerald-100/80 dark:bg-emerald-900/30",
      };
    case "pending":
      return {
        bg: "bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800/30",
        text: "text-amber-600 dark:text-amber-400",
        textDark: "text-amber-700 dark:text-amber-300",
        iconBg: "bg-amber-100/80 dark:bg-amber-900/30",
      };
    case "cancelled":
      return {
        bg: "bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800/30",
        text: "text-rose-600 dark:text-rose-400",
        textDark: "text-rose-700 dark:text-rose-300",
        iconBg: "bg-rose-100/80 dark:bg-rose-900/30",
      };
  }
};

export const OrderCard = ({ title, count, value, type, Icon, onClick }: OrderCardProps) => {
  const styles = getCardStyle(type);

  if (!styles) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className={`relative p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${styles.bg} border`}
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className={`text-sm font-medium ${styles.text}`}>{title}</p>
              <p className={`text-2xl font-bold ${styles.textDark}`}>
                {count}
              </p>
              <p className={`text-xs ${styles.text}`}>
                R$ {value.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${styles.iconBg}`}>
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
