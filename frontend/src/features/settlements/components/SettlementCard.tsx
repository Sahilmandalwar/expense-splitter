import type { Settlement } from "../types";
import { ArrowRight } from "lucide-react";

interface SettlementCardProps {
  settlement: Settlement;
}

export function SettlementCard({
  settlement,
}: SettlementCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-gray-500">
            Paid By
          </p>

          <h3 className="font-semibold">
            {settlement.paidBy.name}
          </h3>

          <p className="text-xs text-gray-500">
            {settlement.paidBy.email}
          </p>

        </div>

        <ArrowRight
          size={24}
          className="text-blue-600"
        />

        <div className="text-right">

          <p className="text-sm text-gray-500">
            Received By
          </p>

          <h3 className="font-semibold">
            {settlement.receivedBy.name}
          </h3>

          <p className="text-xs text-gray-500">
            {settlement.receivedBy.email}
          </p>

        </div>

      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">

        <div>

          <p className="text-sm text-gray-500">
            Amount
          </p>

          <p className="text-2xl font-bold text-green-600">
            ₹
            {Number(
              settlement.amount
            ).toLocaleString("en-IN")}
          </p>

        </div>

        <div className="text-right">

          <p className="text-sm text-gray-500">
            Date
          </p>

          <p className="font-medium">
            {new Date(
              settlement.createdAt
            ).toLocaleDateString()}
          </p>

        </div>

      </div>

      {settlement.description && (
        <div className="mt-4 rounded-lg bg-gray-50 p-3">

          <p className="text-sm text-gray-600">
            {settlement.description}
          </p>

        </div>
      )}

    </div>
  );
}