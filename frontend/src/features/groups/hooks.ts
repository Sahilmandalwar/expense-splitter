import { useQuery } from "@tanstack/react-query";
import { getMyGroups } from "./api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroup } from "./api";
import toast from "react-hot-toast";
import { getGroupDetail } from "./api";
import { addMember } from "./api";

export function useAddMember(
  groupId: string
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { email: string }) =>
      addMember(groupId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
    },
  });
}


export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getMyGroups,
  });
}



export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGroup,

    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["groups"],
      });
    },
  });
}


export function useGroup(groupId: string) {
  return useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupDetail(groupId),
    enabled: !!groupId,
  });
}