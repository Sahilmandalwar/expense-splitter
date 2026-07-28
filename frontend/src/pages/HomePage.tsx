export function HomePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-96px)] max-w-6xl flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
      <div className="w-full overflow-hidden rounded-4xl border border-slate-200 bg-white/90 p-10 shadow-[0_30px_120px_-50px_rgba(15,23,42,0.25)] backdrop-blur-sm sm:p-14 animate-[fadeInUp_0.9s_ease-out]">
        <p className="mb-4 inline-flex rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
          Expense splitting made simple
        </p>
        <h1 className="text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
          Keep shared spending fair and effortless.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Create groups, add expenses, and settle up with a clean dashboard built for teams, friends, and families.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-base font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  )
}
