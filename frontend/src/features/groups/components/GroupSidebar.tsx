import { Link, useLocation } from "react-router-dom";
import { useGroups } from "../hooks";

export function GroupSidebar() {
  const { data, isPending, isError } = useGroups();
  const location = useLocation();
  const currentGroupId = location.pathname.split("/groups/")[1]?.split("/")[0] ?? "";

  if (isPending) {
    return (
      <aside className="w-full max-w-xs shrink-0 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="h-5 w-32 rounded-full bg-slate-200" />
          <div className="h-6 w-12 rounded-full bg-slate-200" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl bg-slate-200 p-4"
            >
              <div className="h-4 w-3/4 rounded-full bg-slate-300" />
              <div className="mt-3 h-3 w-5/6 rounded-full bg-slate-300" />
            </div>
          ))}
        </div>
      </aside>
    );
  }

  if (isError || !data) {
    return (
      <aside className="w-full max-w-xs shrink-0 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)]">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          My groups
        </h2>
        <p className="text-sm text-rose-500">Unable to load groups.</p>
      </aside>
    );
  }

  return (
    <aside className="w-full shrink-0 rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.2)] lg:max-w-xs lg:sticky lg:top-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900">My groups</h2>
        <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {data.groups.length}
        </span>
      </div>

      <div className="space-y-3">
        {data.groups.map((userGroup) => {
          const isActive =
            userGroup.group.id === currentGroupId;

          return (
            <Link
              key={userGroup.id}
              to={`/groups/${userGroup.group.id}`}
              className={`block rounded-2xl border px-4 py-4 transition hover:border-blue-300 hover:bg-blue-50 ${
                isActive
                  ? "border-blue-600 bg-blue-50 text-blue-800"
                  : "border-gray-200 bg-white text-gray-800"
              }`}
            >
              <p className="font-semibold">
                {userGroup.group.name}
              </p>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {userGroup.group.description ?? "No description"}
              </p>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
