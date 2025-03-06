
import { BudgetData } from "../types/budget";

export const mockBudgetData: BudgetData = {
  overview: {
    totalCount: 158,
    totalValue: 1850000,
    openCount: 45,
    openValue: 320000,
    expiringCount: 12,
    expiringValue: 85000,
    expiredCount: 8,
    expiredValue: 42000,
    approvedCount: 82,
    approvedValue: 480000,
    rejectedCount: 31,
    rejectedValue: 165000,
    pendingApprovalCount: 18,
    pendingApprovalValue: 156000,
  },
  performance: {
    conversionRate: 68,
    averageResponseTime: 3.2,
    targetResponseTime: 2.5,
    conversionTrend: 5,
  },
  sellers: [
    { name: "João Silva", budgets: 45, conversionRate: 72, value: 280000 },
    { name: "Maria Santos", budgets: 38, conversionRate: 65, value: 245000 },
    { name: "Pedro Oliveira", budgets: 42, conversionRate: 58, value: 198000 },
  ],
  topClients: [
    { name: "Empresa ABC Ltda", budgets: 8, value: 156000 },
    { name: "Indústria XYZ", budgets: 6, value: 98000 },
    { name: "Comércio 123", budgets: 5, value: 86000 },
  ],
  cancellationReasons: [
    { reason: "Preço alto", count: 15, value: 86000 },
    { reason: "Prazo incompatível", count: 8, value: 42000 },
    { reason: "Especificação inadequada", count: 5, value: 28000 },
  ],
  forecast: {
    potentialValue: 1200000,
    expectedValue: 816000,
    confidence: 85,
  },
  comparisons: {
    lastPeriod: {
      budgets: 12,
      value: 15,
      conversion: 5,
    },
  },
};
