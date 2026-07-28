import type { Expense } from "../types";

interface ExpenseCardProps {
  expense: Expense;
  onClick: () => void;
}

export function ExpenseCard({
  expense,
  onClick,
}: ExpenseCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_18px_45px_-20px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-26px_rgba(15,23,42,0.2)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            {expense.title}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Paid by {expense.paidBy.name}
          </p>
        </div>

        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-700">
          ₹{expense.amount}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
        <span>{expense.expenseParticipants.length} participants</span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
          {expense.expenseParticipants.length > 1 ? "Shared" : "Solo"}
        </span>
      </div>
    </div>
  );
}