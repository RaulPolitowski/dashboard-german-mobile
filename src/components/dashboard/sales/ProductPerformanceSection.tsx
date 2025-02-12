
import { useState } from 'react';
import { Card } from '../../ui/card';
import { ProductRanking } from '../../charts/ProductRanking';
import { LowPerformanceProducts } from '../../charts/LowPerformanceProducts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';

export const ProductPerformanceSection = () => {
  const [rankingType, setRankingType] = useState<'value' | 'quantity'>('value');
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-700">Performance de Produtos</h3>
        <Select value={rankingType} onValueChange={(value: 'value' | 'quantity') => setRankingType(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="value">Valor Total</SelectItem>
              <SelectItem value="quantity">Quantidade</SelectItem>
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
