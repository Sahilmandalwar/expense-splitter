import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { UserGroup } from "../types";

interface GroupCardProps {
  group: UserGroup;
}

export function GroupCard({
  group,
}: GroupCardProps) {
  const navigate = useNavigate();

  const joinedLabel = useMemo(() => {
    return new Date(group.joinedAt).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [group.joinedAt]);

  return (
    <article
      onClick={() =>
        navigate(`/groups/${group.group.id}`)
      }
      className="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-sky-50 to-white p-6 shadow-[0_25px_70px_-28px_rgba(15,23,42,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-[0_32px_90px_-35px_rgba(56,189,248,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 md:p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-600">
            Group
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {group.group.name}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-sky-600 text-white shadow-lg shadow-sky-500/20">
          <ArrowRight size={20} />
        </div>
      </div>

      <p className="mt-5 min-h-[3.25rem] text-sm leading-6 text-slate-600">
        {group.group.description ?? "No description available yet."}
      </p>

      <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
          <span className="h-2 w-2 rounded-full bg-sky-500" />
          Joined {joinedLabel}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          View details
        </span>
      </div>
    </article>
  );
}