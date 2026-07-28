
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}



export function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {


  return (
    <div className="mt-8 flex items-center justify-center gap-2">

      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => (
          <button
            key={index + 1}
            onClick={() =>
              onPageChange(index + 1)
            }
            className={`rounded-lg px-4 py-2 ${
              page === index + 1
                ? "bg-blue-600 text-white"
                : "border"
            }`}
          >
            {index + 1}
          </button>
        )
      )}

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>

    </div>
  );
}

