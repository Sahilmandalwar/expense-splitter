import { useState } from "react";
import { useAuthStore } from "../stores/authStore";
import { GroupCard } from "../features/groups/components/GroupCard";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import { CreateGroupModal } from "../features/groups/components/CreateGroupModal";
import { useGroups } from "../features/groups/hooks";

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const { data, isPending, isError } = useGroups();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <LoadingSkeleton title="Loading dashboard" items={2} className="w-full max-w-4xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        Something went wrong.
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-6xl p-6 sm:p-8">
        <div className="mb-10 overflow-hidden rounded-4xl bg-linear-to-br from-slate-900 via-slate-800 to-blue-950 px-6 py-8 text-white shadow-[0_35px_90px_-40px_rgba(15,23,42,0.65)] sm:px-10 sm:py-10 animate-[fadeInUp_0.9s_ease-out]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                👋 Welcome, {user?.name}
              </h1>
              <p className="mt-3 max-w-2xl text-base text-slate-300 sm:text-lg">
                Manage your groups and expenses effortlessly with faster navigation and cleaner group views.
              </p>
            </div>

            <button
              onClick={() => setIsCreateOpen(true)}
              className="inline-flex items-center justify-center rounded-3xl bg-sky-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-500/30 transition duration-300 hover:-translate-y-0.5 hover:bg-sky-400"
            >
              + Create Group
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              My Groups
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a group to view details, expenses, balances, and settlements.
            </p>
          </div>
        </div>

        {data?.groups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-12 text-center shadow-sm">
            <p className="text-xl font-semibold text-slate-900">
              No Groups Yet
            </p>

            <p className="mt-3 text-slate-500">
              Create your first group to start splitting expenses with friends.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.groups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>

      <CreateGroupModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </>
  );
}