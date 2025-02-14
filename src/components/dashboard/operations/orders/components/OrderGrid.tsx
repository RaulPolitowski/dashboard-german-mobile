
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface OrderGridProps {
  children: ReactNode;
}

export const OrderGrid = ({ children }: OrderGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 md:px-0">
      <TooltipProvider delayDuration={200}>
        {children}
      </TooltipProvider>
    </div>
  );
};
