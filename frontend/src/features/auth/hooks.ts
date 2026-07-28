import { useQuery } from "@tanstack/react-query";
import { getMe } from "./api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: false,
    refetchOnWindowFocus: false,
  });
}