import type { SimplifiedDebt } from "../types";
import { ArrowRight } from "lucide-react";

interface Props {
  settlement: SimplifiedDebt;
}

export function SettlementCard({
  settlement,
}: Props) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {settlement.sender.name}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Pays
          </p>
        </div>

        <ArrowRight
          className="text-blue-500"
          size={20}
        />

        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">
            {settlement.receiver.name}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Receives
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-blue-50 px-3 py-3 text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-blue-600">
          Amount
        </p>
        <p className="mt-1 text-xl font-semibold text-blue-700">
          ₹{settlement.amount.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}