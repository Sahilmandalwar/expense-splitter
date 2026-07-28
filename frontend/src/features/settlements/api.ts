import { apiClient } from "../../api/client";

import type {
  GetSettlementsResponse,
  CreateSettlementResponse,
} from "./types";

import type { CreateSettlementInput } from "./validation";

export const getSettlements = async (
  groupId: string
): Promise<GetSettlementsResponse> => {
  const response =
    await apiClient.get(
      `/settlement/${groupId}/fetch`
    );

  return response.data;
};

export const createSettlement =
  async (
    groupId: string,
    data: CreateSettlementInput
  ): Promise<CreateSettlementResponse> => {
    const response =
      await apiClient.post(
        `/settlement/${groupId}/create`,
        data
      );

    return response.data;
  };