import { useEffect, useState } from 'react';

interface FinancialData {
    mensagem: string;
    receitaTotal: number;
    despesaTotal: number;
    receitaMesAnterior: number;
    despesaMesAnterior: number;
}

export const useFinancialData = () => {
    const [data, setData] = useState<FinancialData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9006/dados');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, []);

    return data;
}; 