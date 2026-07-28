export interface ExpenseParticipant {
  user: {
    id: string;
    name: string;
    email: string;
  };

  amountOwed: string;
}

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: string;
  groupId: string;

  paidBy: {
    id: string;
    name: string;
    email: string;
  };

  expenseParticipants: ExpenseParticipant[];
}

export interface ExpensePagination {
  skip: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface GetExpensesResponse {
  success: boolean;
  message: string;
  expenses: {
    expenses: Expense[];
    pagination: ExpensePagination;
  };
}

export type SplitType = "EQUAL" | "EXACT" | "PERCENTAGE";

export interface ExpenseParticipantInput {
  userId: string;
  amount?: number;
  percentage?: number;
}

export interface CreateExpenseInput {
  title: string;
  description?: string;
  amount: number;
  splitType: SplitType;
  participants: ExpenseParticipantInput[];
}