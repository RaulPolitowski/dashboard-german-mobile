
import { createContext, useContext, useState, ReactNode } from "react";

type CardStyle = "solid" | "gradient";

interface CardStyleContextType {
  cardStyle: CardStyle;
  toggleCardStyle: () => void;
}

const CardStyleContext = createContext<CardStyleContextType | undefined>(undefined);

export function CardStyleProvider({ children }: { children: ReactNode }) {
  const [cardStyle, setCardStyle] = useState<CardStyle>("gradient");

  const toggleCardStyle = () => {
    setCardStyle(prev => prev === "solid" ? "gradient" : "solid");
  };

  return (
    <CardStyleContext.Provider value={{ cardStyle, toggleCardStyle }}>
      {children}
    </CardStyleContext.Provider>
  );
}

export function useCardStyle() {
  const context = useContext(CardStyleContext);
  if (context === undefined) {
    throw new Error("useCardStyle must be used within a CardStyleProvider");
  }
  return context;
}
