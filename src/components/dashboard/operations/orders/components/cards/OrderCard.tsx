
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

interface OrderCardProps {
  title: string;
  count: number;
  value: number;
  type: "created" | "approved" | "pending" | "cancelled";
  Icon: LucideIcon;
  onClick: () => void;
}

const getCardStyle = (type: "created" | "approved" | "pending" | "cancelled", isDarkMode: boolean) => {
  if (isDarkMode) {
    switch (type) {
      case "created":
        return {
          bg: "bg-indigo-900/60 border-indigo-700/80",
          text: "text-indigo-200",
          textDark: "text-indigo-100",
          iconBg: "bg-indigo-800/80",
        };
      case "approved":
        return {
          bg: "bg-emerald-900/60 border-emerald-700/80",
          text: "text-emerald-200",
          textDark: "text-emerald-100",
          iconBg: "bg-emerald-800/80",
        };
      case "pending":
        return {
          bg: "bg-amber-900/60 border-amber-700/80",
          text: "text-amber-200",
          textDark: "text-amber-100",
          iconBg: "bg-amber-800/80",
        };
      case "cancelled":
        return {
          bg: "bg-rose-900/60 border-rose-700/80",
          text: "text-rose-200",
          textDark: "text-rose-100",
          iconBg: "bg-rose-800/80",
        };
    }
  } else {
    switch (type) {
      case "created":
        return {
          bg: "bg-indigo-50 border-indigo-100",
          text: "text-indigo-600",
          textDark: "text-indigo-700",
          iconBg: "bg-indigo-100/80",
        };
      case "approved":
        return {
          bg: "bg-emerald-50 border-emerald-100",
          text: "text-emerald-600",
          textDark: "text-emerald-700",
          iconBg: "bg-emerald-100/80",
        };
      case "pending":
        return {
          bg: "bg-amber-50 border-amber-100",
          text: "text-amber-600",
          textDark: "text-amber-700",
          iconBg: "bg-amber-100/80",
        };
      case "cancelled":
        return {
          bg: "bg-rose-50 border-rose-100",
          text: "text-rose-600",
          textDark: "text-rose-700",
          iconBg: "bg-rose-100/80",
        };
    }
  }
};

export const OrderCard = ({ title, count, value, type, Icon, onClick }: OrderCardProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const styles = getCardStyle(type, isDarkMode);

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
