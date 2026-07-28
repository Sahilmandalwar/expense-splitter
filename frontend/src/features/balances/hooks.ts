import { useQuery } from "@tanstack/react-query";
import { getBalances } from "./api";

export function useBalances(groupId: string) {
  return useQuery({
    queryKey: ["balances", groupId],
    queryFn: () => getBalances(groupId),
    enabled: !!groupId,
  });
}

import { getDebtSimplify } from "./api";

export function useDebtSimplify(
  groupId: string
) {
  return useQuery({
    queryKey: [
      "debtSimplify",
      groupId,
    ],

    queryFn: () =>
      getDebtSimplify(groupId),

    enabled: !!groupId,
  });
}