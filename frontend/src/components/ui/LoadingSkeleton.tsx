import clsx from "clsx";

interface LoadingSkeletonProps {
  title?: string;
  items?: number;
  compact?: boolean;
  className?: string;
}

export function LoadingSkeleton({
  title,
  items = 3,
  compact = false,
  className,
}: LoadingSkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse rounded-4xl border border-slate-200 bg-white/95 p-6 shadow-sm",
        className
      )}
    >
      {title && (
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="h-6 w-2/5 rounded-full bg-slate-200" />
          <div className="h-5 w-16 rounded-full bg-slate-200" />
        </div>
      )}

      <div className={clsx("space-y-4", compact && "space-y-3")}> 
        {Array.from({ length: items }).map((_, index) => (
          <div
            key={index}
            className="space-y-3 rounded-3xl bg-slate-100 p-4"
          >
            <div className="h-4 w-3/4 rounded-full bg-slate-200" />
            <div className="h-3 w-full rounded-full bg-slate-200" />
            {!compact && (
              <div className="h-3 w-5/6 rounded-full bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
