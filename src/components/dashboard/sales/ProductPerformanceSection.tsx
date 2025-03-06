
import { useState } from 'react';
import { Card } from '../../ui/card';
import { ProductRanking } from '../../charts/ProductRanking';
import { LowPerformanceProducts } from '../../charts/LowPerformanceProducts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { useTheme } from '@/hooks/use-theme';

export const ProductPerformanceSection = () => {
  const [rankingType, setRankingType] = useState<'value' | 'quantity'>('value');
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>Performance de Produtos</h3>
        <Select value={rankingType} onValueChange={(value: 'value' | 'quantity') => setRankingType(value)}>
          <SelectTrigger className={`w-[180px] ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : ''}`}>
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
            <SelectGroup>
              <SelectItem value="value" className={isDarkMode ? 'text-gray-200 focus:bg-gray-700 focus:text-gray-100' : ''}>Valor Total</SelectItem>
              <SelectItem value="quantity" className={isDarkMode ? 'text-gray-200 focus:bg-gray-700 focus:text-gray-100' : ''}>Quantidade</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductRanking />
        <LowPerformanceProducts />
      </div>
    </div>
  );
};
