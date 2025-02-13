
export interface Order {
  id: string;
  client: string;
  value: number;
  description: string;
  seller: string;
  status: string;
  date: string;
  createdAt: string;
}

export interface OrderSummary {
  orders: Order[];
  total: number;
}

export interface OrderDetailsProps {
  title: string;
  orders: Order[];
}

export interface MockOrdersData {
  created: Order[];
  approved: Order[];
  pending: Order[];
  cancelled: Order[];
}
