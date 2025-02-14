
export interface ExpenseHistory {
  month: string;
  value: number;
}

export interface Expense {
  category: string;
  value: number;
  previousValues: ExpenseHistory[];
}
