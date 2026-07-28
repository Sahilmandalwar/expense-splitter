import { Outlet } from 'react-router-dom'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_32%),radial-gradient(circle_at_30%_0,_rgba(59,130,246,0.12),_transparent_38%)] blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 bg-[radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.14),_transparent_32%),radial-gradient(circle_at_70%_100%,_rgba(14,165,233,0.12),_transparent_38%)] blur-3xl" />

      <Header />

      <main className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-4xl bg-white/95 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
