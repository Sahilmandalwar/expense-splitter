import { BalanceCard } from "../components/BalanceCard";
import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";
import { SettlementCard } from "../components/SettlementCard";

import { useBalances, useDebtSimplify } from "../hooks";

interface BalancesTabProps {
  groupId: string;
}

export function BalancesTab({
  groupId,
}: BalancesTabProps) {
  const balanceQuery =
    useBalances(groupId);

  const debtQuery =
    useDebtSimplify(groupId);

  if (
    balanceQuery.isPending ||
    debtQuery.isPending
  ) {
    return (
      <div className="py-10">
        <LoadingSkeleton title="Loading balances" items={3} />
      </div>
    );
  }

  if (
    balanceQuery.isError ||
    debtQuery.isError ||
    !balanceQuery.data ||
    !debtQuery.data
  ) {
    return (
      <div className="py-10 text-center text-red-500">
        Unable to load balances.
      </div>
    );
  }

  const balances =
    balanceQuery.data.balance;

  const suggestions =
    debtQuery.data
      .debtSimplifySuggestion;

  return (
    <div className="space-y-10">

      {/* Member Balance */}

      <section>

        <div className="mb-5">

          <h2 className="text-2xl font-bold">
            Member Balances
          </h2>

          <p className="text-gray-500">
            Net balance of every member.
          </p>

        </div>

        <div className="grid gap-5 md:grid-cols-2">

          {balances.map((balance) => (
            <BalanceCard
              key={balance.user.id}
              balance={balance}
            />
          ))}

        </div>

      </section>

      {/* Debt Simplification */}

      <section>

        <div className="mb-5">

          <h2 className="text-2xl font-bold">
            Recommended Payments
          </h2>

          <p className="text-gray-500">
            Minimum number of payments
            required to settle all debts.
          </p>

        </div>

        {suggestions.length === 0 ? (
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
            <h3 className="text-lg font-semibold text-green-700">
              🎉 Everyone is Settled Up
            </h3>
            <p className="mt-2 text-sm text-green-700">
              No payments are pending.
            </p>
          </div>
        ) : (
          <div className="space-y-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm">
            <div className="max-h-[460px] space-y-3 overflow-y-auto pr-1">
              {suggestions.map((settlement, index) => (
                <SettlementCard
                  key={index}
                  settlement={settlement}
                />
              ))}
            </div>
          </div>
        )}

      </section>

    </div>
  );
}