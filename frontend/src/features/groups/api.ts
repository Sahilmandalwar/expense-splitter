import { apiClient } from "../../api/client";
import type { GetMyGroupsResponse } from "./types";
import type { CreateGroupInput } from "./validation";
import type { AddMemberInput } from "./validation";


export const getMyGroups = async (): Promise<GetMyGroupsResponse> => {
  const response = await apiClient.get("/group/myGroups");
  return response.data;
};


export const createGroup = async (
  data: CreateGroupInput
) => {
  const response = await apiClient.post(
    "/group/create",
    data
  );

  return response.data;
};

export const getGroupDetail = async (groupId: string) => {
  const response = await apiClient.get(
    `/group/${groupId}/detail`
  );

  return response.data;
};


export const addMember = async (
  groupId: string,
  data: AddMemberInput
) => {
  const response = await apiClient.post(
    `/group/${groupId}/members`,
    data
  );

  return response.data;
};