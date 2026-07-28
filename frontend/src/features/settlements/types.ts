export interface SettlementUser {
  id: string;
  name: string;
  email: string;
}

export interface Settlement {
  id: string;

  paidBy: SettlementUser;

  receivedBy: SettlementUser;

  amount: string;

  description: string | null;

  createdAt: string;

  groupId: string;
}

export interface GetSettlementsResponse {
  success: boolean;
  message: string;
  settlements: Settlement[];
}

export interface CreateSettlementResponse {
  success: boolean;
  message: string;
  settlement: Settlement;
}

