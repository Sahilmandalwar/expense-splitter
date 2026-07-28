import { apiClient } from "../../api/client";
import type { GetBalancesResponse } from "./types";

export const getBalances = async (
  groupId: string
): Promise<GetBalancesResponse> => {
  const response = await apiClient.get(
    `/group/${groupId}/balances`
  );

  return response.data;
};

import type { GetDebtSimplifyResponse } from "./types";

export const getDebtSimplify = async (
  groupId: string
): Promise<GetDebtSimplifyResponse> => {
  const response = await apiClient.get(
    `/group/${groupId}/debt-simplify`
  );

  return response.data;
};