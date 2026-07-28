import type { Balance } from "../types";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface BalanceCardProps {
  balance: Balance;
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const amount = Number(balance.balance);
  const isPositive = amount > 0;
  const isZero = amount === 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {balance.user.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {balance.user.email}
          </p>
        </div>

        {!isZero && (
          <div
            className={`rounded-full p-2 ${
              isPositive ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {isPositive ? (
              <ArrowDownRight className="text-green-600" size={20} />
            ) : (
              <ArrowUpRight className="text-red-600" size={20} />
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {isZero ? (
          <>
            <p className="text-sm font-medium text-gray-500">Settled Up</p>
            <p className="mt-1 text-2xl font-bold text-gray-700">₹0</p>
          </>
        ) : (
          <>
            <p
              className={`text-sm font-medium ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {isPositive ? "Should Receive" : "Should Pay"}
            </p>
            <p
              className={`mt-1 text-3xl font-bold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              ₹{Math.abs(amount).toLocaleString("en-IN")}
            </p>
          </>
        )}
      </div>
    </div>
  );
}