
import { MockOrdersData } from "../types/order-metrics";

export const mockOrders: MockOrdersData = {
  created: [
    { id: '1', client: 'Cliente A', value: 12500, description: 'Pedido de Produtos X', seller: 'João Silva', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '2', client: 'Cliente B', value: 8900, description: 'Pedido de Produtos Y', seller: 'Maria Santos', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
  ],
  approved: [
    { id: '3', client: 'Cliente C', value: 15600, description: 'Pedido de Produtos Z', seller: 'Pedro Oliveira', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
  ],
  pending: [
    { id: '4', client: 'Cliente D', value: 9800, description: 'Pedido de Produtos W', seller: 'Ana Silva', status: 'pending', createdAt: '14/03/2024', date: '14/03/2024' },
  ],
  cancelled: [
    { id: '5', client: 'Cliente E', value: 7500, description: 'Pedido de Produtos V', seller: 'Carlos Santos', status: 'cancelled', createdAt: '13/03/2024', date: '13/03/2024' },
  ],
};
