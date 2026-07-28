export interface Group {
  id: string;
  name: string;
  description: string | null;
}

export interface UserGroup {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: string;
  group: Group;
}

export interface GetMyGroupsResponse {
  success: boolean;
  message: string;
  groups: UserGroup[];
}

export interface Member {
  id: string;
  userId: string;
  groupId: string;
  joinedAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface GroupDetail {
  id: string;
  name: string;
  description: string | null;

  members: Member[];
}

export interface GroupDetailResponse {
  success: boolean;
  message: string;
  group: GroupDetail;
}