import { apiClient } from "../../api/client";
import type { GetExpensesResponse } from "./types";

export interface CreateExpensePayload {
  title: string;
  description: string;
  amount: number;
  splitType: "EQUAL" | "EXACT" | "PERCENTAGE";
  participants: {
    userId: string;
    amount?: number;
    percentage?: number;
  }[];
}

export const getExpenses = async (
  groupId: string,
  page = 1
): Promise<GetExpensesResponse> => {
  const response = await apiClient.get(
    `/expense/${groupId}/expenses?page=${page}`
  );

  return response.data;
};

export const createExpense = async (
  groupId: string,
  data: CreateExpensePayload
) => {
  const response = await apiClient.post(
    `/expense/${groupId}/create`,
    data
  );

  return response.data;
};