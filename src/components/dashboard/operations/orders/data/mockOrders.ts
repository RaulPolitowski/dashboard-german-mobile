
import { MockOrdersData } from "../types/order-metrics";

export const mockOrders: MockOrdersData = {
  created: [
    { id: '1', client: 'Cliente A', value: 12500, description: 'Pedido de Produtos X', seller: 'João Silva', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '2', client: 'Cliente B', value: 8900, description: 'Pedido de Produtos Y', seller: 'Maria Santos', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '3', client: 'Cliente C', value: 15600, description: 'Pedido de Produtos Z', seller: 'Pedro Oliveira', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '4', client: 'Cliente D', value: 7300, description: 'Pedido de Produtos W', seller: 'Ana Silva', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '5', client: 'Cliente E', value: 9400, description: 'Pedido de Produtos V', seller: 'Carlos Santos', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
    { id: '6', client: 'Cliente F', value: 11200, description: 'Pedido de Produtos U', seller: 'Julia Lima', status: 'pending', createdAt: '15/03/2024', date: '15/03/2024' },
  ],
  approved: [
    { id: '7', client: 'Cliente G', value: 13500, description: 'Pedido de Produtos T', seller: 'Rafael Costa', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
    { id: '8', client: 'Cliente H', value: 16800, description: 'Pedido de Produtos S', seller: 'Mariana Souza', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
    { id: '9', client: 'Cliente I', value: 10200, description: 'Pedido de Produtos R', seller: 'Lucas Ferreira', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
    { id: '10', client: 'Cliente J', value: 14700, description: 'Pedido de Produtos Q', seller: 'Isabela Santos', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
    { id: '11', client: 'Cliente K', value: 9800, description: 'Pedido de Produtos P', seller: 'Gabriel Silva', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
    { id: '12', client: 'Cliente L', value: 12300, description: 'Pedido de Produtos O', seller: 'Laura Oliveira', status: 'approved', createdAt: '14/03/2024', date: '14/03/2024' },
  ],
  pending: [
    { id: '13', client: 'Cliente M', value: 8900, description: 'Pedido de Produtos N', seller: 'Thiago Santos', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
    { id: '14', client: 'Cliente N', value: 11500, description: 'Pedido de Produtos M', seller: 'Carolina Lima', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
    { id: '15', client: 'Cliente O', value: 13200, description: 'Pedido de Produtos L', seller: 'Bruno Costa', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
    { id: '16', client: 'Cliente P', value: 15800, description: 'Pedido de Produtos K', seller: 'Amanda Silva', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
    { id: '17', client: 'Cliente Q', value: 10400, description: 'Pedido de Produtos J', seller: 'Daniel Oliveira', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
    { id: '18', client: 'Cliente R', value: 12700, description: 'Pedido de Produtos I', seller: 'Fernanda Santos', status: 'pending', createdAt: '13/03/2024', date: '13/03/2024' },
  ],
  cancelled: [
    { id: '19', client: 'Cliente S', value: 7500, description: 'Pedido de Produtos H', seller: 'Ricardo Lima', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
    { id: '20', client: 'Cliente T', value: 9300, description: 'Pedido de Produtos G', seller: 'Patricia Costa', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
    { id: '21', client: 'Cliente U', value: 11800, description: 'Pedido de Produtos F', seller: 'Marcelo Silva', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
    { id: '22', client: 'Cliente V', value: 14200, description: 'Pedido de Produtos E', seller: 'Beatriz Santos', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
    { id: '23', client: 'Cliente W', value: 8600, description: 'Pedido de Produtos D', seller: 'Gustavo Oliveira', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
    { id: '24', client: 'Cliente X', value: 10900, description: 'Pedido de Produtos C', seller: 'Camila Lima', status: 'cancelled', createdAt: '12/03/2024', date: '12/03/2024' },
  ],
};
