import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LoadingSkeleton } from "../../../components/ui/LoadingSkeleton";
import { useGroup } from "../hooks";
import { OverviewTab } from "../tabs/OverviewTab";
import { GroupTabs } from "../tabs/GroupTabs";
import { ExpensesTab } from "../../expenses/tabs/ExpensesTab";
import { BalancesTab } from "../../balances/tabs/BalancesTab";
import { SettlementsTab } from "../../settlements/tabs/SettlementsTab";
import { GroupSidebar } from "../components/GroupSidebar";

export function GroupDetailsPage() {
  const { groupId } = useParams();

  const [activeTab, setActiveTab] =
    useState("Overview");

  const { data, isPending, isError } =
    useGroup(groupId!);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4 py-12">
        <LoadingSkeleton title="Loading group" items={2} className="w-full max-w-4xl" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex h-screen items-center justify-center">
        Something went wrong.
      </div>
    );
  }

  const group = data.group;

  return (
    <div className="mx-auto max-w-6xl p-6 sm:p-8">
      <div className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white px-6 py-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.3)] sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {group.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
            {group.description ?? "No description"}
          </p>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          ← Back to dashboard
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(280px,320px)_1fr]">
        <GroupSidebar />

        <main className="space-y-8 min-w-0 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_60px_-30px_rgba(15,23,42,0.3)] sm:p-8">
          <GroupTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Overview" && (
            <OverviewTab
              groupId={group.id}
              members={group.members}
            />
          )}

          {activeTab === "Expenses" && (
            <ExpensesTab group={group} />
          )}

          {activeTab === "Balances" && (
            <BalancesTab groupId={group.id} />
          )}

          {activeTab === "Settlements" && (
            <SettlementsTab
              group={group}
            />
          )}
        </main>
      </div>
    </div>
  );
}