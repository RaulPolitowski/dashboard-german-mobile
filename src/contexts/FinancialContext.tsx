import React, { createContext, useContext, ReactNode } from 'react';
import { useFinancialData } from '../hooks/useFinancialData';

interface FinancialContextType {
    inflow: number;
    outflow: number;
    lastMonthInflow: number;
    lastMonthOutflow: number;
}

const FinancialContext = createContext<FinancialContextType>({
    inflow: 0,
    outflow: 0,
    lastMonthInflow: 0,
    lastMonthOutflow: 0
});

export const FinancialProvider = ({ children }: { children: ReactNode }) => {
    const data = useFinancialData();

    const value = {
        inflow: data?.receitaTotal ?? 0,
        outflow: data?.despesaTotal ?? 0,
        lastMonthInflow: data?.receitaMesAnterior ?? 0,
        lastMonthOutflow: data?.despesaMesAnterior ?? 0
    };

    return (
        <FinancialContext.Provider value={value}>
            {children}
        </FinancialContext.Provider>
    );
};

export const useFinancial = () => {
    const context = useContext(FinancialContext);
    if (!context) {
        throw new Error('useFinancial must be used within a FinancialProvider');
    }
    return context;
}; 