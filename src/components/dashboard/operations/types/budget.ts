
export interface BudgetData {
  overview: {
    totalCount: number;
    totalValue: number;
    openCount: number;
    openValue: number;
    expiringCount: number;
    expiringValue: number;
    expiredCount: number;
    expiredValue: number;
    approvedCount: number;
    approvedValue: number;
    rejectedCount: number;
    rejectedValue: number;
    pendingApprovalCount: number;
    pendingApprovalValue: number;
  };
  performance: {
    conversionRate: number;
    averageResponseTime: number;
    targetResponseTime: number;
    conversionTrend: number;
  };
  sellers: Array<{
    name: string;
    budgets: number;
    conversionRate: number;
    value: number;
  }>;
  topClients: Array<{
    name: string;
    budgets: number;
    value: number;
  }>;
  cancellationReasons: Array<{
    reason: string;
    count: number;
    value: number;
  }>;
  forecast: {
    potentialValue: number;
    expectedValue: number;
    confidence: number;
  };
  comparisons: {
    lastPeriod: {
      budgets: number;
      value: number;
      conversion: number;
    };
  };
}
