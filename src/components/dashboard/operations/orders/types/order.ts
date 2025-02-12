
export interface Order {
  id: string;
  client: string;
  value: number;
  description: string;
  seller: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  expiresAt: Date;
}

export interface OrderMetrics {
  totalCount: number;
  totalValue: number;
  pendingCount: number;
  pendingValue: number;
  approvedCount: number;
  approvedValue: number;
  rejectedCount: number;
  rejectedValue: number;
  dueTodayCount: number;
  dueTodayValue: number;
  conversionRate: number;
  averageApprovalTime: number;
}
