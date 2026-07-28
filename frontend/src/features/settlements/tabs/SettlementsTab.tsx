import { useState } from "react";
import { Plus } from "lucide-react";
import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";

import { SettlementCard } from "../components/SettlementCard";
import { CreateSettlementModal } from "../components/CreateSettlementModal";

import { useSettlements } from "../hooks";

import type { GroupDetail } from "../../groups/types";

interface Props {
  group: GroupDetail;
}

export function SettlementsTab({
  group,
}: Props) {
  const [showModal, setShowModal] =
    useState(false);

  const {
    data,
    isPending,
    isError,
  } = useSettlements(group.id);

  if (isPending) {
    return (
      <div className="py-10">
        <LoadingSkeleton title="Loading settlements" items={2} compact />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="py-10 text-center text-red-500">
        Unable to fetch settlements.
      </div>
    );
  }

  const settlements = data.settlements;

  return (
    <>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Settlement History
            </h2>

            <p className="text-gray-500">
              View all recorded settlements.
            </p>

          </div>

          <button
            onClick={() =>
              setShowModal(true)
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white"
          >
            <Plus size={18} />

            Record Settlement
          </button>

        </div>

        {settlements.length === 0 ? (
          <div className="rounded-xl border border-dashed p-10 text-center">

            <h3 className="text-xl font-semibold">
              No Settlements Yet
            </h3>

            <p className="mt-2 text-gray-500">
              Record your first settlement.
            </p>

          </div>
        ) : (
          <div className="space-y-5">

            {settlements.map(
              (settlement) => (
                <SettlementCard
                  key={settlement.id}
                  settlement={
                    settlement
                  }
                />
              )
            )}

          </div>
        )}

      </div>

      <CreateSettlementModal
        open={showModal}
        groupId={group.id}
        members={group.members}
        onClose={() =>
          setShowModal(false)
        }
      />
    </>
  );
}