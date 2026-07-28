import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createSettlement,
  getSettlements,
} from "./api";
import type { CreateSettlementInput } from "./validation";
import type { CreateSettlementResponse } from "./types";

export function useSettlements(
  groupId: string
) {
  return useQuery({
    queryKey: [
      "settlements",
      groupId,
    ],

    queryFn: () =>
      getSettlements(groupId),

    enabled: !!groupId,
  });
}

export function useCreateSettlement(
  groupId: string
) {
  const queryClient =
    useQueryClient();

  return useMutation<
    CreateSettlementResponse,
    unknown,
    CreateSettlementInput
  >({
    mutationFn: (data) =>
      createSettlement(groupId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "settlements",
          groupId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "balances",
          groupId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "debtSimplify",
          groupId,
        ],
      });
    },
  });
}