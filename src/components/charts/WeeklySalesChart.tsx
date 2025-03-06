import { Card } from '../ui/card';
import { useIsMobile } from '../../hooks/use-mobile';
import { FilterControls } from './weekly-sales/FilterControls';
import { SalesBarChart } from './weekly-sales/components/SalesBarChart';
import { MobileView } from './weekly-sales/components/MobileView';
import { PerformanceInsights } from './weekly-sales/components/PerformanceInsights';
import { TimeRangeSummary } from './weekly-sales/components/TimeRangeSummary';
import { OverallInsights } from './weekly-sales/components/OverallInsights';
import { useSalesData } from './weekly-sales/hooks/useSalesData';

interface WeeklySalesChartProps {
  onDayClick?: (date: string) => void;
}

export const WeeklySalesChart = ({ onDayClick }: WeeklySalesChartProps) => {
  const isMobile = useIsMobile();
  const {
    selectedRange,
    setSelectedRange,
    customDateRange,
    setCustomDateRange,
    dateFilter,
    handleDateFilterChange,
    prepareChartData,
    prepareMobileData,
    calculateOverallPerformance,
    getDayDate
  } = useSalesData();

  const handleCardClick = (dayName: string) => {
    if (onDayClick) {
      const rawDayName = dayName.replace(' (Prévia)', '');
      const formattedDate = getDayDate(rawDayName);
      onDayClick(formattedDate);
    }
  };

  const chartData = prepareChartData();
  const mobileData = prepareMobileData();
  const { bestSellerOverall, worstSellerOverall, totalPeriod } = calculateOverallPerformance(chartData);

  return (
    <Card className="p-4 md:p-6 bg-background/50 dark:bg-gray-900/50 border dark:border-gray-800">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Análise de Vendas por Horário</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Distribuição semanal de vendas por intervalo</p>
          </div>
          <FilterControls
            dateFilter={dateFilter}
            selectedRange={selectedRange}
            customDateRange={customDateRange}
            onDateFilterChange={handleDateFilterChange}
            onRangeChange={setSelectedRange}
            onCustomDateChange={setCustomDateRange}
          />
        </div>

        {isMobile ? (
          <MobileView 
            data={mobileData}
            selectedRange={selectedRange}
            onCardClick={handleCardClick}
          />
        ) : (
          <>
            <SalesBarChart 
              data={chartData}
              selectedRange={selectedRange}
              onBarClick={handleCardClick}
            />
            
            <PerformanceInsights
              bestSeller={chartData[0]?.bestSeller}
              worstSeller={chartData[0]?.worstSeller}
            />

            <TimeRangeSummary data={chartData[0]} />
          </>
        )}

        <OverallInsights 
          bestSellerOverall={bestSellerOverall}
          worstSellerOverall={worstSellerOverall}
          totalPeriod={totalPeriod}
        />
      </div>
    </Card>
  );
};
