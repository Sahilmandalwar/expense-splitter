import { useState } from "react";
// import toast from "react-hot-toast";
import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";

import { ExpenseCard } from "../components/ExpenseCard";
import { ExpenseDetailModal } from "../components/ExpenseDetailModal";
import { Pagination } from "../../../components/ui/Pagination";

import {  useExpenses } from "../hooks";

import type { Expense } from "../types";
import type { GroupDetail } from "../../groups/types";
import { CreateExpenseModal } from "../modals/CreateExpenseModal";

interface Props {
  group: GroupDetail;
}

export function ExpensesTab({ group }: Props) {
  const [page, setPage] = useState(1);

  const [selectedExpense, setSelectedExpense] =
    useState<Expense | null>(null);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const {
    data,
    isPending,
    isError,
  } = useExpenses(group.id, page);

  // const createExpense =
  //   useCreateExpense(group.id);

  if (isPending) {
    return <LoadingSkeleton title="Loading expenses" items={4} compact className="mt-6" />;
  }

  if (isError || !data) {
    return <h2>Error</h2>;
  }

  const expenses =
    data.expenses.expenses;

 const pagination =
  data.expenses.pagination;

  // async function handleCreateExpense(
  //   expenseData: Parameters<
  //     typeof createExpense.mutateAsync
  //   >[0]
  // ) {
  //   try {
  //     await createExpense.mutateAsync(
  //       expenseData
  //     );

  //     toast.success(
  //       "Expense Created Successfully"
  //     );

  //     setShowCreateModal(false);
  //   } catch {
  //     toast.error(
  //       "Unable to create expense"
  //     );
  //   }
  // }

  return (
    <>
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          Expenses
        </h2>

        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          + Add Expense
        </button>

      </div>

      <div className="space-y-4">

        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onClick={() =>
              setSelectedExpense(expense)
            }
          />
        ))}

      </div>

        <Pagination
            page={pagination.page}
            totalPages={pagination.totalPage}
            onPageChange={setPage}
        /> 
      <ExpenseDetailModal
        expense={selectedExpense}
        onClose={() =>
          setSelectedExpense(null)
        }
      />

      <CreateExpenseModal
        open={showCreateModal}
        groupId={group.id}
        members={group.members}
        onClose={() =>
            setShowCreateModal(false)
        }
    />
    </>
  );
}

