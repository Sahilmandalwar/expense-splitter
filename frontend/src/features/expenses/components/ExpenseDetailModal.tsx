import type { Expense } from "../types";

interface ExpenseDetailModalProps {
  expense: Expense | null;
  onClose: () => void;
}

export function ExpenseDetailModal({
  expense,
  onClose,
}: ExpenseDetailModalProps) {
  if (!expense) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {expense.title}
          </h2>

          <button
            onClick={onClose}
            className="text-xl"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">

          <div>
            <p className="text-gray-500">
              Amount
            </p>

            <p className="text-xl font-semibold">
              ₹{expense.amount}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Paid By
            </p>

            <p className="font-medium">
              {expense.paidBy.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Description
            </p>

            <p>
              {expense.description || "No description"}
            </p>
          </div>

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Participants
            </h3>

            <div className="space-y-3">

              {expense.expenseParticipants.map(
                (participant) => (
                  <div
                    key={participant.user.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div>

                      <p className="font-medium">
                        {participant.user.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        {participant.user.email}
                      </p>

                    </div>

                    <p className="font-semibold text-blue-600">
                      ₹{participant.amountOwed}
                    </p>

                  </div>
                )
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}