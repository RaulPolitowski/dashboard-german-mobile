
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
        bg: "bg-gradient-to-br from-indigo-50 via-indigo-50/80 to-white border-indigo-200 dark:from-indigo-900/50 dark:via-indigo-900/30 dark:to-gray-900 dark:border-indigo-800/30",
        text: "text-indigo-600 dark:text-indigo-400",
        textDark: "text-indigo-700 dark:text-indigo-300",
        iconBg: "bg-indigo-100/80 dark:bg-indigo-900/50",
      };
    case "approved":
      return {
        bg: "bg-gradient-to-br from-emerald-50 via-emerald-50/80 to-white border-emerald-200 dark:from-emerald-900/50 dark:via-emerald-900/30 dark:to-gray-900 dark:border-emerald-800/30",
        text: "text-emerald-600 dark:text-emerald-400",
        textDark: "text-emerald-700 dark:text-emerald-300",
        iconBg: "bg-emerald-100/80 dark:bg-emerald-900/50",
      };
    case "pending":
      return {
        bg: "bg-gradient-to-br from-amber-50 via-amber-50/80 to-white border-amber-200 dark:from-amber-900/50 dark:via-amber-900/30 dark:to-gray-900 dark:border-amber-800/30",
        text: "text-amber-600 dark:text-amber-400",
        textDark: "text-amber-700 dark:text-amber-300",
        iconBg: "bg-amber-100/80 dark:bg-amber-900/50",
      };
    case "cancelled":
      return {
        bg: "bg-gradient-to-br from-rose-50 via-rose-50/80 to-white border-rose-200 dark:from-rose-900/50 dark:via-rose-900/30 dark:to-gray-900 dark:border-rose-800/30",
        text: "text-rose-600 dark:text-rose-400",
        textDark: "text-rose-700 dark:text-rose-300",
        iconBg: "bg-rose-100/80 dark:bg-rose-900/50",
      };
  }
};

export const OrderCard = ({ title, count, value, type, Icon, onClick }: OrderCardProps) => {
  const styles = getCardStyle(type);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card 
          className={`relative p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${styles?.bg || ''} border`}
          onClick={onClick}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className={`text-sm font-medium ${styles?.text || ''}`}>{title}</p>
              <p className={`text-2xl font-bold ${styles?.textDark || ''}`}>
                {count}
              </p>
              <p className={`text-xs ${styles?.text || ''}`}>
                R$ {value.toLocaleString()}
              </p>
            </div>
            <div className={`p-3 rounded-xl ${styles?.iconBg || ''}`}>
              <Icon className={`w-6 h-6 ${styles?.text || ''}`} />
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" align="center">
        <p>Clique para ver detalhes</p>
      </TooltipContent>
    </Tooltip>
  );
};
