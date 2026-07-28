import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createExpense, getExpenses } from "./api";

export function useExpenses(groupId: string, page: number) {
  return useQuery({
    queryKey: ["expenses", groupId, page],
    queryFn: () => getExpenses(groupId, page),
    enabled: !!groupId,
  });
}

export function useCreateExpense(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof createExpense>[1]) =>
      createExpense(groupId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", groupId],
      });

      queryClient.invalidateQueries({
        queryKey: ["balances", groupId],
      });

      queryClient.invalidateQueries({
        queryKey: ["settlements", groupId],
      });
    },
  });
}