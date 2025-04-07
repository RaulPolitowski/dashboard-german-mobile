import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

const ComparisonCard = ({
    title,
    currentValue,
    previousValue,
    comparison,
    bgColor
}: {
    title: string;
    currentValue: number;
    previousValue: number;
    comparison: number;
    bgColor: string;
}) => {
    const isPositive = comparison > 0;

    return (
        <Card className={`p-4 ${bgColor}`}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{title}</h3>
                    <div className="flex items-center gap-1 text-sm text-white">
                        {isPositive ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />}
                        <span>{Math.abs(comparison).toFixed(1)}%</span>
                    </div>
                </div>
                <p className="text-2xl font-bold text-white">
                    R$ {currentValue.toLocaleString("pt-BR")}
                </p>
                <p className="text-sm text-white/80">
                    Mesmo dia mês anterior: R$ {previousValue.toLocaleString("pt-BR")}
                </p>
            </div>
        </Card>
    );
};

export const FinancialOverview = () => {
    const [totals, setTotals] = useState({
        inflow: 0,
        outflow: 0,
        result: 0,
        comparison: { inflow: 0, outflow: 0, result: 0 }
    });

    const [lastMonthSameDay, setLastMonthSameDay] = useState({
        inflow: 0,
        outflow: 0,
        result: 0
    });

    useEffect(() => {
        const fetchFinancialData = async () => {
            try {
                const response = await fetch("http://localhost:9006/dados");
                if (!response.ok) {
                    console.error("Erro ao buscar os dados:", response.statusText);
                    return;
                }

                const data = await response.json();
                console.log("📊 Dados recebidos:", data);

                const receitaTotal = Number(data.receitaTotal) || 0;
                const despesaTotal = Number(data.despesaTotal) || 0;

                setTotals({
                    inflow: receitaTotal,
                    outflow: despesaTotal,
                    result: receitaTotal - despesaTotal,
                    comparison: { inflow: 10, outflow: -10, result: 5 }
                });

                setLastMonthSameDay({
                    inflow: 3000,
                    outflow: 700,
                    result: 2300
                });

            } catch (error) {
                console.error("Erro na conexão com o servidor:", error);
            }
        };

        fetchFinancialData();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ComparisonCard
                title="Receitas"
                currentValue={totals.inflow}
                previousValue={lastMonthSameDay.inflow}
                comparison={totals.comparison.inflow}
                bgColor="bg-emerald-500"
            />
            <ComparisonCard
                title="Despesas"
                currentValue={totals.outflow}
                previousValue={lastMonthSameDay.outflow}
                comparison={totals.comparison.outflow}
                bgColor="bg-red-500"
            />
            <ComparisonCard
                title="Resultado"
                currentValue={totals.result}
                previousValue={lastMonthSameDay.result}
                comparison={totals.comparison.result}
                bgColor="bg-blue-500"
            />
        </div>
    );
}; 