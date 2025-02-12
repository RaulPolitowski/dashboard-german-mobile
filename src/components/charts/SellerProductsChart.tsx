
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card } from '../ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

const COLORS = ['#818cf8', '#34d399', '#f472b6', '#fbbf24', '#60a5fa'];

const productData = [
  { name: 'Produto A', value: 35000, quantity: 120 },
  { name: 'Produto B', value: 28000, quantity: 85 },
  { name: 'Produto C', value: 22000, quantity: 95 },
  { name: 'Produto D', value: 15000, quantity: 45 },
  { name: 'Outros', value: 12000, quantity: 40 },
];

interface SellerProductsChartProps {
  sellerId: string;
  sellerName: string;
}

export const SellerProductsChart = ({ sellerId, sellerName }: SellerProductsChartProps) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">{data.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Valor: <span className="font-medium text-[#6366F1]">R$ {data.value.toLocaleString()}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Quantidade: <span className="font-medium text-[#6366F1]">{data.quantity}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-4 md:p-6">
      {isMinimized ? (
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Produtos Mais Vendidos - {sellerName}
          </h3>
          <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Produtos Mais Vendidos - {sellerName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Distribuição de vendas por produto
              </p>
            </div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-3">Detalhamento</h4>
            <div className="space-y-2">
              {productData.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{product.name}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      R$ {product.value.toLocaleString()}
                    </span>
                    <span className="text-gray-400 dark:text-gray-500 ml-2">
                      ({product.quantity} un.)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};
