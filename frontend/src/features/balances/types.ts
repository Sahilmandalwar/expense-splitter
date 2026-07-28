export interface BalanceUser {
  id: string;
  name: string;
  email: string;
}

export interface Balance {
  user: BalanceUser;
  balance: number;
}

export interface GetBalancesResponse {
  success: boolean;
  message: string;
  balance: Balance[];
}

export interface SimplifiedDebt {
  sender: {
    id: string;
    name: string;
    email: string;
  };

  receiver: {
    id: string;
    name: string;
    email: string;
  };

  amount: number;
}

export interface GetDebtSimplifyResponse {
  success: boolean;
  message: string;
  debtSimplifySuggestion: SimplifiedDebt[];
}