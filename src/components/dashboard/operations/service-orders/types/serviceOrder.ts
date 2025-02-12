
export interface ServiceOrder {
  id: string;
  description: string;
  client: string;
  value: number;
  status: 'pending' | 'in_progress' | 'delayed' | 'completed';
  technician: string;
  startDate: Date;
  dueDate: Date;
  completedDate?: Date;
  type: string;
}

export interface ServiceOrderMetrics {
  totalCount: number;
  totalValue: number;
  inProgressCount: number;
  inProgressValue: number;
  delayedCount: number;
  delayedValue: number;
  completedCount: number;
  completedValue: number;
  dueTodayCount: number;
  dueTodayValue: number;
  averageCompletionTime: number;
  onTimeDeliveryRate: number;
}

