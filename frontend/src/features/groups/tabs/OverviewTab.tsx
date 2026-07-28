import { useState } from "react";
import { Plus } from "lucide-react";

import type { Member } from "../types";
import { AddMemberModal } from "../components/AddMemberModal";

interface OverviewTabProps {
  groupId: string;
  members: Member[];
}

export function OverviewTab({
  groupId,
  members,
}: OverviewTabProps) {
  const [showAddMember, setShowAddMember] =
    useState(false);

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Members
            </h2>

            <p className="text-sm text-gray-500">
              {members.length} member(s)
            </p>

          </div>

          <button
            onClick={() =>
              setShowAddMember(true)
            }
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            <Plus size={18} />

            Add Member
          </button>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          {members.map((member) => (
            <div
              key={member.id}
              className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold">
                {member.user.name}
              </h3>

              <p className="mt-1 text-gray-500">
                {member.user.email}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                Joined{" "}
                {new Date(
                  member.joinedAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}

        </div>

      </div>

      <AddMemberModal
        open={showAddMember}
        groupId={groupId}
        onClose={() =>
          setShowAddMember(false)
        }
      />
    </>
  );
}