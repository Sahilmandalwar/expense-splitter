import type { Member } from "../../groups/types";

interface Participant {
  userId: string;
  amount?: number;
  percentage?: number;
}

interface ParticipantSelectorProps {
  members: Member[];

  splitType: "EQUAL" | "EXACT" | "PERCENTAGE";

  participants: Participant[];

  setParticipants: React.Dispatch<
    React.SetStateAction<Participant[]>
  >;
}

export function ParticipantSelector({
  members,
  splitType,
  participants,
  setParticipants,
}: ParticipantSelectorProps) {
  function isSelected(userId: string) {
    return participants.some(
      (participant) => participant.userId === userId
    );
  }

  function toggleParticipant(userId: string) {
    if (isSelected(userId)) {
      setParticipants((prev) =>
        prev.filter(
          (participant) => participant.userId !== userId
        )
      );
      return;
    }

    setParticipants((prev) => [
      ...prev,
      {
        userId,
      },
    ]);
  }

  function updateParticipant(
    userId: string,
    value: number
  ) {
    setParticipants((prev) =>
      prev.map((participant) => {
        if (participant.userId !== userId)
          return participant;

        if (splitType === "EXACT") {
          return {
            ...participant,
            amount: value,
          };
        }

        if (splitType === "PERCENTAGE") {
          return {
            ...participant,
            percentage: value,
          };
        }

        return participant;
      })
    );
  }

  return (
    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <h3 className="text-lg font-semibold">
          Participants
        </h3>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {participants.length} Selected
        </span>

      </div>

      <div className="max-h-72 space-y-3 overflow-y-auto rounded-xl border p-4">

        {members.map((member) => {

          const checked = isSelected(
            member.user.id
          );

          return (
            <div
              key={member.id}
              className="rounded-lg border p-3"
            >
              <label className="flex cursor-pointer items-center gap-3">

                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    toggleParticipant(
                      member.user.id
                    )
                  }
                />

                <div>

                  <p className="font-medium">
                    {member.user.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {member.user.email}
                  </p>

                </div>

              </label>

              {checked &&
                splitType !== "EQUAL" && (

                  <div className="mt-3">

                    <input
                      type="number"
                      placeholder={
                        splitType === "EXACT"
                          ? "Amount"
                          : "Percentage"
                      }
                      className="w-full rounded-lg border p-2"

                      onChange={(e) =>
                        updateParticipant(
                          member.user.id,
                          Number(e.target.value)
                        )
                      }
                    />

                  </div>

                )}

            </div>
          );
        })}

      </div>

      {splitType === "EQUAL" && (
        <p className="text-sm text-gray-500">
          Amount will be divided equally among all selected participants.
        </p>
      )}

      {splitType === "EXACT" && (
        <p className="text-sm text-gray-500">
          Sum of all entered amounts must equal the total expense amount.
        </p>
      )}

      {splitType === "PERCENTAGE" && (
        <p className="text-sm text-gray-500">
          Sum of all percentages must equal 100%.
        </p>
      )}

    </div>
  );
}